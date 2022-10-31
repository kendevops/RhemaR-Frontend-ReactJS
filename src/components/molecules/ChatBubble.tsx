import getTimeString from "../../utils/getTimeString";
import UserAvatar from "../atoms/UserAvatar";

type ChatBubbleProps = {
  isRecipient?: boolean;
  userName: string;
  time: Date;
  message: string;
};

export default function ChatBubble({
  isRecipient,
  message,
  time,
  userName,
}: ChatBubbleProps) {
  const gClass = "d-flex flex-column gap-3";
  return (
    <div className={`${gClass} ${isRecipient ? "align-items-end" : ""}`}>
      <div className="d-flex align-items-center gap-3">
        <UserAvatar />
        <p
          style={{
            fontSize: "16px",
          }}
        >
          {userName}
        </p>
      </div>
      <article
        className={`rounded-2 p-4 text-sm ${
          isRecipient ? "bg-blue-800 text-white " : "bg-blue-200 text-blue-500"
        }`}
        about="message"
        style={{
          maxWidth: "26.5rem",
        }}
      >
        {message}
      </article>
      <time>{getTimeString({ date: time })}</time>
    </div>
  );
}
