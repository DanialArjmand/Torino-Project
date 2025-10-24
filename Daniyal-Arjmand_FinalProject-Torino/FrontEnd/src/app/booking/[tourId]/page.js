import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "@/lib/api/config";
import BookingWrapper from "@/components/template/booking/BookingWrapper";

async function getTourDetails(id) {
  try {
    const response = await api.get(`/tour/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function BookingPage({ params }) {
  const token = cookies().get("accessToken");
  if (!token) {
    redirect("/");
  }

  const tourId = params.tourId;
  const tour = await getTourDetails(tourId);

  if (!tour) {
    return <div>تور مورد نظر یافت نشد.</div>;
  }

  return <BookingWrapper tour={tour} />;
}
