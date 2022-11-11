import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import Vertical from '../../atoms/Vertical'
// import React, { useState } from 'react';
// import StudentProgress from "../../modals/StudentProgress";

// import {
//   Nav,
//   NavItem,
//   Dropdown,
//   DropdownItem,
//   DropdownToggle,
//   DropdownMenu,
//   NavLink,
// } from 'reactstrap';

type StudentProgressData = {
  studentFullname: string;
  studentID: string;
  email: string;
  mobile: string;
  campus: string;
  level: string;
  courseAttendanceProgress: string;
  // courseAttendance: string; //This is course names with attendance status
  // courseGrade: number; //This is course names with acquired grades
};

interface Props {
  data: StudentProgressData;
}

//Connect the type to data
const data: StudentProgressData[] = [
  { studentFullname: "Taiwo Oladipopo", studentID: "23245", email: "taiwo@gmail.com", mobile: "09078670058", campus: "Abuja", level: "2", courseAttendanceProgress:"82%"}, //TODO: Substitute hard-coded data for live data
];

    function ViewStudentProgess({ data }: Props) {
        //const [dropdownOpen, setDropdownOpen] = useState(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [visibility, toggle] = useToggle();
        //const toggle = () => setDropdownOpen(!dropdownOpen);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const defaultValues = {
            studentFullname: data?.studentFullname,
            // studentFirstname: data?.studentFirstname,
            // studentLastnama: data?.studentLastname,
            campus: data?.campus,
            level: data?.level,
            courseAttendanceProgress: data?.courseAttendanceProgress,
            // courseAttendance: data?.courseAttendance,
            // courseGrade: data?.courseGrade
          };

          return (
          <>
          <u
            onClick={toggle}
            className="text-info click"
            data-bs-toggle="modal"
            data-bs-target="#progressModal"
          >
            <Vertical />
          </u>
          {/* TODO <StudentProgress {...{ visibility, toggle, defaultValues }} /> */} 
        </>
          );
          
        // TODO
        //  return (
        //     <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
        //       <DropdownToggle nav caret>
        //         View Progress
        //       </DropdownToggle>
        //       <DropdownMenu>
        //         <DropdownItem header>View Student</DropdownItem>
        //         <DropdownItem>View Feedback Form</DropdownItem>
        //         <DropdownItem>Modify Attendance</DropdownItem>
        //         <DropdownItem>Modify Grade</DropdownItem>
        //       </DropdownMenu>
        //     </Dropdown>
        // );
      }


export default function CourseCompletionTable() {
  const columns: TableColumns<StudentProgressData>[] = [
    {
      key: "Student Name",
      title: "Student Name",
      render: (data) => <p>{data?.studentFullname}</p>,
    },
    {
      key: "Student ID",
      title: "Student ID",
      render: (data) => <p>{data?.studentID}</p>,
    },
    {
      key: "Email",
      title: "Email",
      render: (data) => <p>{data?.email}</p>,
    },
    {
      key: "Mobile",
      title: "Mobile",
      render: (data) => <p>{data?.mobile}</p>,
    },
    {
      key: "Campus",
      title: "Campus",
      render: (data) => <p>{data?.campus}</p>,
    },
    {
      key: "Level",
      title: "Level",
      render: (data) => <p>{data?.level}</p>,
    },
    {
        key: "Course Attendance Progress",
        title: "Course Attendance Progress",
        render: (data) => <p>{data?.courseAttendanceProgress}</p>,
      },
    {
      key: "Action",
      title: "Action",
      render: (data) => <ViewStudentProgess data={data} />,
    },
  ];

  return (
    <Table.Wrapper>
      <Table {...{ data, columns }} />
    </Table.Wrapper>
  );
}
