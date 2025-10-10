"use client";

import { useState, useMemo } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import styles from "@/components/module/home/Filter.module.css";
import "./calender.css";

const cityTranslations = {
  tehran: "تهران",
  isfahan: "اصفهان",
  shiraz: "شیراز",
  yazd: "یزد",
  mashhad: "مشهد",
  tabriz: "تبریز",
  sananndaj: "سنندج",
  kerman: "کرمان",
  ahvaz: "اهواز",
  rasht: "رشت",
  karaj: "کرج",
  qom: "قم",
};

function Filter({ tours, onSearch }) {
  const [date, setDate] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);

  const handleSearchClick = () => {
    console.log("search clicked ✅", { origin, destination, date });
    onSearch({
      date,
      origin,
      destination,
    });
  };

  const popularCities = useMemo(() => {
    if (!tours || tours.length === 0) return [];

    const cityCounts = {};
    tours.forEach((tour) => {
      const originName = tour.origin?.name?.toLowerCase();
      const destName = tour.destination?.name?.toLowerCase();

      if (originName) {
        cityCounts[originName] = (cityCounts[originName] || 0) + 1;
      }
      if (destName) {
        cityCounts[destName] = (cityCounts[destName] || 0) + 1;
      }
    });

    return Object.keys(cityCounts)
      .sort((a, b) => cityCounts[b] - cityCounts[a])
      .slice(0, 5)
      .map((cityKey) => cityTranslations[cityKey] || cityKey);
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
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            placeholder="تاریخ "
            inputClass={styles.customDate}
          />
          <img src="/images/calendar.svg" alt="Calendar" />
        </div>

        <div className={`${styles.childDiv} ${styles.positionRelative}`}>
          <input
            placeholder="مقصد"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => setIsDestinationOpen(true)}
            onBlur={() => setTimeout(() => setIsDestinationOpen(false), 150)}
          />
          <img src="/images/global-search.svg" alt="Global Search" />

          {isDestinationOpen && (
            <div className={styles.dropdown}>
              <h4 className={styles.dropdownHeader}>پرتردد </h4>

              <ul dir="rtl">
                {popularCities.map((city) => (
                  <li
                    key={city}
                    onClick={() => {
                      setDestination(city);
                      setIsDestinationOpen(false);
                    }}
                  >
                    <img
                      src="/images/location.svg"
                      alt="location icon"
                      className={styles.locationIcon}
                    />
                    <span>{city}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={`${styles.lastDiv} ${styles.positionRelative}`}>
          <input
            placeholder="مبدا"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            onFocus={() => setIsOriginOpen(true)}
            onBlur={() => setTimeout(() => setIsOriginOpen(false), 150)}
          />
          <img src="/images/location.svg" alt="Location" />
          {isOriginOpen && (
            <div className={styles.dropdown}>
              <h4 className={styles.dropdownHeader}>پرتردد </h4>

              <ul dir="rtl">
                {popularCities.map((city) => (
                  <li
                    key={city}
                    onClick={() => {
                      setOrigin(city);
                      setIsOriginOpen(false);
                    }}
                  >
                    <img
                      src="/images/location.svg"
                      alt="location icon"
                      className={styles.locationIcon}
                    />
                    <span>{city}</span>
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
