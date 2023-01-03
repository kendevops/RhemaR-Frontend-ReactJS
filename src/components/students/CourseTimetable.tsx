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

export default function CourseTimetable() {
  const [viewing, setViewing] = useState(0);

  const data = [];
  const events = []; //find the data that corresponds to the current month

  //download
  const url =
    "https://images.unsplash.com/photo-1664574653790-cee0e10a4242?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";
  const attributes = downloadFile(url, "TimeTable");

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

        <a
          className="d-flex w-25 gap-2 btn btn-blue-800 btn-lg"
          {...attributes}
        >
          Download <DownloadCloud />
        </a>
      </section>

      {/* Timetable */}
      {/* <TimeTable
        events={{
          //tap from events in prod
          monday: [
            {
              id: 1,
              name: "Custom Event 1",
              type: "custom",
              startTime: new Date("2018-02-23T11:30:00"),
              endTime: new Date("2018-02-23T13:30:00"),
            },
          ],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
        }}
        style={{ height: "500px", width: "100%" }}
      /> */}
    </>
  );
}
