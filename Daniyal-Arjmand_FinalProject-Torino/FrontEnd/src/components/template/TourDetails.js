"use client";

import {
  formatToJalali,
  formatToPersianNumber,
  translateVehicle,
  calculateTourDuration,
} from "@/utils/formatters";
import { translateCityById } from "@/lib/translators";
import { addToBasket } from "@/app/api/config";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { toast } from "react-hot-toast";

import styles from "./TourDetails.module.css";

function TourDetails({ tour }) {
  const router = useRouter();
  const { user } = useAuth();
  const { openModal } = useModal();
  const [isBooking, setIsBooking] = useState(false);
  const pathname = usePathname();

  const persianPrice = formatToPersianNumber(tour.price);
  const formattedStartDate = formatToJalali(tour.startDate);
  const formattedEndDate = formatToJalali(tour.endDate);
  const { days, nights } = calculateTourDuration(tour.startDate, tour.endDate);
  const persianDays = formatToPersianNumber(days);
  const persianNights = formatToPersianNumber(nights);
  const durationText =
    nights > 0
      ? `${persianDays} روز و ${persianNights} شب`
      : `${persianDays} روزه`;
  const translatedVehicle = translateVehicle(tour.fleetVehicle);
  const persianAvailableSeats = formatToPersianNumber(tour.availableSeats);

  const handleReserveClick = async () => {
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
      toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsBooking(false);
    }
  };
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <div className={styles.optionTour}>
          <div className={styles.destination}>
            <div className={styles.titleTour}>
              <h1>{tour.title}</h1>
              <p dir="rtl">{durationText}</p>
            </div>
            <div className={styles.tourLeader}>
              <div>
                <p>تضمین کیفیت</p>
                <img src="/images/medal-star.svg" alt="icon" />
              </div>

              <div>
                <p>برنامه سفر</p>
                <img src="/images/map.svg" alt="icon" />
              </div>

              <div>
                <p>تورلیدر از مبدا</p>
                <img src="/images/user-tick.svg" alt="icon" />
              </div>
            </div>

            <div className={styles.reservation}>
              <button
                className={styles.button}
                onClick={handleReserveClick}
                disabled={isBooking}
              >
                رزرو و خرید
              </button>
              <div className={styles.price}>
                <p dir="rtl">
                  <span>{persianPrice}</span> تومان
                </p>
              </div>
            </div>
          </div>

          <div className={styles.image}>
            <img src={tour.image} alt={tour.title} />
          </div>
        </div>

        <div className={styles.TourDescription}>
          <div className={styles.contentBimeh}>
            <div>
              <p>بیمه</p>
              <img src="/images/security.svg" alt="security" />
            </div>
            <span>بیمه 50 هزار دیناری</span>
          </div>

          <div className={styles.content}>
            <div>
              <p>ظرفیت</p>
              <img src="/images/profile-2user.svg" alt="user" />
            </div>
            <span>حداکثر{persianAvailableSeats}نفر</span>
          </div>

          <div className={styles.content}>
            <div>
              <p>حمل و نقل</p>
              <img src="/images/bus.svg" alt="bus" />
            </div>
            <span>{translatedVehicle}</span>
          </div>

          <div dir="rtl" className={styles.content}>
            <div>
              <img src="/images/calendar-2.svg" alt="calendar" />
              <p>تاریخ برگشت</p>
            </div>
            <span>{formattedEndDate}</span>
          </div>

          <div dir="rtl" className={styles.content}>
            <div>
              <img src="/images/calendar.svg" alt="calendar" />
              <p>تاریخ رفت</p>
            </div>
            <span> {formattedStartDate}</span>
          </div>

          <div className={styles.content}>
            <div>
              <p>مقصد</p>
              <img src="/images/location.svg" alt="location" />
            </div>
            <span>{translateCityById(tour.destination.id)}</span>
          </div>

          <div className={styles.lastContent}>
            <div>
              <p>مبدا</p>
              <img src="/images/routing-2.svg" alt="Routing" />
            </div>
            <span>{translateCityById(tour.origin.id)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetails;
