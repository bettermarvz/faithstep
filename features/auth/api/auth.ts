import { supabase } from "@/lib/supabase";

export const login = async (payload: { email: string; password: string }) => {
  // Hook logic here

  const { data } = await supabase.auth.signInWithPassword(payload);
  return data;
};

// const useSupabaseSignup = () => {
//   // Hook logic here
//   console.log("useSupabaseSignup");
// };

// const useSupabase``
