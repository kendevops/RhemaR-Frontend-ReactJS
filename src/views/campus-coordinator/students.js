import React, { useState, useRef, useEffect } from "react";
import StudentsList from "../../components/lists/students-list/index";
import StudentsTable from "../../components/tables/students-table/index";

const CampusCoordinatorStudents = () => {
  return (
    <>
      <div className="container my-5">
        <StudentsList />
        <div className="row">
          <div className="col-xl-8 col-lg-9 col-md-11 col-12 mx-auto">
            <app-searchbar
            //TODO: implement search
            ></app-searchbar>
          </div>
        </div>
      </div>

      <div className="tab-content p-4" id="pills-tabContent">
        <div className="table-responsive rounded-2 r-card bg-white">
          <StudentsTable />
        </div>
      </div>
    </>
  );
};

export default CampusCoordinatorStudents;
