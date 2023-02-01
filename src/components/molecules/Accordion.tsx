import React, { useState } from "react";
import useToggle from "../../utility/hooks/useToggle";
import EditIcon from "../icons/Edit";
import EditFaq from "../modals/EditFaq";


interface IAccordion {
	id: string;
	header: string;
}

interface IProps {
	AccordionData: IAccordion[];
	component: string;
}

const Accordion = ({ AccordionData, component }: IProps) => {
	const [active, setActive] = useState("");
	const [visibility, toggle] = useToggle();


	const handleClick = (id: string) => {
		setActive(id);
	};

	return (
		<div className="accordion" id={component}>
			{AccordionData.map(({ id, header }) => (
				<div className="accordion-item mb-3" key={id}>
					<h2 className="accordion-header d-flex mb-0" id={`heading-${id}`}>
						<button
							onClick={() => handleClick(id)}
							style={{ flex: 1, marginRight: "15px" }}
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target={`#question-${id}`}
							aria-expanded={active === id ? "true" : "false"}
							aria-controls={`question-${id}`}>
							{header}
						</button>

						<div className="helpdesk-edit">
							<button onClick={toggle} className="edit-btn py-3 px-4 d-flex justify-content-center align-items-center">
								Edit
								<EditIcon />
							</button>

						<EditFaq {...{ toggle, visibility }} />

						</div>
						{/* <div>
						<button onClick={toggle} className="btn btn-blue-800 btn-lg btn-helpdesk">
							Add F.A.Q
						</button>
						<AddFaq {...{ toggle, visibility }} />
					</div> */}
					</h2>
					<div
						id={`question-${id}`}
						className={`accordion-collapse collapse ${active === id ? "show" : ""} `}
						aria-labelledby={`heading-${id}`}
						data-bs-parent={`#${component}`}>
						<div className="accordion-body">
							<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we
							use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any
							of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{" "}
							<code>.accordion-body</code>, though the transition does limit overflow.
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Accordion;
