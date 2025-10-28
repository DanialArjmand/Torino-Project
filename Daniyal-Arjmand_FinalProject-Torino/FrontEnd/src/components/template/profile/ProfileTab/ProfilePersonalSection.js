"use client";

import { Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function ProfilePersonalSection({
  initialData,
  isPersonalEditing,
  setIsPersonalEditing,
  isSubmitting,
  control,
  errors,
  register,
  handleSavePersonal,
  reset,
  styles,
}) {
  return (
    <div className={styles.mainItem}>
      <div className={styles.mainHeaderInformation}>
        <h2>اطلاعات شخصی</h2>
        <div className={styles.editInformationButton}>
          {!isPersonalEditing && (
            <>
              <button type="button" onClick={() => setIsPersonalEditing(true)}>
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
              <div
                className={`${styles.inputWithError} ${styles.fieldFullName}`}
              >
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
              <div
                className={`${styles.inputWithError} ${styles.fieldNationalCode}`}
              >
                <input {...register("nationalCode")} placeholder="کد ملی" />
                <div className={styles.parentError}>
                  {errors.nationalCode && (
                    <p className={styles.error}>
                      {errors.nationalCode.message}
                    </p>
                  )}
                </div>
              </div>
              <div
                className={`${styles.inputWithError} ${styles.fieldBirthDate}`}
              >
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
              <div className={`${styles.inputWithError} ${styles.fieldGender}`}>
                <select
                  id="gender"
                  className={styles.customGender}
                  {...register("gender", {
                    required: "انتخاب جنسیت الزامی است",
                  })}
                  defaultValue=""
                >
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>
                <label htmlFor="gender" className={styles.floatingLabel}>
                  جنسیت
                </label>
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
                  {initialData?.fullName ||
                    `${initialData?.firstName || ""} ${
                      initialData?.lastName || ""
                    }`.trim() || <hr className={styles.empty} />}
                </span>
                <span>
                  {initialData?.gender === "male" ? (
                    "مرد"
                  ) : initialData?.gender === "female" ? (
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
                  {initialData?.nationalCode || <hr className={styles.empty} />}
                </span>
                <span>
                  {initialData?.birthDate ? (
                    new Date(initialData.birthDate).toLocaleDateString("fa-IR")
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
  );
}

export default ProfilePersonalSection;
