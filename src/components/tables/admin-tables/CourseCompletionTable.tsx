import axios from "axios";
import React, { useEffect, useState } from "react";
//import DataTable from '../../tables/data-table/DataTableBase';
import DataTable, { TableColumn } from "react-data-table-component";
import StudentProgress from "../../modals/StudentProgress";
import Table from "../../general/table/Table";

//TODO: Implement CSV Export
//TODO: Call student progree modal
//TODO: Customize UI
//TODO: Connect SearchBar and Data Table to API Data

type StudentProgressData = {
  cell: string;
  studentFullname: string;
  studentID: string;
  email: string;
  mobile: string;
  campus: string;
  level: string;
  courseAttendanceProgress: string;
};

const handleButtonClick = () => {
  //<StudentProgress /> //TODO: Call student progree modal
  console.log("clicked");
};

const columns: TableColumn<StudentProgressData>[] = [
  {
    cell: () => <button onClick={handleButtonClick}>View Report</button>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    name: "View",
  },
  {
    name: "Student Name",
    selector: (row) => row.studentFullname,
    sortable: true,
  },
  {
    name: "Student ID",
    selector: (row) => row.studentID,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Mobile",
    selector: (row) => row.mobile,
    sortable: true,
  },
  {
    name: "Campus",
    selector: (row) => row.campus,
    sortable: true,
  },
  {
    name: "Level",
    selector: (row) => row.level,
    sortable: true,
  },
  {
    name: "Course Attendance Progress",
    selector: (row) => row.courseAttendanceProgress,
    sortable: true,
  },
];

function CourseCompletionComponent() {
  return <Table.Wrapper>{}</Table.Wrapper>;
}

export default CourseCompletionComponent;
