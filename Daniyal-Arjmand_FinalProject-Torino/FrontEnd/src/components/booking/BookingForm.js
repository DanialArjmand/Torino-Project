"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "@/lib/schema/validationSchemas";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/api/config";
import styles from "@/components/booking/BookingForm.module.css";
import "@/components/module/home/calender.css";

function BookingForm({ tourId }) {
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
      await createOrder({ ...data, tourId });
      alert("تور شما با موفقیت رزرو شد!");
      router.push("/profile/my-tours");
    } catch (error) {
      alert("خطا در ثبت رزرو. لطفاً دوباره تلاش کنید.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.information}>
          <h2>مشخصات مسافر</h2>
          <img src="/images/frame-black.svg" />
        </div>
        <div className={styles.information}>
          <div className={styles.inputsData}>
            <Controller
              control={control}
              name="birthDate"
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date ? date.format("YYYY-MM-DD") : null);
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  placeholder="تاریخ تولد"
                  inputClass={styles.customDateInput}
                />
              )}
            />
            {errors.birthDate && (
              <p className={styles.error}>{errors.birthDate.message}</p>
            )}
          </div>

          <div className={`${styles.inputs} ${styles.genderInput}`}>
            <select {...register("gender")} className={styles.customSelect}>
              <option value="">جنسیت</option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          <div className={styles.inputs}>
            <input {...register("nationalCode")} placeholder="کدملی" />
            {errors.nationalCode && <p>{errors.nationalCode.message}</p>}
          </div>

          <div className={styles.inputs}>
            <input {...register("fullName")} placeholder="نام و نام خانوادگی" />
            {errors.fullName && <p>{errors.fullName.message}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}

export default BookingForm;
