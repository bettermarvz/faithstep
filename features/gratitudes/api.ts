import { createClientBrowser } from "@/lib/supabase/client";

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
  console.log("6666666666666666", session);
  await supabaseClient.from("gratitude_posts").insert([
    {
      userid: session?.user?.id,
      content: gratitude,
      isanonymous: isAnonymous,
    },
  ]);

  if (!session) return;

  try {
    const res = await fetch("/api/gratitude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        content: gratitude,
        isAnonymous,
      }),
    });
    console.log(res, "ses");

    if (res.ok) {
      return res;
    }
  } catch (error) {
    console.error("Gratitude post error:", error);
  }
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
