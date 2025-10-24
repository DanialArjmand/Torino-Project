"use client";

import { useState, useMemo } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { apiCityMap } from "@/data/apiCities";
import styles from "./Filter.module.css";
import FilterDropdowns from "./FilterDropdowns";
import "./calender.css";

export default function FilterSearchSection({ tours, onSearch }) {
  const [date, setDate] = useState([]);
  const [origin, setOrigin] = useState({ id: "", name: "" });
  const [destination, setDestination] = useState({ id: "", name: "" });
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [highlightedOriginIndex, setHighlightedOriginIndex] = useState(-1);
  const [highlightedDestinationIndex, setHighlightedDestinationIndex] =
    useState(-1);

  const allCities = useMemo(() => {
    return Object.entries(apiCityMap).map(([id, name]) => ({ id, name }));
  }, []);

  const popularCities = useMemo(() => {
    if (!tours || tours.length === 0) return [];
    const cityCounts = {};
    tours.forEach((tour) => {
      const originId = tour.origin?.id;
      const destId = tour.destination?.id;
      if (originId) cityCounts[originId] = (cityCounts[originId] || 0) + 1;
      if (destId) cityCounts[destId] = (cityCounts[destId] || 0) + 1;
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
    if (!destination.name.trim()) return popularCities;
    return allCities.filter((city) =>
      city.name.startsWith(destination.name.trim())
    );
  }, [destination.name, popularCities, allCities]);

  const filteredOrigins = useMemo(() => {
    if (!origin.name.trim()) return popularCities;
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

  const handleSearchClick = () => {
    const findCityId = (cityState) => {
      if (cityState.id) return cityState.id;

      if (cityState.name) {
        const cityEntry = Object.entries(apiCityMap).find(
          ([id, name]) => name === cityState.name.trim()
        );
        return cityEntry ? cityEntry[0] : "";
      }
      return "";
    };

    onSearch({
      date,
      origin: origin,
      destination: destination,
    });
  };

  const handleSelectCity = (city, type) => {
    if (type === "origin") {
      setOrigin({ id: city.id, name: city.name });
      setIsOriginOpen(false);
    } else {
      setDestination({ id: city.id, name: city.name });
      setIsDestinationOpen(false);
    }
  };

  return (
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
        <FilterDropdowns
          isOpen={isDestinationOpen}
          value={destination.name}
          cities={filteredDestinations}
          highlightedIndex={highlightedDestinationIndex}
          onSelect={(city) => handleSelectCity(city, "destination")}
        />
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
        <FilterDropdowns
          isOpen={isOriginOpen}
          value={origin.name}
          cities={filteredOrigins}
          highlightedIndex={highlightedOriginIndex}
          onSelect={(city) => handleSelectCity(city, "origin")}
        />
      </div>
    </div>
  );
}
