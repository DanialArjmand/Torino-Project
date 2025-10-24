"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import api from "@/lib/api/config";
import dynamic from "next/dynamic";
import Filter from "../module/home/Filter";

import styles from "./Home.module.css";

const fetcher = (url) => api.get(url).then((res) => res.data);

const TourList = dynamic(() => import("../module/home/TourList"), {
  loading: () => <p className={styles.text}>در حال بارگذاری تورها...</p>,
});
const Advertisement = dynamic(() => import("../module/home/Advertisement"));
const Description = dynamic(() => import("../module/home/Description"));
const Features = dynamic(() => import("../module/home/Features"));

export default function HomePage({ initialTours }) {
  const [filters, setFilters] = useState({
    origin: "",
    destination: "",
    date: [],
  });

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.origin) {
      params.append("originId", filters.origin);
    }
    if (filters.destination) {
      params.append("destinationId", filters.destination);
    }
    const queryString = params.toString();
    return queryString ? `/tour?${queryString}` : "/tour";
  }, [filters.origin, filters.destination]);

  const {
    data: toursFromApi,
    error,
    isLoading,
  } = useSWR(apiUrl, fetcher, {
    fallbackData: initialTours,
    keepPreviousData: true,
  });

  const displayedTours = useMemo(() => {
    if (!toursFromApi) return [];

    if (!filters.date || filters.date.length !== 2) {
      return toursFromApi;
    }

    const filterStart = filters.date[0].toDate().getTime();
    const filterEnd = filters.date[1].toDate().getTime();

    return toursFromApi.filter((tour) => {
      if (!tour.startDate) return false;
      const tourStart = new Date(tour.startDate).getTime();

      return tourStart >= filterStart && tourStart <= filterEnd;
    });
  }, [toursFromApi, filters.date]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Filter tours={initialTours} onSearch={handleSearch} />

      {error ? (
        <p className={styles.text}>خطا در بارگذاری تورها</p>
      ) : isLoading ? (
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
