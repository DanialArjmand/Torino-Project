import styles from "@/components/layout/Layout.module.css";

function Footer() {
  return (
    <>
      <hr className={styles.lineHr} />

      <footer className={styles.footer}>
        <div className={styles.license}>
          <div className={styles.supportWrapper}>
            <div className={styles.supportInfo}>
              <img
                className={styles.torinoLogo}
                src="/images/Torino1.svg"
                alt="Torino Logo"
              />
              <p>
                <span>۰۲۱-۸۵۸۴ </span>:تلفن پشتیبانی
              </p>
            </div>

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

export default Footer;
