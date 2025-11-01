"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "@/lib/schema/validationSchemas";
import { useRouter } from "next/navigation";
import { createOrder, getUserProfile } from "@/app/api/config";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import BookingInformation from "./BookingInformation";
import BookingForm from "./BookingForm";
import styles from "./BookingWrapper.module.css";

const fetcher = getUserProfile;

function BookingWrapper({ tour }) {
  const { data: user, isLoading } = useSWR("/user/profile", fetcher);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
  });

  useEffect(() => {
    if (!isLoading && user && Object.keys(user).length > 0) {
      reset({
        fullName: user.fullName || "",
        nationalCode: user.nationalCode || "",
        gender: user.gender || "",
        birthDate: user.birthDate ? new Date(user.birthDate) : null,
      });
    }
  }, [user, isLoading, reset]);

  const onSubmit = async (data) => {
    try {
      await createOrder({ ...data, tourId: tour.id });
      toast.success("تور شما با موفقیت رزرو شد!");
      router.push("/user/profile");
    } catch (error) {
      toast.error("خطا در ثبت رزرو. لطفاً دوباره تلاش کنید.");
      console.error(error);
    }
  };

  return (
    <form
      id="booking-form"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formContainer}
    >
      <BookingInformation tour={tour} />
      <BookingForm register={register} control={control} errors={errors} />
    </form>
  );
}

export default BookingWrapper;
