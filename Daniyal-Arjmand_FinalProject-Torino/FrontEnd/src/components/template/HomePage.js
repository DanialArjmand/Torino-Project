"use client";

import useSWR from "swr";
import api from "@/lib/api/config";
import Advertisement from "../module/home/Advertisement";
import Description from "../module/home/Description";
import Features from "../module/home/Features";
import Filter from "../module/home/Filter";
import TourList from "../module/home/TourList";

const fetcher = (url) => api.get(url).then((res) => res.data);

export default function HomePage({ initialTours }) {
  const { data: tours } = useSWR("/tour", fetcher, {
    fallbackData: initialTours,
  });

  return (
    <div>
      <Filter tours={tours} />
      <TourList tours={tours} />
      <Advertisement />
      <Description />
      <Features />
    </div>
  );
}
