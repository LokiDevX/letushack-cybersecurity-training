import React, { useState } from 'react';
import { supabaseAuth } from '../services/supabase';


interface RegisterModalProps {
  onClose: () => void;
  onRegisterSuccess: (user: any) => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onRegisterSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await supabaseAuth.register({ name, email, password });
      onRegisterSuccess(response.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="bg-surface p-8 rounded-lg border border-steel-blue/20 w-full max-w-md">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-text-disabled/20 rounded text-text-primary focus:border-accent focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-text-disabled/20 rounded text-text-primary focus:border-accent focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-text-disabled/20 rounded text-text-primary focus:border-accent focus:outline-none"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-text-disabled/20 rounded text-text-primary focus:border-accent focus:outline-none"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent text-background font-bold rounded hover:bg-accent-darker transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-text-secondary text-sm">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-accent hover:text-accent-darker">
            Login
          </button>
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
