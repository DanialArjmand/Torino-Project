import * as yup from "yup";

export const mobileSchema = yup.object().shape({
  mobile: yup
    .string()
    .required("وارد کردن شماره موبایل الزامی است")
    .matches(/^(09\d{9})$/, "فرمت شماره موبایل صحیح نیست (مثال: 09123456789)"),
});

export const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required("وارد کردن کد الزامی است")
    .length(6, "کد تایید باید ۶ رقم باشد")
    .matches(/^[0-9]+$/, "فقط می‌توانید عدد وارد کنید"),
});
