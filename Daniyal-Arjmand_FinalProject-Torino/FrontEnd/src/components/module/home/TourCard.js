"use client";

import { useInView } from "react-intersection-observer";
import styles from "./TourCard.module.css";
import {
  formatToJalali,
  formatToPersianNumber,
  translateVehicle,
  calculateTourDuration,
} from "@/lib/formatters";

function TourCard({ tour, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formattedStartDate = formatToJalali(tour.startDate);
  const optionsString = tour.options ? tour.options.join(" | ") : "";
  const translatedVehicle = translateVehicle(tour.fleetVehicle);
  const persianPrice = formatToPersianNumber(tour.price);
  const duration = calculateTourDuration(tour.startDate, tour.endDate);

  return (
    <div
      ref={ref}
      className={`${styles.container} ${
        inView ? styles.isVisible : styles.isHidden
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={styles.description}>
        <div className={styles.image}>
          <img src={tour.image} alt={tour.title} />
        </div>
        <div className={styles.text}>
          <h1>{tour.title}</h1>
          <p>
            {formattedStartDate}.{duration}-{translatedVehicle}-{optionsString}
          </p>
        </div>
      </div>

      <div className={styles.reservation}>
        <p>
          <span>{persianPrice}</span> تومان
        </p>
        <button>رزرو</button>
      </div>
    </div>
  );
}

export default TourCard;
