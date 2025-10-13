import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "@/lib/api/config";
import ProfileForm from "@/components/profile/ProfileForm";

async function getUserProfile(token) {
  if (!token) return null;
  try {
    const response = await api.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch user profile:", error);
    return null;
  }
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const user = await getUserProfile(token);

  if (!user) {
    console.log("Redirecting due to invalid or missing user token.");
    redirect("/");
  }

  return (
    <div>
      <ProfileForm initialData={user} />
    </div>
  );
}
