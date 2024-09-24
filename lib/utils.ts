import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dotenv from "dotenv";
dotenv.config()
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAbsoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}