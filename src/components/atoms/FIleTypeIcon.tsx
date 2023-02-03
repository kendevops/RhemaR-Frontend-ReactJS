import PdfIcon from "../icons/Pdf";

type FileTypeIconProps = {
  type: string;
  path?: string;
  name?: string;
};

export default function FileTypeIcon({ type, name, path }: FileTypeIconProps) {
  let icon = <></>;

  switch (type) {
    case "png":
      icon = (
        <img
          alt={name}
          src={path}
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      );
      break;
    case "image/png":
      icon = (
        <img
          alt={name}
          src={path}
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      );
      break;
    case "image/jpeg":
      icon = (
        <img
          alt={name}
          src={path}
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      );
      break;
    case "jpg":
      icon = (
        <img
          alt={name}
          src={path}
          style={{
            width: "20px",
            height: "20px",
          }}
        />
      );
      break;
    default:
      icon = <PdfIcon />;
  }

  return icon;
}
