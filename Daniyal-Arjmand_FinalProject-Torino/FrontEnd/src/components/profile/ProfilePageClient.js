"use client";

import useSWR from "swr";
import { getUserProfile } from "@/lib/api/config";
import ProfileForm from "./ProfileForm";

import styles from "@/components/profile/ProfileForm.module.css";

const fetcher = async () => await getUserProfile();

function ProfilePageClient() {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR("/user/profile", fetcher);

  if (isLoading)
    return (
      <div className={styles.loadingData}>
        <p>در حال بارگذاری اطلاعات...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.loadingData}>
        <p>خطا در دریافت اطلاعات</p>
      </div>
    );

  return (
    <ProfileForm
      key={user?.id || "user-form"}
      initialData={user}
      onUpdate={async (updatedUser) => {
        await mutate(updatedUser, false);
      }}
    />
  );
}

export default ProfilePageClient;
