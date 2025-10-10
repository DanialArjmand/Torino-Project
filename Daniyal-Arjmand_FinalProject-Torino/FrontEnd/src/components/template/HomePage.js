"use client";

import useSWR from "swr";
import api from "@/lib/api/config";
import dynamic from "next/dynamic";
import Filter from "../module/home/Filter";

const fetcher = (url) => api.get(url).then((res) => res.data);

const TourList = dynamic(() => import("../module/home/TourList"), {
  loading: () => <p>در حال بارگذاری تورها...</p>,
});
const Advertisement = dynamic(() => import("../module/home/Advertisement"));
const Description = dynamic(() => import("../module/home/Description"));
const Features = dynamic(() => import("../module/home/Features"));

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
