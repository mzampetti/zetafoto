import transformDate from "./transformDate";

export function getDate(date: string, locale: string) {
  if (date) return transformDate(date, locale);
}
