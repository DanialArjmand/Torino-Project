"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import api from "@/lib/api/config";
import dynamic from "next/dynamic";
import Filter from "../module/home/Filter";
import { DateObject } from "react-multi-date-picker";

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
    if (filters.date && filters.date.length === 2) {
      // ✅ راه‌حل نهایی و بدون باگ منطقه زمانی:
      
      // ۱. آبجکت تاریخ شمسی را به یک آبجکت تاریخ میلادی تبدیل می‌کنیم.
      //    این کار به صورت خالص و بدون درگیر شدن با منطقه زمانی سیستم انجام می‌شود.
      const gregorianStart = new DateObject(filters.date[0]).convert("gregorian", "en");
      const gregorianEnd = new DateObject(filters.date[1]).convert("gregorian", "en");

      // ۲. آبجکت میلادی را به فرمت رشته‌ای دقیق مورد نیاز API تبدیل می‌کنیم.
      params.append("startDate", gregorianStart.format("YYYY-MM-DD"));
      params.append("endDate", gregorianEnd.format("YYYY-MM-DD"));
    }
    
    const queryString = params.toString();
    return queryString ? `/tour?${queryString}` : "/tour";
  }, [filters]);

  const {
    data: filteredTours,
    error,
    isLoading,
  } = useSWR(apiUrl, fetcher, {
    fallbackData: initialTours,
    keepPreviousData: true,
  });

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
        <TourList tours={filteredTours} />
      )}

      <Advertisement />
      <Description />
      <Features />
    </div>
  );
}
