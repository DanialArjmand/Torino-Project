"use client";

import styles from "@/components/profile/ProfileForm.module.css";

function ProfileForm({ initialData }) {
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div>
    //     <label>نام</label>
    //     <input {...register("firstName")} />
    //     {errors.firstName && <p>{errors.firstName.message}</p>}
    //   </div>
    //   <div>
    //     <label>نام خانوادگی</label>
    //     <input {...register("lastName")} />
    //     {errors.lastName && <p>{errors.lastName.message}</p>}
    //   </div>
    //   <div>
    //     <label>ایمیل</label>
    //     <input type="email" {...register("email")} />
    //     {errors.email && <p>{errors.email.message}</p>}
    //   </div>
    //   <button type="submit" disabled={isSubmitting}>
    //     {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
    //   </button>
    // </form>
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerItem}>
            <p>پروفایل</p>
            <img src="/images/frame-black.svg" alt="user-icon" />
          </div>
          <hr className={styles.hrLine} />
          <div className={styles.headerItem}>
            <p>تور های من</p>
            <img src="/images/sun-fog.svg" alt="sun-icon" />
          </div>
          <hr className={styles.hrLine} />
          <div className={styles.headerItem}>
            <p>تراکنش ها</p>
            <img src="/images/convert-card.svg" alt="convert-icon" />
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.mainItem}>
            <h2>اطلاعات حساب کاربری</h2>
            <div className={styles.mainItemOne}>
              <div className={styles.mainChildOne}>
                <span>09123456789</span>
                <p>شماره موبایل</p>
              </div>
              <div className={styles.mainChildTwo}>
                <span>-</span>
                <p>ایمیل</p>
              </div>
              <div className={styles.mainChildThree}>
                <button>افزودن</button>
                <img src="/images/edit.svg" alt="edit-icon" />
              </div>
            </div>
          </div>

          <div className={styles.mainItem}>
            <div className={styles.mainHeaderInformation}>
              <h2>اطلاعات شخصی</h2>
              <div className={styles.editInformationButton}>
                <button>ویرایش اطلاعات</button>
                <img src="/images/edit.svg" alt="edit-icon" />
              </div>
            </div>

            <div className={styles.mainInformation}>
              <div className={styles.informationCustom}>
                <div>
                  <p>نام و نام خانوادگی</p>
                  <p>جنسیت</p>
                </div>
                <div>
                  <span>مانیا رحیمی</span>
                  <span>زن</span>
                </div>
              </div>

              <div className={styles.informationCustomBirth}>
                <div>
                  <p>کد ملی</p>
                  <p>تاریخ تولد</p>
                </div>
                <div>
                  <span>3721156232</span>
                  <span>1383/10/17</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mainItem}>
            <div className={styles.mainHeaderInformation}>
              <h2>اطلاعات حساب بانکی</h2>
              <div className={styles.editInformationButton}>
                <button>ویرایش اطلاعات</button>
                <img src="/images/edit.svg" alt="edit-icon" />
              </div>
            </div>

            <div className={styles.mainInformation}>
              <div className={styles.informationBank}>
                <div>
                  <p>شماره شبا</p>
                  <p>شماره حساب</p>
                </div>
                <div>
                  <span>IR123456789012345678901234</span>
                  <span>123456789012345678901234</span>
                </div>
              </div>

              <div className={styles.informationBankCart}>
                <p>شماره کارت</p>
                <span>6037991752468520</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfileForm;
