import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "react-feather";
import { Spinner } from "reactstrap";
import colors from "../../assets/img/Colors";
import { WeekendClasses } from "../../data/Classes";
import useClasses from "../../hooks/queries/classes/useClasses";
import { months } from "../../utils/getMonth";
import Tab from "../atoms/Tab";
import UpcomingEvent from "../molecules/UpcomingEvent";
import { Link, useHistory } from "react-router-dom";
import isWithinCurrentDateRange from "../../utils/isWithinDateRange";
import { FaCalendarAlt } from "react-icons/fa";
import BButton from "../general/button";
import useUserClasses from "../../hooks/queries/users/useUserClasses";

export default function CourseSchedule({ title }: any) {
  const [viewing, setViewing] = useState(0);
  const [clas, setClas] = useState(0);

  const history = useHistory();

  let classTabs = ["Online"];

  const currentClass = classTabs[clas];

  const monthParam = viewing + 1 < 10 ? `0${viewing + 1}` : viewing + 1;

  // const { data, isLoading } = useClasses({
  //   onlineStartDateTime: `${new Date().getFullYear()}-${monthParam}-01T21:56:53.900Z`,
  // });

  // const { data, isLoading: classesLoading } = useUserClasses({});

  const { data, isLoading } = useClasses({});

  const allClasses = data?.classes?.nodes;
  let classes = allClasses?.filter(
    (cl: any) => cl.onlineStatus !== "ONGOING" && cl.onlineStatus !== "ENDED"
  );

  console.log(classes);

  // if (classes && classes[0]?.campus?.name === "Abuja") {
  //   classTabs = ["Weekend Classes", "Night Classes"];
  // }

  // if (currentClass === "Weekend Classes") {
  //   classes = allClasses?.filter((clas: any) => clas?.type === "weekend");
  // }

  // if (currentClass === "Night Classes") {
  //   classes = allClasses?.filter((clas: any) => clas?.type === "night");
  // }

  // For navigating between dates
  function handleViewing(direction: "prev" | "next") {
    const isPrev = direction === "prev";
    setViewing((p) => {
      if (p <= 11) {
        return p + (isPrev ? -1 : 1);
      } else return 0;
    });
  }

  /* TODO -  Upcoming 5 classes instead of per month
   * Caret Buttons become "View All" to view all courses
   */

  return (
    <>
      {/* {isLoading && <Spinner />} */}
      {/* Header */}
      <section className="mb-3 d-flex justify-content-between">
        {/* <div className="d-flex gap-3 align-items-center">
          <Calendar color={colors.primary} />
          <h6 className="text-lg font-bold text-blue-600">
            {`${months[viewing]} ${new Date().getFullYear()}`}
          </h6>
        </div> */}

        {/* <div className="d-flex gap-3">
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
        </div> */}
      </section>

      {/* Classes */}
      <section className="">
        <div className="d-flex gap-3 align-center ">
          <FaCalendarAlt />
          <p className="r-card-title">{title}</p>
        </div>
        <hr />
        {/* Tabs */}
        <Tab.Wrapper className="d-flex justify-content-between ">
          {classTabs?.map((t, i) => {
            return (
              <Tab
                key={t}
                tabColor="#203864"
                isSelected={currentClass === t}
                onClick={() => {
                  setClas(i);
                }}
              >
                {t}
              </Tab>
            );
          })}
        </Tab.Wrapper>

        {/* Class List */}
        <div>
          {classes ? (
            classes
              ?.filter?.((c: any, inx: number) => inx <= 4)
              .map((clas: any, i: number) => {
                return (
                  <>
                    {isWithinCurrentDateRange(
                      clas?.onlineStartDateTime,
                      clas?.onlineEndDateTime
                    ) ? (
                      <Link key={i} to={`/student/lecture/${clas?.id}`}>
                        <UpcomingEvent
                          title={clas?.name}
                          endDate={new Date(clas?.onlineEndDateTime)}
                          startDate={new Date(clas?.onlineStartDateTime)}
                        />
                      </Link>
                    ) : (
                      <Link key={i} to={`/student/lecture/${clas?.id}`}>
                        <UpcomingEvent
                          title={clas?.name}
                          endDate={new Date(clas?.onlineEndDateTime)}
                          startDate={new Date(clas?.onlineStartDateTime)}
                        />
                      </Link>
                    )}
                  </>
                );
              })
          ) : (
            <p>No Classes yet...</p>
          )}

          {classes?.length > 4 && (
            <BButton text={"View All Schedule"} onClick={() => {}} />
          )}
        </div>
      </section>
    </>
  );
}
