export function convertToSlug(label: string) {
  if (label)
    return label
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
}
