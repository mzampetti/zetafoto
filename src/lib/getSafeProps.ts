export default function getSafeProp(obj: object, key: string) {
  return obj?.[key] || null;
}
