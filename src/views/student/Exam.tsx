import { Pagination } from "@mui/material";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Row from "../../components/layouts/Row";
import BackButton from "../../components/molecules/BackButton";
import Question from "../../components/molecules/Question";
import Timer from "../../components/molecules/Timer";
import ColWrapper from "../../components/students/ColWrapper";
import { demoExamData } from "../../data/Exam";
import usePagination from "../../utility/hooks/usePagination";

interface ExamParams {
  id: string;
}

export default function Exam() {
  const router = useHistory();
  const params = useParams<ExamParams>();
  const {
    page,
    pages,
    paginatedData: data,
    setPage,
  } = usePagination(demoExamData, 6);

  useEffect(() => {
    params?.id ? console.log(params?.id) : router?.goBack();
  }, [params?.id, router]);

  function endExam() {}

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
          <div className="mt-3 d-flex gap-4 justify-content-center">
            <Timer onEnd={endExam} />

            <Pagination
              count={pages?.length}
              page={page}
              variant="outlined"
              className="rounded-4"
              shape="rounded"
              onChange={(e, p) => setPage(p)}
            />
          </div>
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
            {data?.map((d, index) => {
              const props = {
                ...d,
                index,
              };

              return (
                <li key={index}>
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
