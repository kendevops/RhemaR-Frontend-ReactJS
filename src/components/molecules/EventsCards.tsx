import { HiOutlineCalendar, HiOutlineChevronRight, HiClock } from "react-icons/hi";
import { RxDotFilled } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";

interface IEvents {
	id: string;
	event: string;
	status: string;
}

interface IEventProps {
	Eventsdata: IEvents[];
}

const EventsCards = ({ Eventsdata }: IEventProps) => {
	return (
		<div className="row">
			{Eventsdata.map(({ event, id, status }) => (
				<article key={id} className="card p-0 col-lg-4 col-md-6 col-sm-12 evt">
					{/* top */}
					<div className="border-bottom evt-card-top d-flex align-items-center justify-content-center position-relative rounded-top">
						{status === "active" && (
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
									9 - 11 <span className="month mt-2 fw-normal">jan</span>
								</p>
							</div>

							<div className="d-flex flex-column">
								<h4 className="text-capitalize">{event}</h4>

								<div className="d-flex gap-2">
									<HiClock size={16} />
									<p className="evt-time">1:00 PM</p>
								</div>
							</div>
						</div>

						<button className="btn btn-blue-800 evt-btn">{status === "active" ? <HiOutlineChevronRight size={24} /> : <MdModeEditOutline size={24} />}</button>
					</div>
				</article>
			))}
		</div>
	);
};

export default EventsCards;
