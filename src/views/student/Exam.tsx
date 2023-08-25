import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Row from "../../components/layouts/Row";
import BackButton from "../../components/molecules/BackButton";
import Question from "../../components/molecules/Question";
import Timer from "../../components/molecules/Timer";
import ColWrapper from "../../components/students/ColWrapper";
import useExam from "../../hooks/queries/classes/useExam";
import { Spinner } from "reactstrap";
import useSubmitExam from "../../hooks/mutations/classes/useSubmitExam";
import handleError from "../../utils/handleError";

interface ExamParams {
  id: string;
}

export default function Exam() {
  const router = useHistory();
  const params = useParams<ExamParams>();

  console.log(params?.id);

  useEffect(() => {
    params?.id ? console.log("") : router?.goBack();
  }, [params?.id, router]);

  const [submissions, setSubmissions] = useState<
    { answer: string; questionId: string }[]
  >([]);

  const { data, isLoading } = useExam(params?.id);
  const submitExam = useSubmitExam(params?.id);

  console.log(data);

  function endExam() {
    submitExam.mutate(
      { submissions },
      {
        onSuccess: () => {
          alert("Exam successfully taken");
          router.push("/student/courses");
        },
        onError: (e) => {
          handleError(e);
        },
      }
    );
  }

  const style = {
    marginTop: "6rem",
  };

  return (
    <>
      {/* Header */}
      <section
        className="w-100 p-4 bg-white shadow-sm fixed-top "
        style={style}
      >
        <div className="exam-header">
          <BackButton />

          {isLoading && <Spinner />}

          {data && (
            <div className="mt-3 d-flex gap-4 justify-content-center">
              <Timer onEnd={endExam} />
            </div>
          )}
        </div>
      </section>

      <Row>
        <ColWrapper className="mx-auto" lg="9">
          {/* Questions */}
          <ul
            className="no-padding-left"
            style={{
              paddingTop: "12rem",
            }}
          >
            {data?.questions?.map((d: any, index: number) => {
              const props = {
                ...d,
                index,
                onSelect: (answer: string, id: string) => {
                  setSubmissions((p) => {
                    const restArr = p?.filter(
                      ({ questionId }) => questionId !== id
                    );
                    return [...restArr, { answer, questionId: id }];
                  });
                },
              };

              return (
                <li key={d?.id}>
                  <Question {...props} />
                </li>
              );
            })}
          </ul>
        </ColWrapper>
      </Row>
    </>
  );
}
