import React, { useEffect, useState } from "react";
//import DataTable from '../../tables/data-table/DataTableBase';
// import DataTable, { TableColumn } from "react-data-table-component";
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

// name: <button onClick={handleButtonClick}>View Report</button>

//     name: "Student Name",
//     name: "Student ID",

//     name: "Email",

//     name: "Mobile",

//     name: "Campus",

//     name: "Level",

//     name: "Course Attendance Progress",

function CourseCompletionComponent() {
  return <Table.Wrapper>{}</Table.Wrapper>;
}

export default CourseCompletionComponent;
