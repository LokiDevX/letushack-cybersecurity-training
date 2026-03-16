
/**
 * Lab Manager Service
 * Handles Docker lifecycle and User-to-Container mapping.
 */

const { exec } = require('child_process');
const crypto = require('crypto');

// In-memory store for session mapping (Simplified for startup use)
// Production: Use Redis for horizontal scalability and persistence
const activeSessions = new Map(); // userId -> { containerId, sessionId, expiresAt }

const LAB_DURATION_MS = 60 * 60 * 1000; // 1 Hour
const DOCKER_IMAGE = 'learnhack/security-linux:latest';

/**
 * Executes Docker commands to provision isolated environments.
 */
const dockerRun = (containerName) => {
    return new Promise((resolve, reject) => {
        // Security constraints: 
        // --network none: Isolated network (or use private bridge)
        // --cap-drop ALL: Remove all kernel capabilities
        // --memory 512m: Resource limits
        // --pids-limit 64: Prevent fork bombs
        const cmd = `docker run -d --name ${containerName} \
            --network learnhack-isolated \
            --cap-drop ALL \
            --memory 512m \
            --pids-limit 64 \
            --read-only \
            --tmpfs /tmp --tmpfs /run \
            ${DOCKER_IMAGE}`;

        exec(cmd, (error, stdout, stderr) => {
            if (error) return reject(stderr);
            resolve(stdout.trim()); // Returns containerId
        });
    });
};

/**
 * Provisions a lab for a user.
 */
async function launchLab(userId) {
    const sessionId = `lab_${crypto.randomBytes(8).toString('hex')}`;
    const containerName = `user-lab-${userId}`;
    const expiresAt = Date.now() + LAB_DURATION_MS;

    try {
        const containerId = await dockerRun(containerName);
        
        const sessionData = {
            containerId,
            sessionId,
            expiresAt,
            userId
        };

        activeSessions.set(userId, sessionData);
        return sessionData;
    } catch (err) {
        // If container already exists (race condition), attempt to remove and retry
        if (err.includes('already in use')) {
            await destroyContainer(containerName);
            return launchLab(userId);
        }
        throw err;
    }
}

/**
 * Retrieves session if active and not expired.
 */
function getActiveLab(userId) {
    const session = activeSessions.get(userId);
    if (!session) return null;

    if (Date.now() > session.expiresAt) {
        cleanupExpiredLabs(); // Trigger cleanup
        return null;
    }

    return {
        sessionId: session.sessionId,
        expiresAt: session.expiresAt
    };
}

/**
 * Reaps containers that have exceeded their time limit.
 */
async function cleanupExpiredLabs() {
    const now = Date.now();
    for (const [userId, session] of activeSessions.entries()) {
        if (now > session.expiresAt) {
            console.log(`Reaping expired lab for user ${userId}`);
            await destroyContainer(session.containerId);
            activeSessions.delete(userId);
        }
    }
}

/**
 * Helper to force stop and remove containers.
 */
function destroyContainer(idOrName) {
    return new Promise((resolve) => {
        exec(`docker rm -f ${idOrName}`, (err) => {
            if (err) console.warn(`Failed to destroy container ${idOrName}:`, err.message);
            resolve();
        });
    });
}

module.exports = {
    launchLab,
    getActiveLab,
    cleanupExpiredLabs
};
