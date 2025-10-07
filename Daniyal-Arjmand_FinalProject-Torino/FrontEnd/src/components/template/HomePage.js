import Advertisement from "../module/home/Advertisement";
import Description from "../module/home/Description";
import Features from "../module/home/Features";
import Filter from "../module/home/Filter";
import TourList from "../module/home/TourList";

export default function HomePage({ initialTours }) {
  return (
    <div>
      <Filter />
      <TourList initialTours={initialTours} />
      <Advertisement />
      <Description />
      <Features />
    </div>
  );
}
