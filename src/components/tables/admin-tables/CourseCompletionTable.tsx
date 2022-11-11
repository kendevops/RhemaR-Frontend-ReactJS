import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import DataTable from '../../tables/data-table/DataTableBase';
import DataTable, { TableColumn } from 'react-data-table-component';
import StudentProgress from '../../modals/StudentProgress';

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
  console.log('clicked');
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
        selector: row => row.studentFullname,
        sortable: true,
      },
      {
        name: "Student ID",
        selector: row => row.studentID,
        sortable: true,
      },
      {
        name: "Email",
        selector: row => row.email,
        sortable: true,
      },
      {
        name: "Mobile",
        selector: row => row.mobile,
        sortable: true,
      },
      {
        name: "Campus",
        selector: row => row.campus,
        sortable: true,
      },
      {
        name: "Level",
        selector: row => row.level,
        sortable: true,
      },
      {
          name: "Course Attendance Progress",
          selector: row => row.courseAttendanceProgress,
          sortable: true,
        },
    ];

//Backend Engr. refer to comment at bottom
function CourseCompletionComponent(): JSX.Element {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);

	const fetchUsers = async (page: number) => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

		setData(response.data.data);
		setTotalRows(response.data.total);
		setLoading(false);
	};

	const handlePageChange = (page: any) => {
		fetchUsers(page);
	};

	const handlePerRowsChange = async (newPerPage: React.SetStateAction<number>, page: any) => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers(1); // fetch page 1 of users
		
	}, []); //ignore warning

	return (
		<DataTable
			title="Students"
			columns={columns}
			data={data}
			progressPending={loading}
			pagination
			paginationServer
			paginationTotalRows={totalRows}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
      selectableRows
      //expandableRows
		/>
	);
};

export default CourseCompletionComponent;







// To enable remote/manual pagination you'll need to add the paginationServer property and ensure the remote API you are using supports pagination metadata.
// You'll also need to implement the onChangeRowsPerPage, and onChangePage callbacks.
// Finally, you'll need to keep track of your total rows using paginationTotalRows. This should be obtained from the remote API you are calling from to get the pagnination records.
