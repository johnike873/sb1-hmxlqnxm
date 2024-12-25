import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { Profile } from '../types';

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const response = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (response.error) {
    throw new AuthError(
      response.error.message === 'Invalid login credentials'
        ? 'Invalid email or password. Please check your credentials and try again.'
        : response.error.message
    );
  }

  return response;
}

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  role: Profile['role']
): Promise<AuthResponse> {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
  });

  if (authError) throw authError;

  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: fullName,
          email: email.trim().toLowerCase(),
          role,
        },
      ]);

    if (profileError) {
      // Cleanup: delete the auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw new Error('Failed to create user profile. Please try again.');
    }
  }

  return { data: authData, error: null };
}