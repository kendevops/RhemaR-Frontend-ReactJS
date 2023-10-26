import { useRef } from "react";
import CardHeader from "../../components/atoms/CardHeader";
import EventsIcon from "../../assets/img/eventsIcon.svg";
import useToggle from "../../utility/hooks/useToggle";
import EventsList from "../../components/lists/events-list";
import {
  HiCalendar,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import EventsCards from "../../components/molecules/EventsCards";
import AddEvent from "../../components/modals/AddEvent";

const Listdata = [
  {
    id: "1",
    header: "upcoming events",
  },
  {
    id: "2",
    header: "past events",
  },
];

export default function StudentEvents() {
  const [visibility, toggle] = useToggle();
  const dateRef = useRef(new Date());

  const month = dateRef.current.toLocaleString("default", { month: "long" });
  const year = dateRef.current.getFullYear();
  const formattedDate = `${month} ${year}`;

  return (
    <>
      <CardHeader heading="events" imgSrc={EventsIcon} />

      <section className="">
        {/* card body */}
        <div className="card my-4 p-4 events-wrapper">
          {/* nav - date */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex justify-content-center align-items-center current-date">
              <HiCalendar size={24} />
              <p className="fw-bold mt-4 formatted-date">{formattedDate}</p>
            </div>

            <div className="header-nav d-flex">
              <button className="btn btn-blue-800 evt-btn">
                <HiOutlineChevronLeft size={24} />
              </button>
              <button className="btn btn-blue-800 evt-btn">
                <HiOutlineChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* body */}
          <div className="">
            <EventsList ListData={Listdata} />

            {/* <div className="container my-5">
              <EventsCards isStudent />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
