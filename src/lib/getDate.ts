import translate from "@/labels";
import transformDate from "./transformDate";

export function getDate(
  dateStartEvent: string,
  dateEndEvent: string | null,
  locale: string
) {
  if (dateEndEvent)
    return (
      translate("from", locale) +
      " " +
      transformDate(dateStartEvent, locale) +
      " " +
      translate("to", locale) +
      " " +
      transformDate(dateEndEvent, locale)
    );
  else return transformDate(dateStartEvent, locale);
}
