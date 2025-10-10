"use client";

import TourCard from "./TourCard";
import styles from "./TourList.module.css";

function TourList({ tours }) {
  if (!tours || tours.length === 0) {
    return (
      <div style={{ textAlign: "center", margin: "2rem" }}>
        هیچ توری برای نمایش وجود ندارد.
      </div>
    );
  }

  return (
    <div className={styles.tourList}>
      <h2 className={styles.title}>همه تور ها</h2>
      <div className={styles.parentContainer}>
        {tours.map((tour, index) => (
          <TourCard key={tour.id} tour={tour} index={index} />
        ))}
      </div>
    </div>
  );
}

export default TourList;
