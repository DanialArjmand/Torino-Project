"use client";

import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpSchema } from "@/lib/schema/validationSchemas";
import styles from "./EnterOtpForm.module.css";

function EnterOtpForm({
  mobileNumber,
  onOtpSubmit,
  onBack,
  isLoading,
  feedback,
  onResendCode,
}) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const [timer, setTimer] = useState(120);

  const onSubmit = (data) => {
    onOtpSubmit(data.otp);
  };

  useEffect(() => {
    if (timer <= 0) return;

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleResendCode = () => {
    if (onResendCode) {
      onResendCode();
    }
    setTimer(120);
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.backgroundBlur}>
      <div className={styles.container} onClick={handleModalContentClick}>
        <div className={styles.header}>
          <button onClick={onBack} className={styles.backButton}>
            <img src="/images/Line arrow-left.svg" alt="Back" />
          </button>
        </div>
        <h2 className={styles.title}>.کد تایید را وارد کنید</h2>
        <p>
          کد تایید به شماره <span>{mobileNumber}</span> ارسال شد
        </p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <OtpInput
                {...field}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                containerStyle={styles.otpContainer}
                inputStyle={styles.otpInput}
              />
            )}
          />
          <div className={styles.containerError}>
            {errors.otp ? (
              <p className={styles.error}>{errors.otp.message}</p>
            ) : (
              feedback &&
              feedback.message && (
                <p
                  className={
                    feedback.type === "success" ? styles.success : styles.error
                  }
                >
                  {feedback.message}
                </p>
              )
            )}
          </div>
          <div className={styles.resendContainer}>
            {timer > 0 ? (
              <p className={styles.textTimer}>
                <span className={styles.timer}>{formatTime(timer)}</span>
                <span>تا ارسال مجدد کد</span>
              </p>
            ) : (
              <p>
                <button
                  type="button"
                  onClick={handleResendCode}
                  className={styles.resendButton}
                  disabled={isLoading}
                >
                  ارسال مجدد کد
                </button>
                کد را دریافت نکردید؟
              </p>
            )}
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "در حال بررسی..." : "ورود به تورینو"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnterOtpForm;
