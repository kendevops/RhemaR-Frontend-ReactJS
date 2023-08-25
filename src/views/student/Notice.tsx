import { useEffect, useState } from "react";
// import TimeTable from "react-timetable-events";
import { Spinner } from "reactstrap";
import useClasses from "../../hooks/queries/classes/useClasses";
import StudentNotice from "../../components/students/StudentNotice";
import { Icon } from "@iconify/react";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export default function Notices() {
  // const [viewing, setViewing] = useState(0);

  //find the data that corresponds to the current month

  //use current user classes
  const { isLoading, data: classesData } = useClasses();
  const { data: userData, isLoading: userLoading } = useCurrentUser();

  const DATA = classesData?.classes?.nodes;

  // For navigating between dates
  // function handleViewing(direction: "prev" | "next") {
  //   const isPrev = direction === "prev";
  //   setViewing((p) => {
  //     if (p <= 11) {
  //       return p + (isPrev ? -1 : 1);
  //     } else return 0;
  //   });
  // }

  return (
    <>
      <div className="container my-5">
        <div
          className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
          style={{ color: "white", fontWeight: 700 }}
        >
          <Icon
            icon="mdi:note-text"
            style={{ width: "20px", height: "20px" }}
          />
          <div>2023/2024 Notices</div>

          <div
            className=" bg-white "
            style={{ width: "2px", height: "20px" }}
          ></div>
          <div>{`${userData?.campus?.name}`}</div>
        </div>
        {isLoading && <Spinner />}
        <section>
          {DATA && (
            <div>
              {DATA?.map((clas: any, i: number) => {
                return (
                  <div key={i}>
                    <StudentNotice
                      title={clas?.name}
                      key={i}
                      endDate={new Date(clas?.endTime)}
                      startDate={new Date(clas?.startTime)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div className="d-flex align-items-center justify-content-between my-5 text-4xl">
          <h2>page 1 0f 12</h2>
          <div className="d-flex align-items-center gap-5">
            <h2>
              <AiOutlineDoubleLeft className="" /> Previous
            </h2>
            <h2>
              Next <AiOutlineDoubleRight />
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
