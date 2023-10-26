import { useEffect, useState } from "react";
// import TimeTable from "react-timetable-events";
import { Spinner } from "reactstrap";
import useClasses from "../../hooks/queries/classes/useClasses";
import StudentNotice from "../../components/students/StudentNotice";
import { Icon } from "@iconify/react";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import useNotifications from "../../hooks/queries/notifications/useNotifications";
import { announcement } from "../ict-admin/MessageBoard";

export default function Notices() {
  // const [viewing, setViewing] = useState(0);

  //find the data that corresponds to the current month

  //use current user classes
  const { isLoading, data: classesData } = useClasses();
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const { data: notificationsData, isLoading: notifcationsLoading } =
    useNotifications();

  const notifications = notificationsData?.nodes as announcement[];

  const DATA = classesData?.classes?.nodes;

  console.log(notifications);

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
          <div>{userData?.currentSession?.name} Notices</div>

          <div
            className=" bg-white "
            style={{ width: "2px", height: "20px" }}
          ></div>
          <div>{`${userData?.currentCampus?.name}`}</div>
        </div>
        {isLoading && <Spinner />}
        <section>
          {DATA && (
            <div>
              {notifications?.map((clas: any, i: number) => {
                console.log(clas);

                return (
                  <div key={i}>
                    <StudentNotice
                      data={clas}
                      key={i}
                      endDate={new Date(clas?.createdAt)}
                      startDate={new Date(clas?.createdAt)}
                      id={clas?.id}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <div className="d-flex align-items-center justify-content-between my-5 text-4xl">
          {/* <h2>page 1 0f 12</h2> */}
          <div className="d-flex align-items-center gap-5">
            <h2 style={{ cursor: "pointer" }}>
              <AiOutlineDoubleLeft /> Previous
            </h2>
            <h2 style={{ cursor: "pointer" }}>
              Next <AiOutlineDoubleRight />
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
