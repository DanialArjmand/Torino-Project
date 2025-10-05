"use client";

import styles from "@/app/error.module.css";

function error() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src="/images/ErrorLampRobot.svg" alt="Error Icon" />
      </div>
      <div className={styles.text}>
        <h2>!اتصال با سرور برقرار نیست</h2>
        <p>.لطفا بعدا دوباره امتحان کنید</p>
      </div>
    </div>
  );
}

export default error;
