export default function getFileFormat(file?: string) {
  if (!file) return "";
  const dotInd = file.lastIndexOf(".");
  const format = file.substring(dotInd + 1, file.length);
  return format;
}
