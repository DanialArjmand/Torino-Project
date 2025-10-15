export function formatToJalali(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
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
    result = result.replace(new RegExp(persianDigits[i], "g"), englishDigits[i]);
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
