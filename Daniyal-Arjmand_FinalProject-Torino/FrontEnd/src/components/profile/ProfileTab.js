"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/lib/schema/validationSchemas";
import { updateUserProfile } from "@/lib/api/config";
import styles from "./ProfileForm.module.css";

function ProfileTab({ initialData }) {
  const [isPersonalEditing, setIsPersonalEditing] = useState(false);
  const [isBankEditing, setIsBankEditing] = useState(false);
  const [isContactEditing, setIsContactEditing] = useState(false);

  const {
    register,
    reset,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data) => {
    try {
      await updateUserProfile(data);
      alert("اطلاعات با موفقیت ذخیره شد.");
      setIsPersonalEditing(false);
      setIsBankEditing(false);
      setIsContactEditing(false);
      window.location.reload();
    } catch (error) {
      alert("خطا در ذخیره اطلاعات.");
      console.error(error);
    }
  };

  const handleSaveContact = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      onSubmit({ email: getValues("email") });
    }
  };

  const handleSavePersonal = async () => {
    const fields = [
      "firstName",
      "lastName",
      "nationalCode",
      "birthDate",
      "gender",
    ];
    const isValid = await trigger(fields);
    if (isValid) {
      onSubmit(getValues(fields));
    }
  };

  const handleSaveBank = async () => {
    const fields = ["shaba", "accountNumber", "cardNumber"];
    const isValid = await trigger(fields);
    if (isValid) {
      onSubmit(getValues(fields));
    }
  };

  console.log("خطاهای فرم:", errors);

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
                <input
                  {...register("email")}
                  placeholder="آدرس ایمیل"
                  className={styles.inlineInput}
                />
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
                <input {...register("firstName")} placeholder="نام" />
                <input {...register("lastName")} placeholder="نام خانوادگی" />
                <input {...register("nationalCode")} placeholder="کد ملی" />
                <input type="date" {...register("birthDate")} />
                <select {...register("gender")} className={styles.customGender}>
                  <option value="">جنسیت</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>
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
                    {`${initialData.firstName || ""} ${
                      initialData.lastName || ""
                    }`.trim() || <hr className={styles.empty} />}
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
                <input
                  {...register("shaba")}
                  placeholder="شماره شبا (بدون IR)"
                />
                <input
                  {...register("accountNumber")}
                  placeholder="شماره حساب"
                />
                <input {...register("cardNumber")} placeholder="شماره کارت" />
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
