import Filter from "../module/home/Filter";
import TourList from "../module/home/TourList";

export default function HomePage({ initialTours }) {
  return (
    <div>
      <Filter />
      <TourList initialTours={initialTours} />
    </div>
  );
}
