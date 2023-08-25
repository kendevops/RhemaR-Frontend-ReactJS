import { FormEvent, useState } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import FormRadioGroup from "../../components/molecules/FormRadioGroup";
import CardWrapper from "../../components/students/CardWrapper";
import useForm from "../../utility/hooks/useForm";
import useSubmitFeedback from "../../hooks/mutations/classes/useSubmitFeedback";
import handleError from "../../utils/handleError";
import { Icon } from "@iconify/react";
import BackButton from "../../components/molecules/BackButton";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";

interface StudentFeedbackModalProps {
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

export default function StudentLectureFeedback({
  courseId,
}: StudentFeedbackModalProps) {
  const [questions, setQuestions] = useState(q);

  const { data: userData, isLoading: userLoading } = useCurrentUser();

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
        // isOpen && toggle();
      },
      onError: (e) => handleError(e, formData, toggleError),
    });
  }

  return (
    <div>
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Course Listening Assignments</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.firstName} ${userData?.firstName}`}</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.level?.name
          ?.split("_")
          .join(" ")
          .toLowerCase()}`}</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${userData?.campus?.name}`}</div>
      </div>
      <BackButton />
      <div id="feedbackModal">
        <h2 className="my-3">Course Feedback</h2>
        <div>
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
        </div>
      </div>
    </div>
  );
}
