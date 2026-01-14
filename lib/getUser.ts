import { createClientServer } from "./supabase/server";

const supabase = await createClientServer();

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data;
};
