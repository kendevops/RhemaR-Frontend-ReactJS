import React, { CSSProperties } from "react";
import { Download } from "react-feather";
import downloadFile from "../../utils/downloadFile";
import { AudioIcon, PdfIcon, VideoIcon } from "../icons/FIleCard";
import { Icon } from "@iconify/react";

export type FileCardProps = {
  type: "video" | "audio" | "pdf" | "photo";
  title: string;
  url: string;
};

export default function FileCard({ type, title, url }: FileCardProps) {
  const attributes = downloadFile(url, title);

  let backgroundColor = "#FFEDED";
  let icon = PdfIcon;

  const styles: CSSProperties = {
    padding: "2rem",
    width: "100%",
    marginBottom: "1rem",
    justifyContent: "center",
  };

  switch (type) {
    case "photo":
      backgroundColor = "#E8E8E8";
      icon = <Icon fontSize={24} icon={"ic:outline-image"} color="blue" />;
      break;
    case "audio":
      backgroundColor = "#F7EDFA";
      icon = AudioIcon;
      break;

    case "video":
      backgroundColor = "#EDFAF0";
      icon = VideoIcon;
      break;

    case "pdf":
      backgroundColor = "#EDFAF0";
      icon = PdfIcon;
      break;
  }

  return (
    <article className="border-1 rounded-3 overflow-hidden mb-3">
      <div style={{ backgroundColor, ...styles }}>{icon}</div>
      <p className="mb-3">{title}</p>
      <a
        className="d-flex w-100 gap-3 p-3 justify-content-center text-white bg-blue-800"
        style={{
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
        }}
        {...attributes}
      >
        Download
        <Download color="#fff" />
      </a>
    </article>
  );
}
