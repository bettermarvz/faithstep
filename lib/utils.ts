import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatThisDate = (thisDate: string) => {
  const date = new Date(thisDate);

  const formatted = date
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " at");
  return formatted;
};

export const today = () => {
  const today = new Date();
  return today.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};