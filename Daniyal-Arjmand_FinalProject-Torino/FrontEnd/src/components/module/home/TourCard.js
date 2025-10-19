"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useRouter, usePathname } from "next/navigation";
import styles from "./TourCard.module.css";
import {
  formatToJalali,
  formatToPersianNumber,
  translateVehicle,
  calculateTourDuration,
} from "@/lib/formatters";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { useState } from "react";
import { addToBasket } from "@/lib/api/config";

function TourCard({ tour, index }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const { openModal } = useModal();
  const [isBooking, setIsBooking] = useState(false);

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

  const handleReserveClick = async (e) => {
    e.stopPropagation();
    if (isBooking) return;

    if (!user) {
      openModal(pathname);
      return;
    }

    setIsBooking(true);
    try {
      await addToBasket(tour.id);
      router.push(`/booking/${tour.id}`);
    } catch (error) {
      console.error("خطا:", error);
      alert("خطا در شروع فرآیند رزرو.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`${styles.container} ${
        inView ? styles.isVisible : styles.isHidden
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/tour/${tour.id}`} className={styles.cardLink}>
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
      </Link>

      <div className={styles.reservation}>
        <p>
          <span>{persianPrice}</span> تومان
        </p>
        <div className={styles.buttonGroup}>
          <button onClick={handleReserveClick}>رزرو</button>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
