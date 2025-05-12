export default function transformDate(dateStr: string, locale: string) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const day = date.getDate();
  if (locale === "it") return `${day} ${capitalizedMonth} ${year}`;
  else return `${capitalizedMonth} ${day} ${year}`;
}
