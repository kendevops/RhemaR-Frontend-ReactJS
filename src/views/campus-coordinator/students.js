import React, { useState, useRef, useEffect } from "react";

const CampusCoordinatorStudents = () => {
  return (

    <>
    <div className="container my-5">
    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <li className="nav-item" role="presentation">
      <button
        className="nav-link active"
        id="pills-ProspectiveStudents-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-ProspectiveStudents"
        type="button"
        role="tab"
        aria-controls="pills-ProspectiveStudents"
        aria-selected="true"
      >
        Prospective Students
      </button>
    </li>
    <li className="nav-item" role="presentation">
      <button
        className="nav-link"
        id="pills-New/ReturningStudents-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-New/ReturningStudents"
        type="button"
        role="tab"
        aria-controls="pills-New/ReturningStudents"
        aria-selected="false"
      >
        New/Returning Students
      </button>
    </li>
  </ul>
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
      <table className="table caption-top text-nowrap">
          <thead className="bg-blue-800">
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Admission Status</th>
              <th>Action</th>
            </tr>
          </thead>
        <tbody>
            <tr>
              <td>Adeola Joseph</td>
              <td>08059884595</td>
              <td>adeolajoseph@gmail.com</td>
              <td>Male</td>
              <td className="d-flex align-items-center">
                <span className="me-2 text-error">
                  <span className="iconify" data-icon="ci:dot-04-l"></span>
                </span>
                <span>Pending</span>
              </td>
              <td>
                <u
                  className="text-info click"
                  data-bs-toggle="modal"
                  data-bs-target="#studentModal"
                  >View</u
                >
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
    </>
  );
};

export default CampusCoordinatorStudents;
