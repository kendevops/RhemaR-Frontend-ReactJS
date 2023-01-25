import HelpDeskIcon from "../../components/icons/HelpdeskIcon";
import SearchBar from "../../components/general/searchBar";
import AddFaq from "../../components/modals/AddFaq";
import useToggle from "../../utility/hooks/useToggle";
import EventsList from "../../components/lists/events-list";
import Accordion from "../../components/molecules/Accordion";

const Listdata = [
	{
		id: "1",
		header: "all questions",
	},
	{
		id: "2",
		header: "exam & courses",
	},
	{
		id: "3",
		header: "tuition & payment",
	},
	{
		id: "4",
		header: "login & security",
	},
	{
		id: "5",
		header: "events & meetings",
	},
];

const Accordiondata = [
	{
		id: "1",
		header: "What is RBTC?",
	},
	{
		id: "2",
		header: "What is RBTC?",
	},
	{
		id: "3",
		header: "What is RBTC?",
	},
	{
		id: "4",
		header: "What is RBTC?",
	},
	{
		id: "5",
		header: "What is RBTC?",
	},
];

export default function HelpDesk() {
	const [visibility, toggle] = useToggle();

	return (
		<>
			{/* Card Header */}
			<div className="helpdesk mt-3 mb-5 w-100 d-flex justify-content-between align-items-center px-5">
				<h1 className="fw-bold">Frequently asked questions</h1>

				<HelpDeskIcon />
			</div>

			<div className="col col-md-9 mx-auto">
				{/* Search Row */}
				<article className="d-flex gap-5 ">
					<div style={{ flex: 1 }}>
						<SearchBar placeholder="Search FAQ Database" />
					</div>

					<div>
						<button onClick={toggle} className="btn btn-blue-800 btn-lg btn-helpdesk">
							Add F.A.Q
						</button>
						<AddFaq {...{ toggle, visibility }} />
					</div>
				</article>

				{/* body */}
				<div className="card my-5 helpdesk-card">
					<EventsList ListData={Listdata} />

					<div className="px-5 my-4">
						<h3 className="text-capitalize fw-bold mb-4">All questions</h3>

						{/* accordion */}
						<Accordion AccordionData={Accordiondata} component="helpdesk" />
					</div>
				</div>
			</div>
		</>
	);
}
