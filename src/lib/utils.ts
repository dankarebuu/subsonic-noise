import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateISO(dateStr: string): Date {
  const [yearStr, monthStr, dayStr] = dateStr.split("-");
  return new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr), 0, 0, 0, 0);
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function formatTime12h(time24: string): string {
  const [hoursStr, minsStr] = time24.split(":");
  const hours = Number(hoursStr);
  const mins = Number(minsStr);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${String(mins).padStart(2, "0")} ${period}`;
}

export function formatCurrency(amount: number): string {
  return `$${amount}`;
}

export function formatDuration(mins: number): string {
  if (mins >= 60 && mins % 60 === 0) {
    return `${mins / 60} hr${mins / 60 > 1 ? "s" : ""}`;
  }
  return `${mins} min`;
}

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function getRelativeDayLabel(dateStr: string, now: Date = new Date()): string {
  const todayStr = formatDateISO(now);
  if (dateStr === todayStr) return "Today";

  const tomorrowStr = formatDateISO(addDays(now, 1));
  if (dateStr === tomorrowStr) return "Tomorrow";

  const parsed = parseDateISO(dateStr);
  const weekday = WEEKDAY_SHORT[parsed.getDay()];
  const month = MONTH_SHORT[parsed.getMonth()];
  return `${weekday}, ${month} ${parsed.getDate()}`;
}
