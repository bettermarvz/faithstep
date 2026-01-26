import { getCurrentUser } from "@/lib/getUser";
import { createClientBrowser } from "@/lib/supabase/client";

const supabase = createClientBrowser();

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
  } = await supabase.auth.getSession();

  await supabase.from("gratitude_posts").insert([
    {
      userid: (await getCurrentUser()).user?.id,
      content: gratitude,
      isanonymous: isAnonymous,
    },
  ]);

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
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
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  try {
    const { data, error } = await supabase.from("gratitude_posts").select(`
    id,
    content,
    createdat,
    isanonymous,
    user_profiles (
      id,
      displayname,
      email
    )
  `);

    if (sessionError) {
      console.error("Session error:", sessionError);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Gratitude fetch error:", error);
    return [];
  }
};
