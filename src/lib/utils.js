export function formatDate(str, locale) {
  const fmt = "DD/MM/YYYY";
  return dayjs(str).locale(locale).format(fmt);
}
