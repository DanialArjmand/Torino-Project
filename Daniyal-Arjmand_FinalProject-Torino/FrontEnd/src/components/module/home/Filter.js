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
  const [highlightedOriginIndex, setHighlightedOriginIndex] = useState(-1);
  const [highlightedDestinationIndex, setHighlightedDestinationIndex] =
    useState(-1);

  const handleSearchClick = () => {
    let originId = origin.id;
    let destinationId = destination.id;
    if (!originId && origin.name) {
      const cityEntry = Object.entries(apiCityMap).find(
        ([id, name]) => name === origin.name.trim()
      );
      if (cityEntry) {
        originId = cityEntry[0];
      }
    }

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

  const allCities = useMemo(() => {
    return Object.entries(apiCityMap).map(([id, name]) => ({ id, name }));
  }, []);

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

  const filteredDestinations = useMemo(() => {
    if (!destination.name.trim()) {
      return popularCities;
    }
    return allCities.filter((city) =>
      city.name.startsWith(destination.name.trim())
    );
  }, [destination.name, popularCities, allCities]);

  const filteredOrigins = useMemo(() => {
    if (!origin.name.trim()) {
      return popularCities;
    }
    return allCities.filter((city) => city.name.startsWith(origin.name.trim()));
  }, [origin.name, popularCities, allCities]);

  const handleKeyDown = (e, type) => {
    const list = type === "origin" ? filteredOrigins : filteredDestinations;
    const setHighlightedIndex =
      type === "origin"
        ? setHighlightedOriginIndex
        : setHighlightedDestinationIndex;
    const highlightedIndex =
      type === "origin" ? highlightedOriginIndex : highlightedDestinationIndex;
    const setCity = type === "origin" ? setOrigin : setDestination;
    const setIsOpen =
      type === "origin" ? setIsOriginOpen : setIsDestinationOpen;

    if (!list.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prevIndex) => (prevIndex + 1) % list.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(
          (prevIndex) => (prevIndex - 1 + list.length) % list.length
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < list.length) {
          const selectedCity = list[highlightedIndex];
          setCity({ id: selectedCity.id, name: selectedCity.name });
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

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
            onKeyDown={(e) => handleKeyDown(e, "destination")}
          />
          <img src="/images/global-search.svg" alt="Global Search" />
          {isDestinationOpen && (
            <div className={styles.dropdown}>
              <h4 className={styles.dropdownHeader}>
                {destination.name.trim() ? "نتایج جستجو" : "پرتردد"}
              </h4>
              <ul dir="rtl">
                {filteredDestinations.map((city, index) => (
                  <li
                    key={city.id}
                    className={
                      index === highlightedDestinationIndex
                        ? styles.highlighted
                        : ""
                    }
                    onMouseDown={() => {
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
                {filteredDestinations.length === 0 &&
                  destination.name.trim() && (
                    <li className={styles.noResult}>نتیجه‌ای یافت نشد</li>
                  )}
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
            onKeyDown={(e) => handleKeyDown(e, "origin")}
          />
          <img src="/images/location.svg" alt="Location" />
          {isOriginOpen && (
            <div className={styles.dropdown}>
              <h4 className={styles.dropdownHeader}>
                {origin.name.trim() ? "نتایج جستجو" : "پرتردد"}
              </h4>
              <ul dir="rtl">
                {filteredOrigins.map((city, index) => (
                  <li
                    key={city.id}
                    className={
                      index === highlightedOriginIndex ? styles.highlighted : ""
                    }
                    onMouseDown={() => {
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
                {filteredOrigins.length === 0 && origin.name.trim() && (
                  <li className={styles.noResult}>نتیجه‌ای یافت نشد</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
