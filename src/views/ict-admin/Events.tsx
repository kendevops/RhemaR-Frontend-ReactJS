import { useRef } from "react";
import CardHeader from "../../components/atoms/CardHeader";
import EventsIcon from "../../assets/img/eventsIcon.svg";
import AddFaq from "../../components/modals/AddFaq";
import useToggle from "../../utility/hooks/useToggle";
import EventsList from "../../components/lists/events-list";
import { HiCalendar, HiOutlineCalendar, HiOutlineChevronLeft, HiOutlineChevronRight, HiClock } from "react-icons/hi";
import { RxDotFilled } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";

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

const Eventsdata = [
	{
		id: "1",
		event: "What is RBTC?",
		status: "active",
	},
	{
		id: "2",
		event: "What is RBTC?",
		status: "inactive",
	},
	{
		id: "3",
		event: "What is RBTC?",
		status: "inactive",
	},
	{
		id: "4",
		event: "What is RBTC?",
		status: "inactive",
	},
	{
		id: "5",
		event: "What is RBTC?",
		status: "inactive",
	},
	{
		id: "6",
		event: "What is RBTC?",
		status: "inactive",
	},
];

const Events = () => {
	const [visibility, toggle] = useToggle();
	const dateRef = useRef(new Date());

	const month = dateRef.current.toLocaleString("default", { month: "long" });
	const year = dateRef.current.getFullYear();
	const formattedDate = `${month} ${year}`;

	return (
		<>
			<CardHeader heading="events" imgSrc={EventsIcon} />

			<div className="">
				{/* Modal button */}
				<div className="d-flex justify-content-end">
					<button onClick={toggle} className="btn btn-blue-800 btn-lg card-btn">
						new event
					</button>
					<AddFaq {...{ toggle, visibility }} />
				</div>

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

						<div className="container my-5">
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

											<button className="btn btn-blue-800 evt-btn">
												{status === "active" ? <HiOutlineChevronRight size={24} /> : <MdModeEditOutline size={24} />}
											</button>
										</div>
									</article>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Events;
