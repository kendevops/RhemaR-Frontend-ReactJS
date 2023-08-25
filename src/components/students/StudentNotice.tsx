import { MouseEventHandler } from "react";
import getMonth from "../../utils/getMonth";
import getTimeString from "../../utils/getTimeString";
import { MdCancel } from "react-icons/md";
import StudentNoticeModal from "../modals/NoticeModal";
import useToggle from "../../utility/hooks/useToggle";

interface EventProps {
  startDate: Date;
  endDate?: Date;
  title: string;
  onClick?: MouseEventHandler;
}

export default function StudentNotice({
  endDate,
  startDate,
  title,
  onClick,
}: EventProps) {
  const startTime = getTimeString({ date: startDate });
  const endTime = endDate && getTimeString({ date: endDate });
  const month = getMonth(startDate);

  const [visibility, toggle] = useToggle();

  return (
    <>
      <article
        aria-label="Event"
        className="d-flex p-4 rounded-3 align-items-center justify-content-between  gap-3 mt-4 cursor-pointer position-relative shadow"
        onClick={toggle}
        style={{
          borderColor: "#D5DFEC",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {/* Date */}
        <div className="d-flex align-items-center gap-4 ">
          <div
            className="bg-blue-200 py-3 me-4 rounded-2 text-center"
            style={{
              width: "8rem",
            }}
          >
            <div className="text-lg font-medium lh-1 mb-1">
              {startDate?.getDate()}{" "}
              {endDate?.getDate() === startDate.getDate()
                ? ""
                : endDate?.getDate()}
            </div>
            <div className="text-xxl font-bold lh-1">{month}</div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <time className="text-sm">
              {startTime} {endTime ? `-${endTime}` : ""}
            </time>
          </div>
        </div>

        <h3>For All Students</h3>
      </article>

      <StudentNoticeModal
        visibility={visibility}
        toggle={toggle}
        data={title}
      />
    </>
  );
}
