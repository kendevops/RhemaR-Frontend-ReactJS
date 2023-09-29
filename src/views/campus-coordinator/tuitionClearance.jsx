import React, { useState, useRef, useEffect } from "react";
import TutionClearanceTable from "../../components/tables/tution-clearance-table";
import SearchBar from "../../components/general/searchBar";

const CampusCoordinatorTuitionAndClearance = () => {
  return (
    <>
      <div style={{ width: "70%" }}>
        <SearchBar />
      </div>
      <div className="container my-5"></div>
      <section className="row mb-5">
        <div className="col-lg-4 col-sm-6 col-12 mb-4">
          <app-tuition-summary-card>
            <p>Card 1 </p>
          </app-tuition-summary-card>
        </div>
        <div className="col-lg-4 col-sm-6 col-12 mb-4">
          <app-tuition-summary-card>
            <p>Card 2 </p>
          </app-tuition-summary-card>
        </div>
        <div className="col-lg-4 col-sm-6 col-12 mb-4">
          <app-tuition-summary-card>
            <p>Card 3 </p>
          </app-tuition-summary-card>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="col-xl-8 col-lg-9 col-md-11 col-12 mx-auto"></div>
        </div>
        <div className="bg-white r-card table-responsive rounded-2 border">
          <TutionClearanceTable />
        </div>
      </section>
    </>
  );
};

export default CampusCoordinatorTuitionAndClearance;
