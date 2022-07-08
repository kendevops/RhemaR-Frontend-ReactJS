import React, { useState, useRef, useEffect } from "react";

const CampusCoordinatorTuitionAndClearance = () => {
  return (
    <>
    <p>TODO: Cards and Search Bar</p>

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
      <div className="col-xl-8 col-lg-9 col-md-11 col-12 mx-auto">
        
      </div>
    </div>
    <div className="bg-white r-card table-responsive rounded-2 border">
      <table className="table caption-top text-nowrap">
        <React.Fragment>
          <thead className="bg-blue-800">
            <tr>
              <th>Student Name</th>
              <th>Fee</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
        </React.Fragment>
        <tbody>
            <tr>
              <td>
                <div className="click d-flex align-items-center">
                  <span className="me-2">
                    <span
                      className="iconify"
                      data-icon="fontisto:angle-down"
                    ></span>
                  </span>
                  <span> Ali Joshua </span>
                </div>
              </td>
              <td>--</td>
              <td>--</td>
              <td>
                <span className="text-success me-2">
                  <span className="iconify" data-icon="ci:dot-04-l"></span> </span
                >Ongoing (4/8)
              </td>
            </tr>
              <tr>
                <td>Ali Joshua</td>
                <td>Level 1 Application Fee</td>
                <td>23/02/2022</td>
                <td>
                  <span className="text-success me-2">
                    <span className="iconify" data-icon="ci:dot-04-l"></span> </span
                  >Completed
                </td>
              </tr>
        </tbody>
      </table>
    </div>
  </section>

    </>
  );
};

export default CampusCoordinatorTuitionAndClearance;
