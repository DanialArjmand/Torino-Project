"use client";

import styles from "@/components/module/home/Filter.module.css";

export default function FilterDropdowns({
  isOpen,
  value,
  cities,
  highlightedIndex,
  onSelect,
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.dropdown}>
      <h4 className={styles.dropdownHeader}>
        {value.trim() ? "نتایج جستجو" : "پرتردد"}
      </h4>
      <ul dir="rtl">
        {cities.map((city, index) => (
          <li
            key={city.id}
            className={index === highlightedIndex ? styles.highlighted : ""}
            onMouseDown={() => onSelect(city)}
          >
            <img
              src="/images/location.svg"
              alt="location icon"
              className={styles.locationIcon}
            />
            <span>{city.name}</span>
          </li>
        ))}
        {cities.length === 0 && value.trim() && (
          <li className={styles.noResult}>نتیجه‌ای یافت نشد</li>
        )}
      </ul>
    </div>
  );
}
