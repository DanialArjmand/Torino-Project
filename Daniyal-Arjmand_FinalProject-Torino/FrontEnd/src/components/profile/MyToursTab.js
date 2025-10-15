"use client";

import useSWR from "swr";
import { getPurchasedTours } from "@/lib/api/config";
import styles from "./ProfileForm.module.css";
import { formatToJalali, formatToPersianNumber } from "@/lib/formatters";

const getVehicleInfo = (vehicle) => {
  const lowerCaseVehicle = vehicle?.toLowerCase() || "";
  switch (lowerCaseVehicle) {
    case "airplane":
      return { text: "سفر با هواپیما", icon: "/images/airplane-icon.svg" };
    case "ship":
      return { text: "سفر با کشتی", icon: "/images/ship-icon.svg" };
    case "bus":
      return { text: "سفر با اتوبوس", icon: "/images/bus-icon.svg" };
    default:
      return { text: "سفر", icon: "/images/default-vehicle.svg" };
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
  return { text: "آینده", className: styles.statusUpcoming };
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
              {/* <div className={styles.tourTitle}>
                <h3>{tour.title}</h3>
                <p>{`${tour.origin.name} به ${tour.destination.name}`}</p>
              </div>
              <div className={styles.tourVehicle}>
                <img src={vehicle.icon} alt={vehicle.text} />
                <span>{vehicle.text}</span>
              </div> */}
              <div>
                <h3>{tour.title}</h3>
                <img src="/images/sun-fog-empty.svg" />
              </div>
              <div></div>
              <div></div>
            </div>

            <div className={styles.tourDetails}>
              <div className={styles.tourInfo}>
                <p>
                  تاریخ برگشت: <span>{formatToJalali(tour.endDate)}</span>
                </p>
                <p>
                  تاریخ رفت: <span>{formatToJalali(tour.startDate)}</span>
                </p>
              </div>
              <div className={styles.tourMeta}>
                <p>
                  شماره تور:
                  <span>{tour.id.substring(0, 8).toUpperCase()}</span>
                </p>
                <p>
                  مبلغ پرداخت شده:
                  <span>{formatToPersianNumber(tour.price)} تومان</span>
                </p>
              </div>
            </div>
            <div className={styles.tourFooter}>
              <div className={`${styles.statusBadge} ${status.className}`}>
                {status.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyToursTab;
