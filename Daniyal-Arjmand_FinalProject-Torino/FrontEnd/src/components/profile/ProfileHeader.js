import styles from "./ProfileHeader.module.css";

function ProfileHeader({ activeTab, setActiveTab }) {
  return (
    <header className={styles.header}>
      <div
        className={`${styles.headerItem} ${
          activeTab === "profile" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("profile")}
      >
        <p>پروفایل</p>
        <div className={`${styles.icon} ${styles.profileIcon}`} />
      </div>
      <hr className={styles.hrLine} />
      <div
        className={`${styles.headerItem} ${
          activeTab === "tours" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("tours")}
      >
        <p>تور های من</p>
        <div className={`${styles.icon} ${styles.toursIcon}`} />
      </div>
      <hr className={styles.hrLine} />
      <div
        className={`${styles.headerItem} ${
          activeTab === "transactions" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("transactions")}
      >
        <p>تراکنش ها</p>
        <div className={`${styles.icon} ${styles.transactionsIcon}`} />
      </div>
    </header>
  );
}

export default ProfileHeader;
