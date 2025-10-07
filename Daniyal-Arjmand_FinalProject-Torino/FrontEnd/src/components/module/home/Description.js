"use client";

import { useState } from "react";

import styles from "@/components/module/home/Description.module.css";

const sampleImages = [
  "/images/tour1.svg",
  "/images/tour2.svg",
  "/images/tour3.svg",
  "/images/tour4.svg",
];

function Description({ images = sampleImages }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <div className={styles.sliderContainer}>
          <div className={styles.imageWrapper}>
            {images.map((src, index) => {
              const stackPosition =
                (index - activeIndex + images.length) % images.length;

              let style = {};

              if (stackPosition < 4) {
                style = {
                  transform: `translateX(${stackPosition * -50}px) scale(${
                    1 - stackPosition * 0.1
                  })`,
                  opacity: 1,
                  zIndex: images.length - stackPosition,
                };
              } else {
                style = {
                  transform: "translateX(-60px) scale(0.7)",
                  opacity: 0,
                  zIndex: 0,
                };
              }

              return (
                <img
                  key={src}
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={styles.sliderImage}
                  style={style}
                />
              );
            })}
          </div>

          <div className={styles.navigation}>
            <button onClick={handlePrev}>
              <img
                src="/images/Line arrow-right.svg"
                className={styles.arrowBack}
              />
            </button>
            <span>
              {activeIndex + 1} / {images.length}
            </span>
            <button onClick={handleNext}>
              <img src="/images/Line arrow-right.svg" />
            </button>
          </div>
        </div>

        <div className={styles.textcontainer}>
          <div className={styles.textHeader}>
            <h2>
              چرا <span>تورینو</span> ؟
            </h2>
            <div>
              <span>؟</span>
            </div>
          </div>
          <h3>تور طبیعت گردی و تاریخی </h3>
          <p dir="rtl">
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
            تاریخی را خریداری کنید.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Description;
