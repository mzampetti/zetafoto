export const getPhotoAltText = (
  title: string | undefined | null,
  location: { name: string } | undefined | null,
  city: { name: string } | undefined | null
) => {
  return `${title || ""} ${
    location && location.name !== title ? location.name : ""
  } ${city ? city.name : ""}`.trim();
};
