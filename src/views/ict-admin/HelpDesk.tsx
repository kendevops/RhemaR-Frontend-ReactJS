import typography from "../../assets/img/Typography";
import helpDeskImg from "../../assets/img/helpdesk.png";
import SearchBar from "../../components/general/searchBar";
import AddFaq from "../../components/modals/AddFaq";
import useToggle from "../../utility/hooks/useToggle";
import EventsList from "../../components/lists/events-list";

const Listdata = [
	{
		id: "1",
		header: "Upcoming Events",
	},
	{
		id: "2",
		header: "Past Events",
	},
];

export default function HelpDesk() {
	const [visibility, toggle] = useToggle();

	return (
		<>
			{/* Card Header */}
			<div className="relative mt-3 mb-5">
				<h1
					style={{
						fontSize: typography.h1,
					}}
					className="fw-bold resources-text helpdesk-text">
					Frequently asked questions
				</h1>
				<img
					className="w-100"
					src={helpDeskImg}
					alt="FAQ"
				/>
			</div>

			<div className="">
				{/* Search Row */}
				<article className="d-flex gap-5 ">
					<div style={{ flex: 1 }}>
						<SearchBar placeholder="Search FAQ Database" />
					</div>

					<div>
						<button
							onClick={toggle}
							className="btn btn-blue-800 btn-lg btn-helpdesk">
							Add F.A.Q
						</button>
						<AddFaq {...{ toggle, visibility }} />
					</div>
				</article>

				{/* body */}
				<div className="">
					<EventsList ListData={Listdata} />
				</div>
			</div>
		</>
	);
}
