import api from "@/lib/api/config";
import TourDetails from "@/components/details/TourDetails";

async function getTourDetails(id) {
  try {
    const response = await api.get(`/tour/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tour details:", error);
    return null;
  }
}

export default async function TourDetailPage({ params }) {
  const tourId = params.id;
  const tour = await getTourDetails(tourId);

  if (!tour) {
    return <div>تور مورد نظر یافت نشد.</div>;
  }

  return <TourDetails tour={tour} />;
}
