import useForm from "../../utility/hooks/useForm";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { FormEvent } from "react";
import FormInput from "../molecules/FormInput";
import FormDropdown from "../molecules/FormDropdown";
import TextArea from "../molecules/TextArea";

type AssignInstructorModalProps = {
	toggle: VoidFunction;
	visibility: boolean;
	defaultValues?: {
		question: string;
		answer: string;
		category?: string;
		placeholder?: string;
	};
};

const options = ["Category 1", "Category 2"];

export default function EditFaq({ toggle, visibility, defaultValues }: AssignInstructorModalProps) {
	const { formData, updateForm } = useForm({
		initialState: defaultValues ?? {
			question: "What is RBTC",
			answer: "Rhema Bible training Center",
		},
	});

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
	}

	return (
		<>
			<Modal centered isOpen={visibility} toggle={toggle} id="assignInstructorModal">
				<ModalHeader toggle={toggle}>Edit F.A.Q</ModalHeader>
				<ModalBody>
					<form className="mt-3" onSubmit={handleSubmit}>
						{/* dropdown */}
						<FormDropdown
							title="Category"
							options={options?.map((o) => ({
								children: o,
								onClick: () => updateForm("category", o),
							}))}
						/>

						{/* question */}
						<FormInput label="Question" value={formData["question"]} onChange={(e) => updateForm("question", e.target.value)} placeholder="Enter Question" />

						{/* answer */}
						<TextArea
							value={formData["answer"]}
							onChange={(e: { target: { value: any } }) => updateForm("answer", e.target.value)}
							placeholder="Enter Answer"
						/>

						<button className="btn btn-blue-800 btn-lg w-100 my-5" type="submit">
							Update Question
						</button>
					</form>
				</ModalBody>
			</Modal>
		</>
	);
}
