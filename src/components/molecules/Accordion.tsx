import React, { FormEvent, useState } from "react";
import useToggle from "../../utility/hooks/useToggle";
import EditIcon from "../icons/Edit";
// import EditFaq from "../modals/EditFaq";
import AddFaq from "../modals/AddFaq";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import FormDropdown from "./FormDropdown";
import FormInput from "./FormInput";
import TextArea from "./TextArea";
import useForm from "../../utility/hooks/useForm";

const Accordiondata = [
  {
    id: "1",
    question: "What is RBTC 1?",
    answer:
      "Frequently asked questions What is RBTC Frequently asked questions",
    category: "Tuition & Payment",
  },
  {
    id: "2",
    question: "What is RBTC and more 2?",
    answer:
      "Frequently asked questions What is RBTC Frequently asked questions",
    category: "Exam & Courses",
  },
  {
    id: "3",
    question: "What is RBTC 3?",
    answer:
      "Frequently asked questions What is RBTC Frequently asked questions",
    category: "Tuition & Payment",
  },
  {
    id: "4",
    question: "What is RBTC 4?",
    answer:
      "Frequently asked questions What is RBTC Frequently asked questions",
    category: "Tuition & Payment",
  },
  {
    id: "5",
    question: "What is RBTC 5?",
    answer:
      "Frequently asked questions What is RBTC Frequently asked questions",
    category: "Tuition & Payment",
  },
];

interface IAccordion {
  id: string;
  question: string;
  answer?: string;
}

interface IProps {
  AccordionData: IAccordion[];
  component: string;
  viewOnly?: boolean;
}

type AssignInstructorModalProps = {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: {
    question: string;
    answer?: string;
    category?: string;
    placeholder?: string;
  };
};

const options = ["Category 1", "Category 2"];

export function EditFaq({
  toggle,
  visibility,
  defaultValues,
}: AssignInstructorModalProps) {
  const dvalues = {
    question: defaultValues?.question,
    answer: defaultValues?.answer,
    category: defaultValues?.category,
  };
  const { formData, updateForm } = useForm({
    initialState: dvalues ?? {
      question: "What is RBTC",
      answer: "Rhema Bible training Center",
      category: "",
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  console.log(defaultValues);

  return (
    <>
      <Modal
        centered
        isOpen={visibility}
        toggle={toggle}
        id="assignInstructorModal"
      >
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
            <FormInput
              label="Question"
              value={formData["question"]}
              onChange={(e) => updateForm("question", e.target.value)}
              placeholder="Enter Question"
            />

            {/* answer */}
            <TextArea
              value={formData["answer"] as any}
              onChange={(e: { target: { value: any } }) =>
                updateForm("answer", e.target.value)
              }
              placeholder="Enter Answer"
            />

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              Update Question
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

const Accordion = ({ AccordionData, component, viewOnly }: IProps) => {
  const [active, setActive] = useState("");
  const [visibility, toggle] = useToggle();
  const [data, setData] = useState<any>();

  const handleClick = (id: string) => {
    setActive(id);
  };

  return (
    <div className="accordion" id={component}>
      {AccordionData.map((item, i) => {
        return (
          <div className="accordion-item mb-3" key={item.id}>
            <h2
              className="accordion-header d-flex mb-0"
              id={`heading-${item.id}`}
            >
              <button
                onClick={() => handleClick(item.id)}
                style={{ flex: 1, marginRight: "15px" }}
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#question-${item.id}`}
                aria-expanded={active === item.id ? "true" : "false"}
                aria-controls={`question-${item.id}`}
              >
                {item.question}
              </button>

              <div className="helpdesk-edit">
                {!viewOnly && (
                  <button
                    onClick={async () => {
                      setData(item);
                      toggle();
                    }}
                    className="edit-btn py-3 px-4 d-flex justify-content-center align-items-center"
                  >
                    Edit
                    <EditIcon />
                  </button>
                )}

                {/* <EditFaq
                  toggle={toggle}
                  visibility={visibility}
                  defaultValues={item}
                /> */}

                {/* <EditFaq {...{ toggle, visibility }} /> */}
              </div>
              {/* <div>
						<button onClick={toggle} className="btn btn-blue-800 btn-lg btn-helpdesk">
							Add F.A.Q
						</button>
						<AddFaq {...{ toggle, visibility }} />
					</div> */}
            </h2>
            <div
              id={`question-${item.id}`}
              className={`accordion-collapse collapse ${
                active === item.id ? "show" : ""
              } `}
              aria-labelledby={`heading-${item.id}`}
              data-bs-parent={`#${component}`}
            >
              <div className="accordion-body">{item.answer ?? "Answer"}</div>
            </div>
          </div>
        );
      })}

      {/* <AddFaq toggle={toggle} visibility={visibility} defaultValues={data} /> */}
      {/* {data && (
        <EditFaq toggle={toggle} visibility={visibility} defaultValues={data} />
      )} */}
    </div>
  );
};

export default Accordion;
