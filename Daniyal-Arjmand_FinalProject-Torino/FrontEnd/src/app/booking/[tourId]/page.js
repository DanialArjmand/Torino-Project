import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "@/lib/api/config";
import BookingForm from "@/components/booking/BookingForm";
import BookingInformation from "@/components/booking/BookingInformation";

import styles from "@/app/booking/[tourId]/page.module.css"

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

  return (
    <div className={styles.content}>
      <BookingInformation tour={tour} />
      <BookingForm tourId={tourId} />
    </div>
  );
}
