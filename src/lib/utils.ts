import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const jsonParse = (string: string) => {
  try {
    return JSON.parse(string);
  } catch (e) {
    return null;
  }
};

/**
 * @description This function is used to cleanup array of coordinates, removes empty arrays inside arrays
 */
export const cleanupArray = (arr: any[]): any[] => {
  return arr
    .map((item) => (Array.isArray(item) ? cleanupArray(item) : item))
    .filter((item) => !(Array.isArray(item) && item.length === 0));
};

export const formatNumber = (number: number, precision = 2) => {
  return Intl.NumberFormat("cs", {
    notation: "standard",
    style: "decimal",
    unit: "meter",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(number);
};
