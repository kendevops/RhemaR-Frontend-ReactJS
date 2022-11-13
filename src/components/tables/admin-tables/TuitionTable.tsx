/**
 * Ref: https://react-data-table-component.netlify.app/?path=/docs/getting-started-intro--page
 */

 import axios from 'axios';
 import React, { useEffect, useState } from 'react';
 //import DataTable from '../../tables/data-table/DataTableBase';
 import DataTable, { TableColumn } from 'react-data-table-component';
 
 //TODO: Implement CSV Export
 //TODO: Call Edit Tuition  modal
 //TODO: Customize UI
 
 type TuitionData = {
   cell: string;
   campus: string;
   level: string;
   tuitionType: string;
   amount: string;
   discounted: string;
   discountAmount: string;
   date: string;
 };
 
 const handleButtonClick = () => {
    //TODO: Call Tuition Edit modal
   console.log('clicked');
 };
 
 const columns: TableColumn<TuitionData>[] = [
       {         
         cell: () => <button onClick={handleButtonClick}>Edit Tuition</button>,
         ignoreRowClick: true,
         allowOverflow: true,
         button: true,
         name: "View",
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
         name: "Tuition Type",
         selector: row => row.tuitionType,
         sortable: true,
       },
       {
         name: "Amount",
         selector: row => row.amount,
         sortable: true,
       },
       {
         name: "Discounted",
         selector: row => row.discounted,
         sortable: true,
       },
       {
         name: "Discount Amount",
         selector: row => row.discountAmount,
         sortable: true,
       },
       {
           name: "Date Added",
           selector: row => row.date,
           sortable: true,
         },
     ];
 
 //Backend Engr. refer to comment at bottom
 function TuitionTableComponent(): JSX.Element {
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
             title="Existing Tuition Table"
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
 
 export default TuitionTableComponent;
 
 
 
 
 
 
 
 // To enable remote/manual pagination you'll need to add the paginationServer property and ensure the remote API you are using supports pagination metadata.
 // You'll also need to implement the onChangeRowsPerPage, and onChangePage callbacks.
 // Finally, you'll need to keep track of your total rows using paginationTotalRows. This should be obtained from the remote API you are calling from to get the pagnination records.
 