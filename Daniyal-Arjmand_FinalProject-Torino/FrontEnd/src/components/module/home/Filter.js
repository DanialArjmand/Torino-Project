"use client";

import styles from "@/components/module/home/Filter.module.css";
import FilterSearchSection from "./FilterSearchSection";

export default function Filter({ tours, onSearch }) {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src="/images/Banner_design__1.svg" alt="Banner" />
      </div>
      <h2 className={styles.title}>
        <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
      </h2>

      <FilterSearchSection tours={tours} onSearch={onSearch} />
    </div>
  );
}
