import {
  HiOutlineCalendar,
  HiOutlineChevronRight,
  HiClock,
} from "react-icons/hi";
import { RxDotFilled } from "react-icons/rx";
import useAllEvents from "../../hooks/queries/events/useAllEvents";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import useUpdateEvent from "../../hooks/queries/events/useUpdateEvent";
import AddEvent from "../modals/AddEvent";
import { ConfirmDeleteModal } from "../modals/ConfirmDeleteModal";
import { FaEdit } from "react-icons/fa";
import useDeleteEvent from "../../hooks/queries/events/useDeleteEvent";
import useToggle from "../../utility/hooks/useToggle";
import ToastContent from "./ToastContent";
import { toast } from "react-toastify";
import handleError from "../../utils/handleError";

interface IEvents {
  id: string;
  status?: string;
  name?: string;
  endTime?: any;
  startTime?: any;
  data?: any;
  refetch: any;

  // desc?: string;
  // video?: string;
  // resources?: string;
}

interface EventCardsProps {
  isStudent?: boolean;
  tab?: string;
}

type DeleteEventprops = {
  id: string;
  refetch: any;
  data?: any;
};

function DeleteEvent({ id, refetch, data }: DeleteEventprops) {
  const [isEditing, toggleEditing] = useToggle();
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();

  // const id = data?.id;

  const deleteIt = useDeleteEvent(id);

  const isDeleteLoading = deleteIt?.isLoading;

  const handleDelete = async () => {
    deleteIt.mutate(undefined, {
      onSuccess: () => {
        toast.success(
          <ToastContent
            type={"success"}
            heading={"Success"}
            message={`Event deleted successfully`}
          />,
          ToastContent.Config
        );
        refetch();

        toggleDeleteModal();
      },
      onError: (e: any) => {
        handleError(e);
        toggleDeleteModal();
      },
    });
  };

  const { mutate, isLoading: publishIsLoading } = useUpdateEvent(id);

  function onUpdateEvent(data2: any) {
    console.log(data2);

    const body = {
      ...data2,
      attachments:
        data2?.materials?.length > 0 ? data2.materials : data?.attachments,
    };

    console.log(body);

    mutate(body, {
      onSuccess: () => {
        toast.success(
          <ToastContent
            heading={"Event updated successfully"}
            type={"success"}
            message={`Event has been updated successfully`}
          />,
          ToastContent.Config
        );
        refetch();
        toggleEditing();
      },

      onError: (e: any) => {
        handleError(e);
        toggleEditing();
      },
    });
  }

  return (
    <>
      <AddEvent
        defaultValues={data}
        isOpen={isEditing}
        toggle={toggleEditing}
        onCreate={onUpdateEvent}
        isLoading={publishIsLoading}
      />

      <div className="d-flex align-items-center  gap-3 ">
        <FaEdit
          onClick={toggleEditing}
          style={{ cursor: "pointer", fontSize: "23px", marginBottom: "4px" }}
        />
        <ConfirmDeleteModal
          visibility={visibilityDeleteModal}
          toggle={toggleDeleteModal}
          onDelete={() => handleDelete()}
          isLoading={isDeleteLoading}
        />
      </div>
    </>
  );
}

const EventsCards = ({ isStudent, tab }: EventCardsProps) => {
  const { data, isLoading, refetch } = useAllEvents();
  const events = data?.nodes;

  const upcomingEvents = events?.filter(
    (e: any) => new Date(e.endTime) > new Date()
  );
  const passEvents = events?.filter(
    (e: any) => new Date(e.endTime) < new Date()
  );
  console.log(upcomingEvents, passEvents);

  const mainEvents = tab === "upcoming events" ? upcomingEvents : passEvents;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="d-flex justify-content-start align-items-center  flex-wrap evt-card">
      {isLoading && <Spinner />}
      {events &&
        // events?.map(({ id, status, name, startTime, endTime }: IEvents) => (
        mainEvents?.map((event: IEvents, i: number) => (
          <article key={event.id} className="card p-0 evt">
            {/* top */}
            <div className="border-bottom evt-card-top d-flex align-items-center justify-content-center position-relative rounded-top">
              {event.status === "live" && (
                <div className="d-flex gap-1 justify-content-start align-items-start position-absolute top-0 start-0 py-2 px-3">
                  <RxDotFilled color="red" size={10} />
                  <p className="live fw-normal">Live now</p>
                </div>
              )}

              <div className="d-flex align-items-center  justify-content-between w-100  mx-3 ">
                <HiOutlineCalendar size={40} />

                {!isStudent && (
                  <DeleteEvent id={event.id} data={event} refetch={refetch} />
                )}
              </div>
            </div>

            {/* bottom */}
            <div className="p-4 d-flex align-items-center justify-content-between">
              <div className="d-flex gap-3 align-items-end justify-content-start">
                <div className="rounded p-4 evt-info d-flex align-items-center justify-content-center">
                  <p className="m-auto text-capitalize text-center fw-bold">
                    {new Date(event.startTime).getUTCDate()} -{" "}
                    {new Date(event.endTime).getUTCDate()}
                    <span className="month mt-2 fw-normal">
                      {monthNames[new Date(event.startTime).getUTCMonth()]}
                    </span>
                  </p>
                </div>

                <div className="d-flex flex-column">
                  <h4 className="text-capitalize">{event.name}</h4>

                  <div className="d-flex gap-2">
                    <HiClock size={16} />
                    <p className="evt-time">1:00 PM</p>
                  </div>
                </div>
              </div>

              {event.status === "live" && (
                <Link
                  to={`/${isStudent ? "student" : "ict-admin"}/event/live/${
                    event.id
                  }`}
                  className="btn btn-blue-800 evt-btn"
                >
                  <HiOutlineChevronRight size={24} />
                </Link>
              )}
            </div>
          </article>
        ))}
    </div>
  );
};

export default EventsCards;
