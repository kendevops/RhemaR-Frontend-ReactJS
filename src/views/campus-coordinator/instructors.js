import React, { useState, useRef, useEffect } from "react";
import InstructorsTable from "../../components/tables/instructors-table/index";

const CampusCoordinatorInstructors = () => {
  return (
    <>
    <p>TODO: Search bar</p>
    <section className="container my-5">
    <section className="row">
    <div className="col-xl-8 col-lg-9 col-md-11 col-12 mx-auto">
      <app-searchbar
        placeHolder="Search"
        
      ></app-searchbar>
    </div>
  </section>
  </section>

  <div className="table-responsive rounded-2 r-card bg-white">
    <InstructorsTable/>
  </div>
 
    </>
  );
};

export default CampusCoordinatorInstructors;
