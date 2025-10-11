"use client";

import Link from "next/link";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { addToBasket } from "@/lib/api/config";
import styles from "./TourCard.module.css";
import {
  formatToJalali,
  formatToPersianNumber,
  translateVehicle,
  calculateTourDuration,
} from "@/lib/formatters";

function TourCard({ tour, index }) {
  const { user } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

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

  const handleAddToBasket = async (e) => {
    e.stopPropagation();
    if (!user) return;

    setIsAdding(true);
    try {
      await addToBasket(tour.id);
      alert(`"${tour.title}" با موفقیت به لیست شما اضافه شد.`);
    } catch (error) {
      console.error("خطا در افزودن به سبد خرید:", error);
      alert("خطا در افزودن تور. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleReserveClick = (e) => {
    e.stopPropagation();
    router.push(`/booking/${tour.id}`);
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
          {user && (
            <button
              onClick={handleAddToBasket}
              className={styles.addToListButton}
              disabled={isAdding}
              title="افزودن به لیست من"
            >
              {isAdding ? "..." : "سبد خرید"}
            </button>
          )}
          <button onClick={handleReserveClick}>رزرو</button>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
