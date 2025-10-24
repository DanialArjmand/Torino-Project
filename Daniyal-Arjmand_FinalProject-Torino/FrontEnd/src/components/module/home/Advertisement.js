import styles from "@/components/module/home/Advertisement.module.css";

function Advertisement() {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <div className={styles.information}>
          <div className={styles.number}>
            <img src="/images/call.svg" />
            <p>۰۲۱-۱۸۴۰</p>
          </div>
          <button>اطلاعات بیشتر</button>
        </div>
        <div className={styles.textContainer}>
          <img src="/images/ads.svg" />
          <div className={styles.text}>
            <h2>
              خرید تلفنی از <span>تورینو</span>
            </h2>
            <p>!به هرکجا که میخواهید</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advertisement;
