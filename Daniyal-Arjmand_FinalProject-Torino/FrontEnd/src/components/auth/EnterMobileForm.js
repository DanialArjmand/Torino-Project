"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mobileSchema } from "@/lib/schema/validationSchemas";
import styles from "@/components/auth/EnterMobileForm.module.css";

function EnterMobileForm({ onMobileSubmit, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(mobileSchema),
  });

  const onSubmit = (data) => {
    onMobileSubmit(data.mobile);
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.backgroundBlur} onClick={onClose}>
      <div className={styles.container} onClick={handleModalContentClick}>
        <div className={styles.header}>
          <button
            onClick={() => {
              console.log("clicked close");
              onClose();
            }}
            className={styles.closeButton}
          >
            <img src="/images/close.svg" alt="Close" />
          </button>
        </div>
        <h2 className={styles.title}>ورود به تورینو </h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label>شماره موبایل خود را وارد کنید</label>
          <input
            type="tel"
            className={styles.input}
            placeholder="۰۹۱۲***۴۲۵۳"
            autoFocus
            {...register("mobile")}
          />

          <div className={styles.containerError}>
            {errors.mobile && (
              <p className={styles.error}>{errors.mobile.message}</p>
            )}
          </div>
          <button type="submit" className={styles.button}>
            ارسال کد تایید
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnterMobileForm;
