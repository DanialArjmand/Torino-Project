"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import api from "@/app/api/config";
import dynamic from "next/dynamic";
import Filter from "../module/home/filter/Filter";
import { apiCityMap } from "@/data/apiCities";

import styles from "./Home.module.css";

const fetcher = (url) => api.get(url).then((res) => res.data);

const TourList = dynamic(() => import("../module/home/tours/TourList"), {
  loading: () => <p className={styles.text}>در حال بارگذاری تورها...</p>,
  ssr: false,
});
const Advertisement = dynamic(() => import("../module/home/Advertisement"), {
  ssr: false,
});
const Description = dynamic(() => import("../module/home/Description"), {
  ssr: false,
});
const Features = dynamic(() => import("../module/home/Features"), {
  ssr: false,
});

const findCityId = (cityState) => {
  if (cityState.id) return { id: cityState.id, isValid: true };
  if (cityState.name) {
    const cityEntry = Object.entries(apiCityMap).find(
      ([id, name]) => name === cityState.name.trim()
    );
    if (cityEntry) {
      return { id: cityEntry[0], isValid: true };
    } else {
      return { id: "", isValid: false };
    }
  }
  return { id: "", isValid: true };
};

export default function HomePage({ initialTours }) {
  const [filters, setFilters] = useState({
    origin: { id: "", name: "" },
    destination: { id: "", name: "" },
    date: [],
  });

  const apiUrl = useMemo(() => {
    const originResult = findCityId(filters.origin);
    const destinationResult = findCityId(filters.destination);

    if (!originResult.isValid || !destinationResult.isValid) {
      console.log("Invalid city input detected, skipping API call.");
      return null;
    }

    const params = new URLSearchParams();
    if (originResult.id) {
      params.append("originId", originResult.id);
    }
    if (destinationResult.id) {
      params.append("destinationId", destinationResult.id);
    }
    const queryString = params.toString();
    return queryString ? `/tour?${queryString}` : "/tour";
  }, [filters]);

  const {
    data: toursFromApi,
    error,
    isLoading,
  } = useSWR(apiUrl, fetcher, {
    fallbackData: initialTours,
    keepPreviousData: true,
  });

  const displayedTours = useMemo(() => {
    const originResult = findCityId(filters.origin);
    const destinationResult = findCityId(filters.destination);

    if (!originResult.isValid || !destinationResult.isValid) {
      return [];
    }

    const currentTours = toursFromApi || [];

    if (!filters.date || filters.date.length !== 2) {
      return currentTours;
    }

    try {
      const filterStart = filters.date[0].toDate().getTime();
      const filterEnd = filters.date[1].toDate().getTime();

      return currentTours.filter((tour) => {
        if (!tour.startDate) return false;
        const tourStart = new Date(tour.startDate).getTime();
        return tourStart >= filterStart && tourStart <= filterEnd;
      });
    } catch (dateError) {
      console.error("Error processing date filter:", dateError);
      return currentTours;
    }
  }, [filters, toursFromApi]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Filter tours={initialTours} onSearch={handleSearch} />

      {error ? (
        <p className={styles.text}>خطا در بارگذاری تورها</p>
      ) : isLoading && apiUrl !== null ? (
        <p className={styles.text}>در حال جستجوی تورها...</p>
      ) : (
        <TourList tours={displayedTours} />
      )}

      <Advertisement />
      <Description />
      <Features />
    </div>
  );
}
