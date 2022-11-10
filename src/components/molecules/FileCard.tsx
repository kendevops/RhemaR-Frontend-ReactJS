import React, { CSSProperties } from "react";
import { Download } from "react-feather";
import downloadFile from "../../utils/downloadFile";
import { AudioIcon, PdfIcon, VideoIcon } from "../icons/FIleCard";

export type FileCardProps = {
  type: "video" | "audio" | "pdf";
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
    case "audio":
      backgroundColor = "#F7EDFA";
      icon = AudioIcon;
      break;

    case "video":
      backgroundColor = "#EDFAF0";
      icon = VideoIcon;
      break;
  }

  return (
    <article className="border-1 rounded-3 overflow-hidden">
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
      ;
    </article>
  );
}
