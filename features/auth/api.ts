import { createClientBrowser } from "@/lib/supabase/client";

const supabase = createClientBrowser();

export const signUpWithPassword = async (payload: {
  email: string;
  password: string;
  name: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
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

  const { data } = await supabase.auth.signInWithPassword(payload);
  return data;
};

export const signOut = async () => await supabase.auth.signOut();
