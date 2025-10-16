"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "@/lib/schema/validationSchemas";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/api/config";
import BookingInformation from "./BookingInformation";
import BookingForm from "./BookingForm";
import styles from "./BookingWrapper.module.css";

function BookingWrapper({ tour }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
  });

  const onSubmit = async (data) => {
    try {
      await createOrder({ ...data, tourId: tour.id });
      alert("تور شما با موفقیت رزرو شد!");
      router.push("/user/profile");
    } catch (error) {
      alert("خطا در ثبت رزرو. لطفاً دوباره تلاش کنید.");
      console.error(error);
    }
  };

  return (
    <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <BookingInformation tour={tour} />
      <BookingForm 
        register={register} 
        control={control} 
        errors={errors} 
      />
    </form>
  );
}

export default BookingWrapper;