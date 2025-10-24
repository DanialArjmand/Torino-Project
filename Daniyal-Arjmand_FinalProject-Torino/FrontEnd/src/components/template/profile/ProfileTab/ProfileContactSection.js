"use client";

function ProfileContactSection({
  initialData,
  isContactEditing,
  setIsContactEditing,
  isSubmitting,
  register,
  errors,
  handleSaveContact,
  styles,
}) {
  return (
    <div className={styles.mainItem}>
      <div className={styles.mainHeaderInformation}>
        <h2>اطلاعات حساب کاربری</h2>
      </div>
      <div className={styles.mainItemOne}>
        <div className={styles.mainChildOne}>
          <span>{initialData?.mobile || <hr className={styles.empty} />}</span>
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
                {initialData?.email ? "ویرایش" : "افزودن"}
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
              {initialData?.email || <hr className={styles.empty} />}
              <p>ایمیل</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileContactSection;
