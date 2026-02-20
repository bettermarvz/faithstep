import { getSupabaseClient } from "@/lib/supabase/client";

const supabaseClient = getSupabaseClient();

export const signUpWithPassword = async (payload: {
  email: string;
  password: string;
  name: string;
}) => {
  const { data, error } = await supabaseClient.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        displayName: payload.name,
      },
      emailRedirectTo: `${window.location.origin}/account/setup`,
    },
  });

  return { data, error };
};

export const loginWithPassword = async (payload: {
  email: string;
  password: string;
}) => {
  // Hook logic here

  const { data } = await supabaseClient.auth.signInWithPassword(payload);
  return data;
};

export const signOut = async () => await supabaseClient.auth.signOut();
