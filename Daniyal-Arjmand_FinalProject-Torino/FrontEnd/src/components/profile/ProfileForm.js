"use client";

import { useState } from "react";
import styles from "@/components/profile/ProfileForm.module.css";
import ProfileHeader from "./ProfileHeader";
import ProfileTab from "./ProfileTab";
import MyToursTab from "./MyToursTab";
import TransactionsTab from "./TransactionsTab";

function ProfileForm({ initialData }) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <ProfileHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className={styles.main}>
          {activeTab === "profile" && <ProfileTab initialData={initialData} />}
          {activeTab === "tours" && <MyToursTab />}
          {activeTab === "transactions" && <TransactionsTab />}
        </main>
      </div>
    </div>
  );
}

export default ProfileForm;