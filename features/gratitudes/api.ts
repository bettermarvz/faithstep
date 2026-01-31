import { createClientBrowser } from "@/lib/supabase/client";
import useSWR from "swr";

// :::::::::NOTE::::::::
// These functions should be used in client side only.
// When used in server, supabase instance will become shared and Auth states may bleed between requests

const supabaseClient = createClientBrowser();

export const postGratitude = async ({
  gratitude,
  isAnonymous,
}: {
  gratitude: string;
  isAnonymous: boolean;
}) => {
  if (!gratitude.trim()) return;

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (!session) {
    return;
  }
  await supabaseClient.from("gratitude_posts").insert([
    {
      userid: session.user?.id,
      content: gratitude,
      isanonymous: isAnonymous,
    },
  ]);
};

export const getGratitudes = async () => {
  try {
    const { data, error } = await supabaseClient.from("gratitude_posts")
      .select(`
    *,
    user_profiles:userid(*)
  `);

    if (error) {
      console.error("Query error:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Gratitude fetch error:", error);
    return [];
  }
};

const fetcher = async (limit?: number) => {
  let query = supabaseClient
    .from("gratitude_posts")
    .select(
      `
    *,
    user_profiles:userid(*)
    `,
    )
    .order("createdat", { ascending: false });
  if (typeof limit === "number") {
    query = query.limit(limit);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const useGratitude = (limit?: number) => {
  // change this into infiniteScrolling later
  const { data, isLoading, mutate } = useSWR(
    `gratitudes?limit=${limit}`,
    () => fetcher(limit),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    },
  );

  return {
    data,
    isLoading,
    mutateGratitude: mutate,
  };
};