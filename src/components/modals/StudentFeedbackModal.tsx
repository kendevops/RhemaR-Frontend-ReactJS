import { FormEvent } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import FormRadioGroup from "../molecules/FormRadioGroup";
import CardWrapper from "../students/CardWrapper";

interface StudentFeedbackModalProps {
  isOpen: boolean;
  toggle: VoidFunction;
  formValues: {
    level: string;
    course: string;
    instructor: string;
    studentName?: string;
  };
}

//options
const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((o) => o.toString());

//feedback questions
const questions = [
  {
    title: "AVAILABILITY OF RELEVANT FACTS",
    question: "Presentation of facts relevant and related to the course.",
  },
  {
    title: "DELIVERY OF CONTENT",
    question: "Clarity and precision in delivery of relevant content.  ",
  },
  {
    title: "APPLICABILITY TO LIFE AND MINISTRY",
    question:
      "Presentation of course content with illustrations to show relevance to everyday life and ministry.  ",
  },
  {
    title: "INTERACTION WITH CLASS",
    question: "Opportunity for class interaction with feedback and questions.",
  },
];

export default function StudentFeedbackModal({
  isOpen,
  toggle,
}: StudentFeedbackModalProps) {
  //When form is submitted
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div>
      <Modal fullscreen centered {...{ isOpen, toggle }} id="feedbackModal">
        <ModalHeader toggle={toggle}>Give Feedback</ModalHeader>
        <ModalBody>
          <p className="mb-5">
            Please read carefully the statements below and write the appropriate
            score in the box provided. Code: Kindly use a scale of 1-10, where 1
            is ‘Poor’ and 10 is ‘Excellent’.
          </p>

          <form className="mt-3" onSubmit={handleSubmit}>
            {questions.map(({ question, title }) => {
              return (
                <CardWrapper key={question}>
                  <FormRadioGroup
                    label={question}
                    customLabel={
                      <label className="mb-3" htmlFor={question}>
                        {title} <br /> {question}
                      </label>
                    }
                    options={options}
                  />

                  {/* Comments */}
                  <div className="mt-3">
                    <label htmlFor={`comment ${question}`}>Comment:</label>
                    <textarea
                      className="form-control"
                      id={`comment ${question}`}
                      placeholder="Your answer"
                    />
                  </div>
                </CardWrapper>
              );
            })}

            <CardWrapper>
              <label htmlFor={`Other Comment`}>Other Comment/Testimony:</label>
              <textarea
                className="form-control"
                id={`Other Comment`}
                placeholder="Your answer"
              />
            </CardWrapper>

            <p className="mt-5">
              NB: Everything you write will be treated with absolute
              confidentiality. Thank you for taking the time to answer these
              questions.
            </p>

            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
