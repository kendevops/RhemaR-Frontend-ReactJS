import React, { useEffect, useState } from "react";
import EventsCards from "../../molecules/EventsCards";
import useAllEvents from "../../../hooks/queries/events/useAllEvents";
import useCurrentUser from "../../../hooks/queries/users/useCurrentUser";

interface IList {
  id: string;
  header: string;
}

interface Props {
  ListData: IList[];
  onSelect?: (selected: string) => void;
}

const EventsList = ({ ListData, onSelect }: Props) => {
  const { data, refetch } = useCurrentUser();
  const [active, setActive] = useState("1");
  const [tab, setTab] = useState(ListData[0]?.header);

  const handleClick = (id: any, header: string) => {
    setActive(id);
    setTab(header);
    onSelect && onSelect(ListData?.find((v) => v?.id === id)?.header ?? "None");
  };

  // const role = data?.roles?.map((e: any) => e.name.includes("ICT_ADMIN"));

  const role = data?.roles[0]?.name;

  // automatically select the firtst category on render
  useEffect(() => {
    if (!ListData) return;

    if (active === "1") {
      setActive(ListData[0]?.id);
    }
  }, [ListData, active]);

  return (
    <>
      <ul className="nav nav-pills mb-3 px-4" id="pills-tab" role="tablist">
        {ListData.map(({ id, header }) => (
          <li key={id} className="nav-item" role="presentation">
            <button
              onClick={() => handleClick(id, header)}
              className={`nav-link text-capitalize fw-normal ${
                active === id ? "active" : ""
              }`}
              id="pills-UpcomingEvents-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-UpcomingEvents"
              type="button"
              role="tab"
              aria-controls="pills-UpcomingEvents"
              aria-selected={active === id ? "true" : "false"}
            >
              {header}
            </button>
          </li>
        ))}
      </ul>
      <div className="container my-5">
        {/* <EventsCards Eventsdata={Eventsdata} /> */}
        {tab === "upcoming events" && (
          <EventsCards
            tab="upcoming events"
            isStudent={role === "STUDENT" ? true : false}
          />
        )}
        {tab === "past events" && (
          <EventsCards
            tab="past events"
            isStudent={role === "STUDENT" ? true : false}
          />
        )}
      </div>
    </>
  );
};

export default EventsList;
