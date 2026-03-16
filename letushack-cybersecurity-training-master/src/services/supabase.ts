const { createClient } = supabase;

// Your Supabase configuration
// Replace these with your actual Supabase project credentials
const supabaseUrl = 'YOUR_SUPABASE_URL'; // e.g., https://xxxxx.supabase.co
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  rank: string;
}

export const supabaseAuth = {
  async register(data: RegisterData): Promise<{ user: AuthUser }> {
    try {
      const { data: authData, error } = await supabaseClient.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.name,
            rank: 'Recruit'
          }
        }
      });

      if (error) throw error;
      if (!authData.user) throw new Error('Registration failed');

      return {
        user: {
          id: authData.user.id,
          name: data.name,
          email: authData.user.email!,
          rank: 'Recruit'
        }
      };
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.message));
    }
  },

  async login(credentials: LoginCredentials): Promise<{ user: AuthUser }> {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) throw error;
      if (!data.user) throw new Error('Login failed');

      return {
        user: {
          id: data.user.id,
          name: data.user.user_metadata?.display_name || 'User',
          email: data.user.email!,
          rank: data.user.user_metadata?.rank || 'Recruit'
        }
      };
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.message));
    }
  },

  async logout(): Promise<void> {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
  },

  onAuthChange(callback: (user: AuthUser | null) => void) {
    return supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        callback({
          id: session.user.id,
          name: session.user.user_metadata?.display_name || 'User',
          email: session.user.email!,
          rank: session.user.user_metadata?.rank || 'Recruit'
        });
      } else {
        callback(null);
      }
    });
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    if (!user) return null;

    return {
      id: user.id,
      name: user.user_metadata?.display_name || 'User',
      email: user.email!,
      rank: user.user_metadata?.rank || 'Recruit'
    };
  },

  getErrorMessage(message: string): string {
    if (message.includes('already registered')) {
      return 'Email already in use';
    }
    if (message.includes('Invalid login credentials')) {
      return 'Invalid email or password';
    }
    if (message.includes('Email not confirmed')) {
      return 'Please verify your email address';
    }
    if (message.includes('Password should be')) {
      return 'Password must be at least 6 characters';
    }
    return message || 'An error occurred. Please try again';
  }
};
