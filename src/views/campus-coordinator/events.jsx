import EventsList from "../../components/lists/events-list/index";

const Listdata = [
  {
    id: "1",
    header: "Upcoming Events",
  },
  {
    id: "2",
    header: "Past Events",
  },
  {
    id: "3",
    header: "Current Events",
  },
];

const CampusCoordinatorEvents = () => {
  return (
    <>
      <div className="container my-5">
        <app-banner-with-pattern
          title="Events"
          img="upcoming-event.svg"
        ></app-banner-with-pattern>
        <div className="bg-white r-card p-4">
          <p className="r-card-title d-flex justify-content-between align-items-center mb-4">
            <span className="d-flex justify-content-between align-items-center">
              <span className="me-2">
                <span
                  className="iconify"
                  data-icon="bx:bxs-calendar-alt"
                ></span>
              </span>
              January 2022
            </span>
            <span className="d-flex justify-content-between align-items-center">
              <span className="bg-blue-800 rounded-2 text-sm py-2 px-3 text-white click me-3">
                <span className="iconify" data-icon="fa:angle-left"></span>
              </span>
              <span className="bg-blue-800 rounded-2 text-sm py-2 px-3 text-white click">
                <span className="iconify" data-icon="fa:angle-right"></span>
              </span>
            </span>
          </p>

          <div className="p-3">
            <EventsList ListData={Listdata} />
          </div>

          <div className="py-4 px-5">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                <app-event-card link="/student-services-admin/live-event/live-event/1"></app-event-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampusCoordinatorEvents;
