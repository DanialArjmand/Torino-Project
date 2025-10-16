"use client";

import useSWR from "swr";
import { getPurchasedTours } from "@/lib/api/config";
import { translateCityById } from "@/lib/translators";
import styles from "./ProfileForm.module.css";
import { formatToJalali, formatToPersianNumber } from "@/lib/formatters";

const getVehicleInfo = (vehicle) => {
  const lowerCaseVehicle = vehicle?.toLowerCase() || "";
  switch (lowerCaseVehicle) {
    case "airplane":
      return { text: "سفر با هواپیما", icon: "/images/airplane.svg" };
    case "ship":
      return { text: "سفر با کشتی", icon: "/images/ship.svg" };
    case "bus":
      return { text: "سفر با اتوبوس", icon: "/images/bus-empty.svg" };
    default:
      return { text: "سفر", icon: "/images/bus-empty.svg" };
  }
};

const getTourStatus = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now > end) {
    return { text: "به اتمام رسیده", className: styles.statusCompleted };
  }
  if (now >= start && now <= end) {
    return { text: "در حال برگزاری", className: styles.statusOngoing };
  }
  return { text: "برگزاری بزودی ", className: styles.statusUpcoming };
};

const fetcher = () => getPurchasedTours().then((res) => res.data);

function MyToursTab() {
  const {
    data: purchasedTours,
    error,
    isLoading,
  } = useSWR("/user/tours", fetcher);

  if (isLoading) {
    return <p>در حال بارگذاری سفرهای شما...</p>;
  }
  if (error) {
    return <p>خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.</p>;
  }
  if (!purchasedTours || purchasedTours.length === 0) {
    return <p>شما هنوز هیچ توری خریداری نکرده‌اید.</p>;
  }

  return (
    <div className={styles.myToursTab}>
      {purchasedTours.map((tour, index) => {
        const vehicle = getVehicleInfo(tour.fleetVehicle);
        const status = getTourStatus(tour.startDate, tour.endDate);

        return (
          <div key={`${tour.id}-${index}`} className={styles.tourCard}>
            <div className={styles.tourHeader}>
              <div className={styles.itemHeader}>
                <h2>{tour.title}</h2>
                <img src="/images/sun-fog-empty.svg" />
              </div>
              <div className={styles.itemHeader}>
                <span>{vehicle.text}</span>
                <img src={vehicle.icon} alt={vehicle.text} />
              </div>
              <div className={styles.itemHeaderStatus}>
                <div className={`${styles.statusBadge} ${status.className}`}>
                  {status.text}
                </div>
              </div>
            </div>

            <div className={styles.tourDetails}>
              <div className={styles.tourInfo}>
                <p>
                  {`${translateCityById(tour.origin.id)} به ${translateCityById(
                    tour.destination.id
                  )}`}
                  <span className={styles.dat}>.</span>
                  <span>{formatToJalali(tour.startDate)}</span>
                </p>
                <p>
                  تاریخ برگشت
                  <span className={styles.dat}>.</span>
                  <span>{formatToJalali(tour.endDate)}</span>
                </p>
              </div>
              <hr className={styles.lineHr} />
              <div className={styles.tourMeta}>
                <p className={styles.tourId}>
                  شماره تور
                  <span>{tour.id.substring(0, 8).toUpperCase()}</span>
                </p>
                <p className={styles.tourPrice}>
                  مبلغ پرداخت شده
                  <span className={styles.tourPriceLabel1}>
                    {formatToPersianNumber(tour.price)}{" "}
                  </span>
                  <span className={styles.tourPriceLabel2}>تومان</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyToursTab;
