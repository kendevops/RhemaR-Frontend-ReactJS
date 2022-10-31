import { MouseEventHandler } from "react";
import { Delete } from "react-feather";
import getTimeString from "../../utils/getTimeString";

type AnnouncementProps = {
  title: string;
  message: string;
  date: Date;
  onPress: MouseEventHandler;
  onPressDelete?: MouseEventHandler;
  isSelected?: boolean;
};

export default function Announcement({
  date,
  message,
  title,
  onPress,
  onPressDelete,
  isSelected,
}: AnnouncementProps) {
  return (
    <article
      className={`py-3 px-1 border-bottom ${
        isSelected ? "bg-blue-200" : "bg-white"
      }`}
    >
      {/* Header */}
      <div>
        <div className="d-flex justify-content-between gap-2">
          <h2
            style={{
              cursor: "pointer",
            }}
            onClick={onPress}
            className="text-xl font-bold text-blue-800 mb-2 hover"
          >
            {title}
          </h2>
          {onPressDelete && (
            <Delete
              style={{
                cursor: "pointer",
              }}
              onClick={onPressDelete}
            />
          )}
        </div>
        <p className="text-sm">
          {date.toDateString()} • {getTimeString({ date })}
        </p>
      </div>

      <p
        className="mt-3"
        style={{
          lineHeight: "2rem",
        }}
      >
        {message}
      </p>
    </article>
  );
}
