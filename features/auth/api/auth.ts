import { createClientBrowser } from "@/lib/supabase/client";

const supabase = createClientBrowser();

export const loginWithPassword = async (payload: {
  email: string;
  password: string;
}) => {
  // Hook logic here

  const { data } = await supabase.auth.signInWithPassword(payload);
  return data;
};

export const signOut = async () => await supabase.auth.signOut();
