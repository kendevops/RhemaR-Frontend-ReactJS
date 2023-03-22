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

export default function CourseTimetable() {
  const [viewing, setViewing] = useState(0);

  const data = [];
  const events = []; //find the data that corresponds to the current month

  //use current user classes
  // const { isLoading, data: classesData } =

  // const DATA = classesData?.nodes;

  // console.log({ DATA });

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
      {/* {isLoading && <Spinner />} */}
      {/* Header */}
      <section className="d-flex border-bottom pb-3 justify-content-between">
        <article className="mb-3 d-flex gap-4">
          <div className="d-flex gap-3 align-items-center">
            <Calendar color={colors.primary} />
            <h6 className="text-lg font-bold text-blue-600">
              {`${months[viewing]} ${new Date().getFullYear()}`}
            </h6>
          </div>

          <div className="d-flex gap-3">
            <button
              className="btn-sm p-2 rounded-2 border-0"
              style={{
                backgroundColor: colors.primary,
              }}
              onClick={() => handleViewing("prev")}
            >
              <ChevronLeft color="white" />
            </button>
            <button
              className="btn-sm p-2 rounded-2 border-0"
              style={{
                backgroundColor: colors.primary,
              }}
              onClick={() => handleViewing("next")}
            >
              <ChevronRight color="white" />
            </button>
          </div>
        </article>
        {/* 
        <a
          className="d-flex w-25 gap-2 btn btn-blue-800 btn-lg"
          {...attributes}
        >
          Download <DownloadCloud />
        </a> */}
      </section>
    </>
  );
}
