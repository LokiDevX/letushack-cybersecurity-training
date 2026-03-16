import { query } from '../config/database';

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: Date;
}

export interface UserProgress {
  id: number;
  user_id: number;
  module_id: string;
  completed: boolean;
  score?: number;
  completed_at?: Date;
}

export const userApi = {
  async createUser(username: string, email: string): Promise<User> {
    const result = await query(
      'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
      [username, email]
    );
    return result.rows[0];
  },

  async getUserById(id: number): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  async saveProgress(userId: number, moduleId: string, score: number): Promise<UserProgress> {
    const result = await query(
      `INSERT INTO user_progress (user_id, module_id, completed, score, completed_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id, module_id) 
       DO UPDATE SET completed = $3, score = $4, completed_at = NOW()
       RETURNING *`,
      [userId, moduleId, true, score]
    );
    return result.rows[0];
  },

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    const result = await query(
      'SELECT * FROM user_progress WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  },
};
