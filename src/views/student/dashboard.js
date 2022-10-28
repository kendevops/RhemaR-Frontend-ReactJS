import React, { useState, useRef, useEffect } from "react";

const StudentDashboardPage = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          {/* Semester Progress */}
          <div className="bg-white r-card px-5 py-4 mb-4 bg-cap">
            <p className="r-card-title">Semester Progress</p>
            <div className="d-flex align-items-center">
              <div className="progress">
                <div
                  className="progress-bar bg-gold-600"
                  role="progressbar"
                  style={{ width: "43%" }}
                  aria-valuenow="43"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="font-bold text-2xl ms-4">43%</div>
            </div>
          </div>

          {/* Upcmonign lecture */}
          <div className="bg-white r-card px-5 py-4">
            <p className="r-card-title">Upcoming Lecture</p>
            <hr />
            <div className="d-flex align-items-center justify-content-between mt-4">
              <div className="d-flex align-items-center">
                <div className="bg-blue-200 p-3 me-4 rounded-2 text-center">
                  <div className="text-lg font-medium lh-1 mb-1">10 - 12</div>
                  <div className="text-xxl font-bold lh-1">Oct</div>
                </div>
                <div>
                  <div className="text-xl font-bold">Pneumatology 1</div>
                  <div className="text-sm">
                    <span className="me-1">
                      <span
                        className="iconify"
                        data-icon="bi:clock-fill"
                      ></span>
                    </span>
                    <span> 8:00AM - 9:00PM </span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-200 py-3 px-4 rounded-2 ms-4 text-lg lh-1 click">
                <span className="iconify" data-icon="fa:angle-right"></span>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          <div className="bg-white r-card px-5 py-4 mb-4 payment-card">
            <div>
              <div>
                <div
                  className="rounded-progressbar"
                  role="progressbar"
                  aria-valuenow="65"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ "--value": "65" }}
                ></div>
              </div>
              <div className="text-lg">Payment Completion</div>
            </div>
            <div className="line"></div>
            <div>
              <p className="text-xl">Next Payment</p>
              <p className="next-payment">N10,000</p>
              <p className="mb-0 text-lg click">
                <u>Make Payment</u>
              </p>
            </div>
          </div>

          {/*  */}
          <div className="bg-white r-card text-center p-3 click">
            View Fee Breakdown
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-12 mb-4">
          <app-course-schedule></app-course-schedule>
        </div>

        {/*  */}
        <div className="col-lg-6 col-md-6 col-12 mb-4">
          <div className="bg-white r-card px-5 py-4 mb-4">
            <div className="bg-blue-200 rounded-2 py-2 px-4 d-flex justify-content-between align-items-center mt-3 mb-4">
              <div className="r-card-title me-3">Upcoming Events</div>
              <div>
                <img src="assets/img/upcoming-event.svg" alt="" />
              </div>
            </div>

            {/* Event */}
            <div className="border p-4 rounded-2 mb-3">
              <div className="d-flex align-items-center">
                <div className="bg-blue-200 p-3 me-4 rounded-2 text-center">
                  <div className="text-lg font-medium lh-1 mb-1">10 - 12</div>
                  <div className="text-xxl font-bold lh-1">Oct</div>
                </div>
                <div className="text-text-body">
                  <div className="text-xl">Christ the Healer</div>
                  <div className="text-sm">
                    <span className="me-1">
                      <span
                        className="iconify"
                        data-icon="bi:clock-fill"
                      ></span>
                    </span>
                    <span> 9:00AM - 5:00PM </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-xl click my-3">
              <u> Show all</u>
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default StudentDashboardPage;
