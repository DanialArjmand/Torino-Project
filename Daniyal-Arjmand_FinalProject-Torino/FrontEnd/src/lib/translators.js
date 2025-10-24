import { apiCityMap } from "@/data/apiCities";

export function translateCityById(cityId) {
  if (!cityId) return "";
  return apiCityMap[cityId] || `شهر با کد ${cityId}`;
}
