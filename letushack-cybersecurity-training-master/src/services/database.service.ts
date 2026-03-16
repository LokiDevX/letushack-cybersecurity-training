import { query, pool } from '../config/database';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);

export class DatabaseService {
  static async initializeDatabase() {
    try {
      // Test Supabase connection
      const { error } = await supabase.from('profiles').select('count').limit(1);
      if (error && error.code !== 'PGRST116') { // PGRST116 means table doesn't exist yet
        console.log('Database connection test:', error.message);
      } else {
        console.log('Supabase connected successfully');
      }
    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }

  static async closePool() {
    // Supabase client doesn't need explicit cleanup
    console.log('Database cleanup completed');
  }
}
