import * as yup from "yup";
import { toEnglishDigits } from "@/lib/formatters";

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

export const bookingSchema = yup.object().shape({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  nationalCode: yup
    .string()
    .transform(toEnglishDigits)
    .required("کد ملی الزامی است")
    .length(10, "کد ملی باید ۱۰ رقم باشد")
    .matches(/^[0-9]+$/, "کد ملی فقط می‌تواند شامل عدد باشد"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "لطفا جنسیت را انتخاب کنید")
    .required("انتخاب جنسیت الزامی است"),
  birthDate: yup
    .date()
    .required("تاریخ تولد الزامی است")
    .typeError("لطفا یک تاریخ معتبر انتخاب کنید"),
});

export const profileSchema = yup.object().shape({
  email: yup.string().email("ایمیل معتبر نیست"),
  name: yup
    .string()
    .max(40, "نام نمی‌تواند بیشتر از ۴۰ کاراکتر باشد")
    .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/, "نام فقط می‌تواند شامل حروف باشد"),
  nationalCode: yup
    .string()
    .length(10, "کد ملی باید ۱۰ رقم باشد")
    .matches(/^[0-9۰-۹]+$/, "کد ملی فقط می‌تواند شامل عدد باشد"),
  birthDate: yup.date().typeError("فرمت تاریخ صحیح نیست"),
  gender: yup.string().oneOf(["male", "female"], "لطفا جنسیت را انتخاب کنید"),
  shaba: yup
    .string()
    .optional()
    .length(24, "شماره شبا باید ۲۴ رقم باشد")
    .matches(/^[0-9۰-۹]+$/, "شماره شبا فقط می‌تواند شامل عدد باشد"),
  accountNumber: yup
    .string()
    .optional()
    .matches(/^[0-9۰-۹]+$/, "شماره حساب فقط می‌تواند شامل عدد باشد"),
  cardNumber: yup
    .string()
    .optional()
    .length(16, "شماره کارت باید ۱۶ رقم باشد")
    .matches(/^[0-9۰-۹]+$/, "شماره کارت فقط می‌تواند شامل عدد باشد"),
});
