"use client";

import { useState } from "react";
import styles from "./ProfileForm.module.css";
import ProfileHeader from "./ProfileHeader";
import ProfileTab from "./ProfileTab/ProfileTab";
import MyToursTab from "./MyToursTab";
import TransactionsTab from "./TransactionsTab";

function ProfileForm({ initialData, onUpdate }) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <ProfileHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className={styles.main}>
          {activeTab === "profile" && (
            <ProfileTab initialData={initialData} onUpdate={onUpdate} />
          )}
          {activeTab === "tours" && <MyToursTab />}
          {activeTab === "transactions" && <TransactionsTab />}
        </main>
      </div>
    </div>
  );
}

export default ProfileForm;
