import en from "./en.json";
import it from "./it.json";

export default function translate(key: string, locale: string): string {
  const labels = locale === "it" ? it : en;
  const keys = key.split(".");
  try {
    const label = keys.reduce((acc: any, key: string) => acc[key], labels);
    if (typeof label === "string") {
      const rows = label.split("\n");
      const text = rows.reduce((t, r) => {
        if (t) {
          t = `${t}
        ${r}`;
        } else {
          t = `${r}`;
        }
        return t;
      }, "");
      return text;
    }
  } catch (error) {
    console.error("ERROR", error);
  }
  return key;
}
