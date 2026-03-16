
/**
 * learnhack.com Backend Authentication & Lab System
 */

const express = require('express');
const admin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors');
const { launchLab, getActiveLab, cleanupExpiredLabs } = require('./lib/lab_manager');

const app = express();
app.use(cors());
app.use(express.json());

if (!admin.apps.length) {
    admin.initializeApp();
}

const db = admin.firestore();

// --- MIDDLEWARE ---

const verifySession = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthenticated. Bearer token required.' });
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired session.' });
    }
};

// --- AUTH ENDPOINTS ---

app.post('/api/register', async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'Missing parameters.' });

    try {
        const userRecord = await admin.auth().createUser({ email, password, displayName: name });
        const profileData = {
            uid: userRecord.uid,
            name: name,
            email: email,
            role: 'student',
            rank: '#10,000+',
            xp: 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        await db.collection('users').doc(userRecord.uid).set(profileData);
        res.status(201).json({ message: 'User registered', uid: userRecord.uid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

    try {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
            { email, password, returnSecureToken: true }
        );
        const { localId, idToken } = response.data;
        const userDoc = await db.collection('users').doc(localId).get();
        if (!userDoc.exists) return res.status(404).json({ error: 'Profile not found.' });
        
        res.status(200).json({
            token: idToken,
            user: { ...userDoc.data() }
        });
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed.' });
    }
});

// --- LAB ENDPOINTS ---

/**
 * POST /api/labs/launch
 * Authenticated users can request a unique, isolated Docker lab environment.
 */
app.post('/api/labs/launch', verifySession, async (req, res) => {
    const userId = req.user.uid;

    try {
        // 1. Check if user already has an active lab
        const existingLab = getActiveLab(userId);
        if (existingLab) {
            return res.status(200).json({
                message: "Existing lab session restored",
                ...existingLab
            });
        }

        // 2. Launch new Docker instance
        const labConfig = await launchLab(userId);

        res.status(201).json({
            sessionId: labConfig.sessionId,
            accessUrl: `/lab/session/${labConfig.sessionId}`,
            expiresAt: labConfig.expiresAt
        });
    } catch (error) {
        console.error('Lab launch failure:', error);
        res.status(500).json({ error: 'Could not provision lab environment.' });
    }
});

/**
 * GET /api/labs/status
 * Check current active lab status and time remaining.
 */
app.get('/api/labs/status', verifySession, (req, res) => {
    const lab = getActiveLab(req.user.uid);
    if (!lab) return res.status(404).json({ active: false });
    res.json({ active: true, ...lab });
});

// Background Worker: Cleanup expired containers every 60 seconds
setInterval(cleanupExpiredLabs, 60 * 1000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`learnhack.com Secure Backend running on port ${PORT}`);
});
