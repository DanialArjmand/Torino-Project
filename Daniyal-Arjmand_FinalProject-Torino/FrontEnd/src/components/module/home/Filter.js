"use client";

import { useState, useMemo } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { apiCityMap } from "@/data/apiCities";
import styles from "@/components/module/home/Filter.module.css";
import "./calender.css";

function Filter({ tours, onSearch }) {
 const [date, setDate] = useState([]);
  const [origin, setOrigin] = useState({ id: "", name: "" });
  const [destination, setDestination] = useState({ id: "", name: "" });

  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);

  const handleSearchClick = () => {
    let originId = origin.id;
    let destinationId = destination.id;

    // ✅ راه‌حل باگ جستجوی متنی:
    // اگر ID مبدا وجود نداشت، سعی کن آن را از روی نام تایپ شده پیدا کنی
    if (!originId && origin.name) {
      const cityEntry = Object.entries(apiCityMap).find(
        ([id, name]) => name === origin.name.trim()
      );
      if (cityEntry) {
        originId = cityEntry[0];
      }
    }

    // اگر ID مقصد وجود نداشت، همین کار را برای آن هم انجام بده
    if (!destinationId && destination.name) {
      const cityEntry = Object.entries(apiCityMap).find(
        ([id, name]) => name === destination.name.trim()
      );
      if (cityEntry) {
        destinationId = cityEntry[0];
      }
    }

    onSearch({
      date,
      origin: originId,
      destination: destinationId,
    });
  };

  const popularCities = useMemo(() => {
    if (!tours || tours.length === 0) return [];
    const cityCounts = {};
    tours.forEach((tour) => {
      const originId = tour.origin?.id;
      const destId = tour.destination?.id;
      if (originId) {
        cityCounts[originId] = (cityCounts[originId] || 0) + 1;
      }
      if (destId) {
        cityCounts[destId] = (cityCounts[destId] || 0) + 1;
      }
    });
    return Object.keys(cityCounts)
      .sort((a, b) => cityCounts[b] - cityCounts[a])
      .slice(0, 5)
      .map((cityId) => ({
        id: cityId,
        name: apiCityMap[cityId] || `شهر ${cityId}`,
      }));
  }, [tours]);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src="/images/Banner_design__1.svg" alt="Banner" />
      </div>
      <h2 className={styles.title}>
        <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
      </h2>
      <div className={styles.filterContainer}>
        <button onClick={handleSearchClick} className={styles.button}>
          جستجو
        </button>
        <div className={styles.childDiv}>
          <DatePicker
            value={date}
            onChange={setDate}
            range
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            placeholder="تاریخ"
            inputClass={styles.customDate}
          />
          <img src="/images/calendar.svg" alt="Calendar" />
        </div>

        <div className={`${styles.childDiv} ${styles.positionRelative}`}>
          <input
            placeholder="مقصد"
            value={destination.name}
            onChange={(e) => setDestination({ id: "", name: e.target.value })}
            onFocus={() => setIsDestinationOpen(true)}
            onBlur={() => setTimeout(() => setIsDestinationOpen(false), 150)}
          />
          <img src="/images/global-search.svg" alt="Global Search" />
          {isDestinationOpen && (
            <div className={styles.dropdown}>
              <h4 className={styles.dropdownHeader}>پرتردد</h4>
              <ul dir="rtl">
                {popularCities.map((city) => (
                  <li
                    key={city.id}
                    onClick={() => {
                      setDestination({ id: city.id, name: city.name });
                      setIsDestinationOpen(false);
                    }}
                  >
                    <img
                      src="/images/location.svg"
                      alt="location icon"
                      className={styles.locationIcon}
                    />
                    <span>{city.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={`${styles.lastDiv} ${styles.positionRelative}`}>
          <input
            placeholder="مبدا"
            value={origin.name}
            onChange={(e) => setOrigin({ id: "", name: e.target.value })}
            onFocus={() => setIsOriginOpen(true)}
            onBlur={() => setTimeout(() => setIsOriginOpen(false), 150)}
          />
          <img src="/images/location.svg" alt="Location" />
          {isOriginOpen && (
            <div className={styles.dropdown}>
              <h4 className={styles.dropdownHeader}>پرتردد</h4>
              <ul dir="rtl">
                {popularCities.map((city) => (
                  <li
                    key={city.id}
                    onClick={() => {
                      setOrigin({ id: city.id, name: city.name });
                      setIsOriginOpen(false);
                    }}
                  >
                    <img
                      src="/images/location.svg"
                      alt="location icon"
                      className={styles.locationIcon}
                    />
                    <span>{city.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
