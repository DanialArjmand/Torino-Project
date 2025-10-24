"use client";

import { Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import styles from "./BookingForm.module.css";
import "@/components/module/home/filter/calender.css";

function BookingForm({ register, control, errors }) {
  return (
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
                onChange={(dateObject) => {
                  field.onChange(dateObject ? dateObject.toDate() : null);
                }}
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                placeholder="تاریخ تولد"
                inputClass={styles.customDateInput}
              />
            )}
          />
          <div className={styles.parentError}>
            {errors.birthDate && (
              <p className={styles.error}>{errors.birthDate.message}</p>
            )}
          </div>
        </div>

        <div className={`${styles.inputs} ${styles.genderInput}`}>
          <select {...register("gender")} className={styles.customSelect}>
            <option value="">جنسیت</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
          <div className={styles.parentError}>
            {errors.gender && (
              <p className={styles.error}>{errors.gender.message}</p>
            )}
          </div>
        </div>

        <div className={styles.inputs}>
          <input {...register("nationalCode")} placeholder="کدملی" />

          <div className={styles.parentError}>
            {errors.nationalCode && (
              <p className={styles.error}>{errors.nationalCode.message}</p>
            )}
          </div>
        </div>

        <div className={styles.inputs}>
          <input {...register("fullName")} placeholder="نام و نام خانوادگی" />
          <div className={styles.parentError}>
            {errors.fullName && (
              <p className={styles.error}>{errors.fullName.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
