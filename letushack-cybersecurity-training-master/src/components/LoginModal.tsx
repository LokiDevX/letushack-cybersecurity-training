import React, { useState } from 'react';
import { supabaseAuth } from '../services/supabase';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await supabaseAuth.login({ email, password });
      onLoginSuccess(response.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="bg-surface p-8 rounded-lg border border-steel-blue/20 w-full max-w-md">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">Login</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent text-background font-bold rounded hover:bg-accent-darker transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-text-secondary text-sm">
          Don't have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-accent hover:text-accent-darker">
            Register
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

export default LoginModal;
