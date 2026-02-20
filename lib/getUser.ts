import { getSupabaseClient } from "./supabase/client";
// import { createClientServer } from "./supabase/server";

const supabase = await getSupabaseClient();

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data;
};

// Helper to get current user
export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
};
