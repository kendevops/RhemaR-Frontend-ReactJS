export default function trimText(maxChar: number, text: string) {
  const trimmedText =
    text.length > maxChar ? text.substring(0, maxChar) + "..." : text;
  return trimmedText;
}
