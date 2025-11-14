export function formatToJalali(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);

  const weekday = new Intl.DateTimeFormat("fa-IR", { weekday: "long" }).format(
    date
  );
  const day = new Intl.DateTimeFormat("fa-IR", { day: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(
    date
  );
  const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(
    date
  );

  return `${weekday}، ${day} ${month} ${year}`;
}

export function translateCity(cityName) {
  if (!cityName) return "";
  const lowerCaseCity = cityName.toLowerCase();
  return cityTranslations[lowerCaseCity] || cityName;
}

export function translateVehicle(vehicle) {
  const vehicleTranslations = {
    suv: "شاسی بلند",
    train: "قطار",
    ship: "کشتی",
    bus: "اتوبوس",
    airplane: "هواپیما",
  };
  const lowerCaseVehicle = vehicle ? vehicle.toLowerCase() : "";
  return vehicleTranslations[lowerCaseVehicle] || vehicle;
}

const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const englishDigits = "0123456789";

export function toEnglishDigits(str) {
  if (!str) return str;
  let result = String(str);
  for (let i = 0; i < 10; i++) {
    result = result.replace(
      new RegExp(persianDigits[i], "g"),
      englishDigits[i]
    );
  }
  return result;
}

export function calculateTourDuration(startDate, endDate) {
  if (!startDate || !endDate) {
    return { days: 0, nights: 0 };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end.getTime() - start.getTime();
  const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));
  const days = nights + 1;

  return { days, nights };
}

export function formatToPersianNumber(number) {
  if (number === undefined || number === null) return "";
  return new Intl.NumberFormat("fa-IR").format(number);
}

export function formatToJalaliDateTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Intl.DateTimeFormat("fa-IR", options).format(date);
}

export function formatToShortJalaliDateTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formatted = new Intl.DateTimeFormat("fa-IR-u-nu-latn", options).format(
    date
  );

  return formatted.replace(",", " -");
}
