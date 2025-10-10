"use client";

import Link from "next/link";
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

  const { days, nights } = calculateTourDuration(tour.startDate, tour.endDate);
  const persianDays = formatToPersianNumber(days);
  const persianNights = formatToPersianNumber(nights);
  const durationText =
    nights > 0
      ? `${persianDays} روز و ${persianNights} شب`
      : `${persianDays} روزه`;

  const formattedStartDate = formatToJalali(tour.startDate);
  const optionsString = tour.options ? tour.options.join(" | ") : "";
  const translatedVehicle = translateVehicle(tour.fleetVehicle);
  const persianPrice = formatToPersianNumber(tour.price);

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
          <p dir="rtl">
            {formattedStartDate}-{optionsString}-{translatedVehicle}
          </p>
        </div>
      </div>

      <div className={styles.reservation}>
        <p>
          <span>{persianPrice}</span> تومان
        </p>

        <Link href={`/tour/${tour.id}`} className={styles.reserveButton}>
          <button>رزرو</button>
        </Link>
      </div>
    </div>
  );
}

export default TourCard;
