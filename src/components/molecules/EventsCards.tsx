import { HiOutlineCalendar, HiOutlineChevronRight, HiClock } from "react-icons/hi";
import { RxDotFilled } from "react-icons/rx";
import useAllEvents from "../../hooks/queries/events/useAllEvents";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";

interface IEvents {
	id: string;
	status?: string;
	name?: string;
	endTime?: any;
	startTime?: any;
	// desc?: string;
	// video?: string;
	// resources?: string;
}

const EventsCards = () => {
	const { data, isLoading } = useAllEvents();
	const events = data?.nodes;

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	return (
		<div className="d-flex justify-content-start align-items-center  flex-wrap evt-card">
			{isLoading && <Spinner />}
			{events &&
				events?.map(({ id, status, name, startTime, endTime }: IEvents) => (
					<article key={id} className="card p-0 evt">
						{/* top */}
						<div className="border-bottom evt-card-top d-flex align-items-center justify-content-center position-relative rounded-top">
							{status === "live" && (
								<div className="d-flex gap-1 justify-content-start align-items-start position-absolute top-0 start-0 py-2 px-3">
									<RxDotFilled color="red" size={10} />
									<p className="live fw-normal">Live now</p>
								</div>
							)}

							<HiOutlineCalendar size={40} />
						</div>

						{/* bottom */}
						<div className="p-4 d-flex align-items-center justify-content-between">
							<div className="d-flex gap-3 align-items-end justify-content-start">
								<div className="rounded p-4 evt-info d-flex align-items-center justify-content-center">
									<p className="m-auto text-capitalize text-center fw-bold">
										{new Date(startTime).getUTCDate()} - {new Date(endTime).getUTCDate()}
										<span className="month mt-2 fw-normal">{monthNames[new Date(startTime).getUTCMonth()]}</span>
									</p>
								</div>

								<div className="d-flex flex-column">
									<h4 className="text-capitalize">{name}</h4>

									<div className="d-flex gap-2">
										<HiClock size={16} />
										<p className="evt-time">1:00 PM</p>
									</div>
								</div>
							</div>

							{status === "live" && (
								<Link to={`/ict-admin/events/live/${id}`} className="btn btn-blue-800 evt-btn">
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
