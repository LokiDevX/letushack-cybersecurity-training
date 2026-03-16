import { supabase } from '../services/database.service';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

export const authApi = {
  async signUp({ email, password, fullName }: SignUpData) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error && data.user) {
      const user = data.user;

      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        name: fullName,
        role: "student"
      });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw profileError;
      }

      return { user, success: true };
    }

    if (error) {
      throw error;
    }

    return { user: null, success: false };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }
};
