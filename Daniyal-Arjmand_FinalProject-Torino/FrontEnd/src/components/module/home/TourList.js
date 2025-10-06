"use client";

import useSWR from "swr";
import api from "@/lib/api/config";

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
    <div>
      <h2>همه تورها</h2>

      {tours.map((tour) => {
        const formattedStartDate = formatToJalali(tour.startDate);
        const optionsString = tour.options ? tour.options.join(" | ") : "";
        const translatedVehicle = translateVehicle(tour.fleetVehicle);
        const persianPrice = formatToPersianNumber(tour.price);

        return (
          <div key={tour.id}>
            <div style={{ backgroundImage: `url(${tour.imageUrl})` }}>
              {/* <img src={tour.image} alt={tour.title} /> */}
              <h2>{tour.title}</h2>
              <p>
                {formattedStartDate}.{translatedVehicle}-{optionsString}
              </p>
            </div>
            {tour.title} - قیمت: {persianPrice} تومان
          </div>
        );
      })}
    </div>
  );
}

export default TourList;
