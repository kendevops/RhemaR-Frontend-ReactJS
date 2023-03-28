import { FormEvent, useState } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import FormRadioGroup from "../molecules/FormRadioGroup";
import CardWrapper from "../students/CardWrapper";
import useForm from "../../utility/hooks/useForm";
import useSubmitFeedback from "../../hooks/mutations/classes/useSubmitFeedback";
import handleError from "../../utils/handleError";

interface StudentFeedbackModalProps {
  isOpen: boolean;
  toggle: VoidFunction;
  courseId: string;
  formValues: {
    level: string;
    course: string;
    instructor: string;
    studentName?: string;
  };
}

//options
const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((o) => o.toString());

// questions
const q = [
  {
    title: "AVAILABILITY OF RELEVANT FACTS",
    question: "Presentation of facts relevant and related to the course.",
    rating: 0,
    comment: "",
  },
  {
    title: "DELIVERY OF CONTENT",
    question: "Clarity and precision in delivery of relevant content.",
    rating: 0,
    comment: "",
  },
  {
    title: "APPLICABILITY TO LIFE AND MINISTRY",
    question:
      "Presentation of course content with illustrations to show relevance to everyday life and ministry.  ",
    rating: 0,
    comment: "",
  },
  {
    title: "INTERACTION WITH CLASS",
    question: "Opportunity for class interaction with feedback and questions.",
    rating: 0,
    comment: "",
  },
];

export default function StudentFeedbackModal({
  isOpen,
  toggle,
  courseId,
}: StudentFeedbackModalProps) {
  const [questions, setQuestions] = useState(q);

  const { formData, formErrors, toggleError, updateForm } = useForm({
    initialState: {
      message: "",
    },
  });

  const { mutate, isLoading } = useSubmitFeedback(courseId);

  //When form is submitted
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = {
      message: formData.message,
      survey: questions.map(({ title, ...others }) => ({ ...others })),
    };

    mutate(data, {
      onSuccess: () => {
        alert("Feedback Submitted");
        isOpen && toggle();
      },
      onError: (e) => handleError(e, formData, toggleError),
    });
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
                    onChange={(e) => {
                      setQuestions((p) => {
                        const slot = p.findIndex((e) => e.title === title);
                        p[slot].rating = parseInt(e.target.value);
                        return p;
                      });
                    }}
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
                      onChange={(e) => {
                        setQuestions((p) => {
                          const slot = p.findIndex((e) => e.title === title);
                          p[slot].comment = e.target.value;
                          return p;
                        });
                      }}
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
                onChange={(e) => updateForm("message", e.target.value)}
              />
            </CardWrapper>

            <p className="mt-5">
              NB: Everything you write will be treated with absolute
              confidentiality. Thank you for taking the time to answer these
              questions.
            </p>

            {isLoading ? (
              <Spinner />
            ) : (
              <button
                className="btn btn-blue-800 btn-lg w-100 my-5"
                type="submit"
              >
                Submit
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
