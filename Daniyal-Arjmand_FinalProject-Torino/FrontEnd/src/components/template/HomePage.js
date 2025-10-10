"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import api from "@/lib/api/config";
import dynamic from "next/dynamic";
import Filter from "../module/home/Filter";

import styles from "./Home.module.css";

const fetcher = (url) => api.get(url).then((res) => res.data);

const TourList = dynamic(() => import("../module/home/TourList"), {
  loading: () => <p>در حال بارگذاری تورها...</p>,
});
const Advertisement = dynamic(() => import("../module/home/Advertisement"));
const Description = dynamic(() => import("../module/home/Description"));
const Features = dynamic(() => import("../module/home/Features"));

const reverseCityTranslations = {
  تهران: "tehran",
  اصفهان: "isfahan",
  شیراز: "shiraz",
  یزد: "yazd",
  مشهد: "mashhad",
  تبریز: "tabriz",
  سنندج: "sananndaj",
  کرمان: "kerman",
  اهواز: "ahvaz",
  رشت: "rasht",
  کرج: "karaj",
  قم: "qom",
};

export default function HomePage({ initialTours }) {
  const [filters, setFilters] = useState({
    origin: "",
    destination: "",
    date: null,
  });

  const { data: allTours, error } = useSWR("/tour", fetcher, {
    fallbackData: initialTours,
  });

  const filteredTours = useMemo(() => {
    if (!allTours) return [];

    const noFilters = !filters.origin && !filters.destination && !filters.date;
    if (noFilters) {
      return allTours;
    }

    return allTours.filter((tour) => {
      const originFilter = filters.origin
        ? (
            reverseCityTranslations[filters.origin] || filters.origin
          ).toLowerCase()
        : "";
      const tourOrigin = tour.origin?.name?.toLowerCase() || "";
      const matchesOrigin = originFilter
        ? tourOrigin.includes(originFilter)
        : true;

      const destFilter = filters.destination
        ? (
            reverseCityTranslations[filters.destination] || filters.destination
          ).toLowerCase()
        : "";
      const tourDest = tour.destination?.name?.toLowerCase() || "";
      const matchesDestination = destFilter
        ? tourDest.includes(destFilter)
        : true;

      const matchesDate = filters.date
        ? new Date(tour.startDate).getTime() <=
            new Date(filters.date.format()).getTime() &&
          new Date(tour.endDate).getTime() >=
            new Date(filters.date.format()).getTime()
        : true;

      return matchesOrigin && matchesDestination && matchesDate;
    });
  }, [allTours, filters]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Filter tours={initialTours} onSearch={handleSearch} />
      {error ? (
        <div>خطا در بارگذاری تورها</div>
      ) : (
        <TourList tours={filteredTours} />
      )}
      <Advertisement />
      <Description />
      <Features />
    </div>
  );
}
