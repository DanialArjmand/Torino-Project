"use client";

import useSWR from "swr";
import api from "@/lib/api/config";
import styles from "@/components/module/home/TourList.module.css";

const fetcher = (url) => api.get(url).then((res) => res.data);

function formatToJalali(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function translateVehicle(vehicle) {
  const vehicleTranslations = {
    suv: "شاسی بلند",
    train: "قطار",
    ship: "کشتی",
    bus: "اتوبوس",
    airplane: "هواپیما",
  };

  const lowerCaseVehicle = vehicle.toLowerCase();

  return vehicleTranslations[lowerCaseVehicle] || vehicle;
}

function calculateTourDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end.getTime() - start.getTime();

  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  const duration = Math.round(diffDays) + 1;

  return duration;
}

function formatToPersianNumber(number) {
  return new Intl.NumberFormat("fa-IR").format(number);
}

function TourList({ initialTours }) {
  const {
    data: tours,
    error,
    isLoading,
  } = useSWR("/tour", fetcher, {
    fallbackData: initialTours,
  });

  console.log(initialTours);

  if (error) return <div>خطا در دریافت اطلاعات تورها...</div>;
  if (isLoading && !tours) return <div>در حال بارگذاری تورها...</div>;
  if (!tours || tours.length === 0)
    return <div>هیچ توری برای نمایش وجود ندارد.</div>;

  return (
    <div className={styles.tourList}>
      <h2>همه تور ها</h2>
      <div className={styles.parentContainer}>
        {tours.map((tour) => {
          const formattedStartDate = formatToJalali(tour.startDate);
          const optionsString = tour.options ? tour.options.join(" | ") : "";
          const translatedVehicle = translateVehicle(tour.fleetVehicle);
          const persianPrice = formatToPersianNumber(tour.price);
          const duration = calculateTourDuration(tour.startDate, tour.endDate);

          return (
            <div className={styles.container} key={tour.id}>
              <div className={styles.description}>
                <div className={styles.image}>
                  <img src={tour.image} alt={tour.title}/>
                </div>
                <div className={styles.text}>
                  <h1>{tour.title}</h1>
                  <p>
                    {formattedStartDate}.{duration}-{translatedVehicle}-
                    {optionsString}
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
        })}
      </div>
    </div>
  );
}

export default TourList;
