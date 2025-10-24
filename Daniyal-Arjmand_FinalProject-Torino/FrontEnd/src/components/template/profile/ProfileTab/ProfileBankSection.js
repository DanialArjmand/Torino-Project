"use client";

function ProfileBankSection({
  initialData,
  isBankEditing,
  setIsBankEditing,
  isSubmitting,
  errors,
  register,
  handleSaveBank,
  reset,
  styles,
}) {
  return (
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
              <div className={`${styles.inputWithError} ${styles.fieldShaba}`}>
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
              <div
                className={`${styles.inputWithError} ${styles.fieldAccountNumber}`}
              >
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
              <div
                className={`${styles.inputWithError} ${styles.fieldCardNumber}`}
              >
                <input {...register("cardNumber")} placeholder="شماره کارت" />
                <div className={styles.parentError}>
                  {errors.cardNumber && (
                    <p className={styles.error}>{errors.cardNumber.message}</p>
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
                  {initialData?.shaba ? (
                    `IR${initialData.shaba}`
                  ) : (
                    <hr className={styles.empty} />
                  )}
                </span>
                <span>
                  {initialData?.accountNumber || (
                    <hr className={styles.empty} />
                  )}
                </span>
              </div>
            </div>
            <div className={styles.informationBankCart}>
              <p>شماره کارت</p>
              <div className={styles.specificationsCart}>
                <span>
                  {initialData?.cardNumber || <hr className={styles.empty} />}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileBankSection;
