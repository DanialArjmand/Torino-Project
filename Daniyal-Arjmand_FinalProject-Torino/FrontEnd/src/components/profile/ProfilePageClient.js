"use client";

import useSWR from "swr";
import { getUserProfile } from "@/lib/api/config";
import ProfileForm from "./ProfileForm";

const fetcher = () => getUserProfile();

function ProfilePageClient() {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR("/user/profile", fetcher);

  if (isLoading) return <div>در حال بارگذاری اطلاعات...</div>;
  if (error || !user) return <div>خطا در دریافت اطلاعات.</div>;

  return <ProfileForm initialData={user} onUpdate={mutate} />;
}

export default ProfilePageClient;
