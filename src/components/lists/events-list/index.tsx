import React, { useState } from "react";

interface IList {
	id: string;
	header: string;
}

interface Props {
	ListData: IList[];
}

const EventsList = ({ ListData }: Props) => {
	const [active, setActive] = useState("1");

	const handleClick = (id: any) => {
		setActive(id);
	};

	return (
		<ul
			className="nav nav-pills mb-3"
			id="pills-tab"
			role="tablist">
			{ListData.map(({ id, header }) => (
				<li
					key={id}
					className="nav-item"
					role="presentation">
					<button
						onClick={() => handleClick(id)}
						className={`nav-link ${
							active === id ? "active" : ""
						}`}
						id="pills-UpcomingEvents-tab"
						data-bs-toggle="pill"
						data-bs-target="#pills-UpcomingEvents"
						type="button"
						role="tab"
						aria-controls="pills-UpcomingEvents"
						aria-selected={
							active === id ? "true" : "false"
						}>
						{header}
					</button>
				</li>
			))}
			{/* <li className="nav-item" role="presentation">
				<button
					className="nav-link active"
					id="pills-UpcomingEvents-tab"
					data-bs-toggle="pill"
					data-bs-target="#pills-UpcomingEvents"
					type="button"
					role="tab"
					aria-controls="pills-UpcomingEvents"
					aria-selected="true">
					Upcoming Events
				</button>
			</li>
			<li className="nav-item" role="presentation">
				<button
					className="nav-link"
					id="pills-PastEvents-tab"
					data-bs-toggle="pill"
					data-bs-target="#pills-PastEvents"
					type="button"
					role="tab"
					aria-controls="pills-PastEvents"
					aria-selected="false">
					Past Events
				</button>
			</li> */}
		</ul>
	);
};

export default EventsList;
