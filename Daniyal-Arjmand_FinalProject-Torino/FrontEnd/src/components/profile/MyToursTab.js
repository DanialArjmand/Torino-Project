import styles from "./ProfileForm.module.css";

function MyToursTab() {
  return (
    <div className={styles.mainItem}>
      <h2>تورهای من</h2>
      <p>شما هنوز هیچ توری رزرو نکرده‌اید.</p>
    </div>
  );
}

export default MyToursTab;