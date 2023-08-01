import { useEffect, useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  DownloadCloud,
} from "react-feather";
// import TimeTable from "react-timetable-events";
import colors from "../../assets/img/Colors";
import downloadFile from "../../utils/downloadFile";
import { months } from "../../utils/getMonth";
import useAllClasses from "../../hooks/queries/classes/useAllClasses";
import { Spinner } from "reactstrap";
import useClasses from "../../hooks/queries/classes/useClasses";
import UpcomingEvent from "../molecules/UpcomingEvent";

export default function CourseTimetable() {
  const [viewing, setViewing] = useState(0);

  const data = [];
  const events = []; //find the data that corresponds to the current month

  //use current user classes
  const { isLoading, data: classesData } = useClasses();

  const DATA = classesData?.classes?.nodes;

  // For navigating between dates
  function handleViewing(direction: "prev" | "next") {
    const isPrev = direction === "prev";
    setViewing((p) => {
      if (p <= 11) {
        return p + (isPrev ? -1 : 1);
      } else return 0;
    });
  }

  return (
    <>
      {isLoading && <Spinner />}
      {/* Header */}
      <section className="d-flex border-bottom pb-3 justify-content-between">
        <h1>Classes</h1>
        {/* 
        <a
          className="d-flex w-25 gap-2 btn btn-blue-800 btn-lg"
          {...attributes}
        >
          Download <DownloadCloud />
        </a> */}
      </section>

      {/* Classes */}
      <section>
        {DATA && (
          <div>
            {DATA?.map((clas: any, i: number) => {
              return (
                <UpcomingEvent
                  title={clas?.name}
                  key={i}
                  endDate={new Date(clas?.endTime)}
                  startDate={new Date(clas?.startTime)}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
