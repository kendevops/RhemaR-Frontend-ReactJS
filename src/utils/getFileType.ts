export default function getFileType(fileName: string) {
  let type = "photo";

  if (
    fileName.endsWith("png") ||
    fileName.endsWith("jpeg") ||
    fileName.endsWith("jpg")
  ) {
    type = "photo";
  }

  if (fileName.endsWith("mp4") || fileName.endsWith("mov")) {
    type = "video";
  }

  if (fileName.endsWith("pdf")) {
    type = "pdf";
  }

  return type;
}
