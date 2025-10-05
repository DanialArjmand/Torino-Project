import Link from "next/link";
import styles from "@/app/not-found.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src="/images/ErrorTV.svg" alt="Error Logo" />
      </div>
      <div className={styles.text}>
        <h2>!صفحه مورد نظر یافت نشد</h2>
        <Link href="/">بازگشت به صفحه اصلی</Link>
      </div>
    </div>
  );
}

export default NotFound;
