import styles from "@/components/module/home/Features.module.css";

function Features() {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <div className={styles.option}>
          <div>
            <h3>رضایت کاربران</h3>
            <p>رضایت بیش از 10 هزار کاربر از تور های ما</p>
          </div>
          <img src="/images/Group 18.svg" />
        </div>

        <div className={styles.option}>
          <div>
            <h3>پشتیبانی</h3>
            <p> پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما </p>
          </div>
          <img src="/images/Group 17.svg" />
        </div>

        <div className={styles.option}>
          <div>
            <h3>بصرفه ترین قیمت</h3>
            <p>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید</p>
          </div>
          <img src="/images/Group 16.svg" />
        </div>
      </div>
    </div>
  );
}

export default Features;
