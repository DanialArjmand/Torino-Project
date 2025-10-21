"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/lib/schema/validationSchemas";
import { updateUserProfile } from "@/lib/api/config";
import { toast } from "react-hot-toast";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import styles from "./ProfileForm.module.css";
import "@/components/module/home/calender.css";

function ProfileTab({ initialData, onUpdate }) {
  const [isPersonalEditing, setIsPersonalEditing] = useState(false);
  const [isBankEditing, setIsBankEditing] = useState(false);
  const [isContactEditing, setIsContactEditing] = useState(false);

  const {
    register,
    reset,
    trigger,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await updateUserProfile(data);
      toast.success("اطلاعات با موفقیت ذخیره شد.");
      onUpdate(response.data);
      setIsPersonalEditing(false);
      setIsBankEditing(false);
      setIsContactEditing(false);
    } catch (error) {
      toast.error("خطا در ذخیره اطلاعات.");
    }
  };

  const handleSaveContact = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      onSubmit({ email: getValues("email") });
    }
  };

  const handleSavePersonal = async () => {
    const isValid = await trigger([
      "fullName",
      "nationalCode",
      "birthDate",
      "gender",
    ]);
    if (isValid) {
      const data = getValues();
      onSubmit(data);
    }
  };

  const handleSaveBank = async () => {
    const isValid = await trigger(["shaba", "accountNumber", "cardNumber"]);
    if (isValid) {
      const data = getValues();
      onSubmit(data);
    }
  };

  return (
    <>
      <div className={styles.mainItem}>
        <div className={styles.mainHeaderInformation}>
          <h2>اطلاعات حساب کاربری</h2>
        </div>
        <div className={styles.mainItemOne}>
          <div className={styles.mainChildOne}>
            <span>{initialData.mobile || "-"}</span>
            <p>شماره موبایل</p>
          </div>
          <div className={styles.contactField}>
            {isContactEditing ? (
              <div className={styles.editView}>
                <button
                  type="button"
                  disabled={isSubmitting}
                  className={styles.editAcceptButton}
                  onClick={handleSaveContact}
                >
                  تایید
                </button>
                <div className={styles.inputWithError}>
                  <input
                    {...register("email")}
                    placeholder="آدرس ایمیل"
                    className={styles.inlineInput}
                  />
                  <div className={styles.parentError}>
                    {errors.email && (
                      <p className={styles.error}>{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.displayView}>
                <button type="button" onClick={() => setIsContactEditing(true)}>
                  افزودن
                </button>
                <img
                  src="/images/edit.svg"
                  alt="edit-icon"
                  onClick={() => setIsContactEditing(true)}
                />
              </div>
            )}
            {!isContactEditing && (
              <div className={styles.email}>
                {initialData.email || <hr className={styles.empty} />}
                <p>ایمیل</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.mainItem}>
        <div className={styles.mainHeaderInformation}>
          <h2>اطلاعات شخصی</h2>
          <div className={styles.editInformationButton}>
            {!isPersonalEditing && (
              <>
                <button
                  type="button"
                  onClick={() => setIsPersonalEditing(true)}
                >
                  ویرایش اطلاعات
                </button>
                <img
                  src="/images/edit.svg"
                  alt="edit-icon"
                  onClick={() => setIsPersonalEditing(true)}
                />
              </>
            )}
          </div>
        </div>
        <div className={styles.mainInformation}>
          {isPersonalEditing ? (
            <div>
              <div className={styles.editingGrid}>
                <div className={styles.inputWithError}>
                  <input
                    {...register("fullName")}
                    placeholder="نام و نام خانوادگی"
                  />
                  <div className={styles.parentError}>
                    {errors.fullName && (
                      <p className={styles.error}>{errors.fullName.message}</p>
                    )}
                  </div>
                </div>
                <div className={styles.inputWithError}>
                  <input {...register("nationalCode")} placeholder="کد ملی" />
                  <div className={styles.parentError}>
                    {errors.nationalCode && (
                      <p className={styles.error}>
                        {errors.nationalCode.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.inputWithError}>
                  <Controller
                    control={control}
                    name="birthDate"
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={(dateObject) => {
                          field.onChange(
                            dateObject ? dateObject.toDate() : null
                          );
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
                <div className={styles.inputWithError}>
                  <select
                    {...register("gender")}
                    className={styles.customGender}
                  >
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
              </div>
              <hr className={styles.lineHr} />
              <div className={styles.buttons}>
                <button
                  type="button"
                  className={styles.buttonCancel}
                  onClick={() => {
                    setIsPersonalEditing(false);
                    reset(initialData);
                  }}
                >
                  انصراف
                </button>

                <button
                  type="button"
                  className={styles.buttonSave}
                  disabled={isSubmitting}
                  onClick={handleSavePersonal}
                >
                  {isSubmitting ? "در حال تایید..." : "تایید"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.informationCustom}>
                <div>
                  <p>نام و نام خانوادگی</p>
                  <p>جنسیت</p>
                </div>
                <div>
                  <span>
                    {initialData.fullName ||
                      `${initialData.firstName || ""} ${
                        initialData.lastName || ""
                      }`.trim() ||
                      "-"}
                  </span>
                  <span>
                    {initialData.gender === "male" ? (
                      "مرد"
                    ) : initialData.gender === "female" ? (
                      "زن"
                    ) : (
                      <hr className={styles.empty} />
                    )}
                  </span>
                </div>
              </div>
              <div className={styles.informationCustomBirth}>
                <div>
                  <p>کد ملی</p>
                  <p>تاریخ تولد</p>
                </div>
                <div>
                  <span>
                    {initialData.nationalCode || (
                      <hr className={styles.empty} />
                    )}
                  </span>
                  <span>
                    {initialData.birthDate ? (
                      new Date(initialData.birthDate).toLocaleDateString(
                        "fa-IR"
                      )
                    ) : (
                      <hr className={styles.empty} />
                    )}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.mainItem}>
        <div className={styles.mainHeaderInformation}>
          <h2>اطلاعات حساب بانکی</h2>
          <div className={styles.editInformationButton}>
            {!isBankEditing && (
              <>
                <button type="button" onClick={() => setIsBankEditing(true)}>
                  ویرایش اطلاعات
                </button>
                <img
                  src="/images/edit.svg"
                  alt="edit-icon"
                  onClick={() => setIsBankEditing(true)}
                />
              </>
            )}
          </div>
        </div>
        <div className={styles.mainInformation}>
          {isBankEditing ? (
            <div>
              <div className={styles.editingGrid}>
                <div className={styles.inputWithError}>
                  <input
                    {...register("shaba")}
                    placeholder="شماره شبا (بدون IR)"
                  />
                  <div className={styles.parentError}>
                    {errors.shaba && (
                      <p className={styles.error}>{errors.shaba.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    {...register("accountNumber")}
                    placeholder="شماره حساب"
                  />
                  <div className={styles.parentError}>
                    {errors.accountNumber && (
                      <p className={styles.error}>
                        {errors.accountNumber.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <input {...register("cardNumber")} placeholder="شماره کارت" />
                  <div className={styles.parentError}>
                    {errors.cardNumber && (
                      <p className={styles.error}>
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <hr className={styles.lineHr} />
              <div className={styles.buttonsBank}>
                <button
                  type="button"
                  className={styles.buttonCancel}
                  onClick={() => {
                    setIsBankEditing(false);
                    reset(initialData);
                  }}
                >
                  انصراف
                </button>

                <button
                  type="button"
                  className={styles.buttonSave}
                  disabled={isSubmitting}
                  onClick={handleSaveBank}
                >
                  {isSubmitting ? "در حال تایید..." : "تایید"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.informationBank}>
                <div>
                  <p>شماره شبا</p>
                  <p>شماره حساب</p>
                </div>
                <div className={styles.specifications}>
                  <span>
                    {initialData.shaba ? (
                      `IR${initialData.shaba}`
                    ) : (
                      <hr className={styles.empty} />
                    )}
                  </span>
                  <span>
                    {initialData.accountNumber || (
                      <hr className={styles.empty} />
                    )}
                  </span>
                </div>
              </div>
              <div className={styles.informationBankCart}>
                <p>شماره کارت</p>
                <span>
                  {initialData.cardNumber || <hr className={styles.empty} />}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileTab;
