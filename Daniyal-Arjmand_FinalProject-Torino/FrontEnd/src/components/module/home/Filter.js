import styles from "@/components/module/home/Filter.module.css";

function Filter() {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src="/images/Banner_design__1.svg" alt="Banner" />
      </div>
      <h2 className={styles.title}>
        <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
      </h2>
      <div className={styles.filterContainer}>
        <button className={styles.button}>جستجو</button>
        <div className={styles.childDiv}>
          <input placeholder="تاریخ" />
          <img src="/images/calendar.svg" alt="Calendar" />
        </div>
        <div className={styles.childDiv}>
          <input placeholder="مقصد" />
          <img src="/images/global-search.svg" alt="Global Search" />
        </div>
        <div className={styles.lastDiv}>
          <input placeholder="مبدا" />
          <img src="/images/location.svg" alt="Location" />
        </div>
      </div>
    </div>
  );
}

export default Filter;
