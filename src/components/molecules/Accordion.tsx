import React, { useState } from "react";

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

	const handleClick = (id: string) => {
		setActive(id);
	};

	return (
		<div className="accordion" id={component}>
			{AccordionData.map(({ id, header }) => (
				<div className="accordion-item">
					<h2 className="accordion-header" id={`heading-${id}`}>
						<button
							onClick={() => handleClick(id)}
							className="accordion-button"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target={`#question-${id}`}
							aria-expanded={active === id ? "true" : "false"}
							aria-controls={`question-${id}`}>
							{header}
						</button>
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
