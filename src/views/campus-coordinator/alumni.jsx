import React, { useState, useRef, useEffect } from "react";
import AlumniTable from "../../components/tables/alumni-table/index";
import SearchBar from "../../components/general/searchBar";

const CampusCoordinatorAlumni = () => {
  return (
    <>
      <div style={{ width: "70%" }}>
        <SearchBar />
      </div>
      <section className="container">
        <section className="row">
          <div className="col-xl-8 col-lg-9 col-md-11 col-12 mx-auto"></div>
        </section>

        <section className="table-responsive rounded-2 r-card my-5 ">
          <AlumniTable />
        </section>
      </section>
    </>
  );
};

export default CampusCoordinatorAlumni;
