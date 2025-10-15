import React from "react";
import { calculateTourDuration, formatToPersianNumber } from "@/lib/formatters";
import styles from "./BookingInformation.module.css";

function BookingInformation({ tour }) {
  if (!tour) {
    return null;
  }

  const { days, nights } = calculateTourDuration(tour.startDate, tour.endDate);
  const persianPrice = formatToPersianNumber(tour.price);
  const persianDays = formatToPersianNumber(days);
  const persianNights = formatToPersianNumber(nights);

  const durationText =
    nights > 0
      ? `${persianDays} روز و ${persianNights} شب`
      : `${persianDays} روزه`;

  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoContent}>
        <div className={styles.infoText}>
          <h1>{tour.title}</h1>
          <p dir="rtl">{durationText}</p>
        </div>
        <img src="/images/Line 18.svg" />
      </div>
      <div className={styles.parentInfoPrice}>
        <div className={styles.infoPrice}>
          <p dir="rtl" className={styles.infoPriceText}>
            <span>{persianPrice}</span>
            تومان
          </p>
          <p className={styles.infoPriceFinal}>قیمت نهایی</p>
        </div>
        <button type="submit" className={styles.button}>
          ثبت و خرید نهایی
        </button>
      </div>
    </div>
  );
}

export default BookingInformation;
