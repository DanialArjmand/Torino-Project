"use client";

import React, { useState } from "react";
import LoginPage from "@/components/auth/LoginPage";

import styles from "@/components/layout/Layout.module.css";

function Layout({ children }) {
  const [showLogin, setShowLogin] = useState(false);

  const handleOpenLogin = () => {
    setShowLogin(true);
  };
  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.buttons}>
          <button onClick={handleOpenLogin}>
            ثبت نام <span>|</span> ورود
            <img src="/images/frame.svg" alt="user Icon" />
          </button>
        </div>

        <div className={styles.link}>
          <a>تماس با ما</a>
          <a>درباره ما</a>
          <a>خدمات گردشگری</a>
          <a>صفحه اصلی</a>
          <img src="/images/Torino1.svg" alt="Torino Logo" />
        </div>
      </header>
      <main className={styles.container}>{children}</main>
      {showLogin && <LoginPage onClose={handleCloseLogin} />}

      <hr className={styles.lineHr} />

      <footer className={styles.footer}>
        <div className={styles.license}>
          <div className={styles.supports}>
            <img
              className={styles.torinoLogo}
              src="/images/Torino1.svg"
              alt="Torino Logo"
            />
            <p>
              <span>۰۲۱-۸۵۸۴ </span>:تلفن پشتیبانی
            </p>
            <div className={styles.logosLicense}>
              <img src="/images/aira-682b7c43.svg" alt="Logo" />
              <img src="/images/samandehi-6e2b448a.svg" alt="Logo" />
              <img src="/images/ecunion-35c3c933.svg" alt="Logo" />
              <img src="/images/passenger-rights-48368f81 1.svg" alt="Logo" />
              <img src="/images/state-airline-f45c55b2 1.svg" alt="Logo" />
            </div>
          </div>

          <div className={styles.description}>
            <div>
              <h2>خدمات مشتریان</h2>
              <a>پشتیبانی آنلاین</a>
              <a>راهنمای خرید</a>
              <a>راهنمای استرداد</a>
              <a>پرسش و پاسخ</a>
            </div>
            <div>
              <h2>تورینو </h2>
              <a> درباره ما</a>
              <a> تماس با ما</a>
              <a> چرا تورینو</a>
              <a>بیمه مسافرتی </a>
            </div>
          </div>
        </div>
        <p className={styles.websiteRights}>
          .کلیه حقوق این وب سایت متعلق به تورینو میباشد
        </p>
      </footer>
    </>
  );
}

export default Layout;
