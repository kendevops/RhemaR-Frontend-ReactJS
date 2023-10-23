import React, { useState, useRef, useEffect } from "react";
import { Spinner } from "reactstrap";
import { Icon } from "@iconify/react";
import { FaBook } from "react-icons/fa";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useCourses from "../../hooks/queries/classes/useCourses";
import ProgressBarMui from "../../components/progressBars/progressBer";
import Tab from "../../components/atoms/Tab";
import TuitionPaymentContainer from "../../components/students/TuitionPaymentsContainer";
import useToggle from "../../utility/hooks/useToggle";
import MakePaymentModal from "../../components/modals/MakePaymentModal";
import CardWrapper from "../../components/students/CardWrapper";
import typography from "../../assets/img/Typography";
import useUserCoursesReport from "../../hooks/queries/users/useUserCoursesReport";

const StudentTuitionPage = () => {
  const [isOpen, toggle] = useToggle();
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);

  let levelTabs = ["Level 1", "Level 2"];

  const currentLevel = levelTabs[level];

  const { data: coursesData, isLoading: coursesLoading } = useCourses();
  const { data: coursesReportData, isLoading: coursesReportLoading } =
    useUserCoursesReport();
  const courses = coursesData?.courses;

  const coursesReport = coursesReportData?.nodes;

  const completion = coursesReport?.reduce((a: any, b: any) => {
    return (a?.completion ?? 0) + (b?.completion ?? 0);
  });

  const totalCompletion = courses?.length * 100;

  // console.log(totalCompletion, courses?.length, completion);
  const semesterProgress = Math.floor((completion / totalCompletion) * 100);

  console.log(semesterProgress);

  const { data: userData, isLoading: userLoading } = useCurrentUser();

  const startDate = userData?.currentSession?.startDate;
  const endDate = userData?.currentSession?.endDate;

  console.log(userData);

  // const startDate = "2022-12-07T22:00:43.187Z";
  // const endDate = "2023-12-20T22:00:43.187Z";

  useEffect(() => {
    const currentTime = new Date().getTime();

    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();

    const totalDuration = endTime - startTime;
    const elapsedDuration = currentTime - startTime;

    console.log(totalDuration, elapsedDuration);

    const calculatedProgress = Math.round(
      (elapsedDuration / totalDuration) * 100
    );
    setProgress(calculatedProgress > 100 ? 100 : calculatedProgress);
  }, [startDate, endDate]);

  const applications1 = userData?.levelOneApplications;
  const applications2 = userData?.levelTwoApplications;

  const application1 = applications1?.length ? applications1[0] : undefined;
  const application2 = applications2?.length ? applications2[0] : undefined;

  const application = currentLevel === "Level 1" ? application1 : application2;

  console?.log(application);

  const dash = [
    {
      title: "Application Fee",
      ...application?.initialPayment,
    },
    {
      title: "Initial Payment",
      ...application?.feePayment,
    },
    {
      title: "Monthly Installment",
      installments: application?.installments,
      amount: application?.feePayment?.amount * 8,
      paidAt: application?.installments?.length === 8,
    },
  ];

  return (
    <div className="container my-5">
      <MakePaymentModal amount={paymentAmount} {...{ isOpen, toggle }} />

      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>Tuition Payment and Fee Breakdown</div>
      </div>

      <div>
        <Tab.Wrapper className="d-flex gap-3 ">
          {levelTabs?.map((t, i) => {
            return (
              <Tab
                key={t}
                tabColor="#203864"
                isSelected={currentLevel === t}
                onClick={() => {
                  setLevel(i);
                }}
              >
                {t}
              </Tab>
            );
          })}
        </Tab.Wrapper>

        <section className="mb-5 d-flex gap-5 justify-content-between">
          {application &&
            dash?.map((d) => {
              console.log(d);

              return (
                <CardWrapper className="w-100" key={d?.title}>
                  <div className="my-3">
                    <p className="d-flex justify-content-between">
                      {d?.title}
                      {d?.title === "Monthly Installment" && (
                        <span>{`${d?.installments?.length}/8`}</span>
                      )}
                    </p>
                    <h2
                      style={{
                        fontSize: typography.h2,
                        fontWeight: "bold",
                      }}
                    >
                      N{d?.amount}
                    </h2>
                  </div>

                  {d?.paidAt ? (
                    <div
                      style={{
                        background: "rgba(92, 153, 61, 0.1)",
                        color: "#5C993D",
                      }}
                      className="p-3 rounded-3 text-center w-100  bg-success-200"
                    >
                      Paid
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setPaymentAmount(d?.amount);
                        d?.paymentUrl ? window?.open(d?.paymentUrl) : toggle();
                      }}
                      className="btn btn-blue-800 btn-lg w-100"
                    >
                      Make Payment
                    </button>
                  )}
                </CardWrapper>
              );
            })}
        </section>

        <div>
          <TuitionPaymentContainer
            title={
              currentLevel === "Level 2"
                ? "Level 2 Tuition & Payments"
                : "Level 1 Tuition & Payments"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default StudentTuitionPage;
