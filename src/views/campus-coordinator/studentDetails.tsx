import React, { useState, useRef, useEffect } from "react";

import { Spinner } from "reactstrap";
import { Icon } from "@iconify/react";
import { FaBook, FaGraduationCap } from "react-icons/fa";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import useCourses from "../../hooks/queries/classes/useCourses";
import ProgressBarMui from "../../components/progressBars/progressBer";
import SessionSchedule from "../../components/students/SessionSchedule";
import Tab from "../../components/atoms/Tab";
import AcademicReport from "../../components/students/AcademicReport";
import BackButton from "../../components/molecules/BackButton";
import { useHistory, useParams } from "react-router-dom";
import useAllUsers from "../../hooks/queries/useAllUsers";
import useApplications from "../../hooks/queries/applications/useApplications";
import StudentL1CoursesTable from "../../components/tables/ss-admin-tables/StudentL1CourseTable";
import StudentL2CoursesTable from "../../components/tables/ss-admin-tables/StudentL2CourseTable";
import StudentDetails from "../../components/tables/ss-admin-tables/StudentDetail";

const StudentDetailsPage = () => {
  const [tab, setTab] = useState(0);

  let Tabs = [
    "Level 1",
    "Level 2",
    "Profile",
    "Communication",
    "Church",
    "Referree",
    "Clearance",
  ];

  const currentTab = Tabs[tab];

  const history = useHistory();
  const params = useParams<{
    id: string;
  }>();

  useEffect(() => {
    if (!params?.id) {
      history.replace("/");
    }
  }, [params?.id, history]);

  const { data, isLoading, refetch } = useApplications();

  const approvedStudentsData = data?.nodes?.filter(
    (d: any, i: number) => d.status === "APPROVED"
  );

  //   const { data: insData, isLoading, refetch } = useInstructors();
  //   const InstructorsData = insData?.nodes;

  const selectedStudent = approvedStudentsData?.find(
    (d: any) => d?.id === params?.id
  );

  console.log(selectedStudent);

  const { data: coursesData, isLoading: coursesLoading } = useCourses();

  const { data: userData, isLoading: userLoading } = useCurrentUser();

  console.log(userData);

  return (
    <div className="container my-5">
      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>{`${selectedStudent?.user?.firstName} ${selectedStudent?.user?.lastName}`}</div>

        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${selectedStudent?.level?.name}`}</div>

        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>
        <div>{`${selectedStudent?.campus?.name}`}</div>
      </div>

      <div>
        <BackButton />
        <Tab.Wrapper className="d-flex gap-3 my-4">
          {Tabs?.map((t, i) => {
            return (
              <Tab
                key={t}
                tabColor="#289483"
                isSelected={currentTab === t}
                onClick={() => {
                  setTab(i);
                }}
              >
                {t}
              </Tab>
            );
          })}
        </Tab.Wrapper>

        {currentTab === "Level 1" && <StudentL1CoursesTable />}
        {currentTab === "Level 2" && <StudentL2CoursesTable />}
        {currentTab === "Profile" && <StudentDetails />}
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          {/* {coursesLoading && <Spinner />} */}
          {/*  Progress */}
        </div>

        {/*  */}
        <div className="col-lg-6 col-md-6 col-12 mb-4"></div>
      </div>
    </div>
  );
};

export default StudentDetailsPage;
