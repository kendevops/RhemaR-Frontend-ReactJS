import React, { useState, useRef, useEffect } from "react";

const FinanceAdminEvent = () => {
  return (
    <>
            <div className="container my-5">
            <app-banner-with-pattern
                title="Events"
                img="upcoming-event.svg"
            ></app-banner-with-pattern>
            <div className="bg-white r-card p-4">
                <p
                className="r-card-title d-flex justify-content-between align-items-center mb-4"
                >
                <span className="d-flex justify-content-between align-items-center">
                    <span className="me-2">
                    <span className="iconify" data-icon="bx:bxs-calendar-alt"></span>
                    </span>
                    January 2022
                </span>
                <span className="d-flex justify-content-between align-items-center">
                    <span
                    className="bg-blue-800 rounded-2 text-sm py-2 px-3 text-white click me-3"
                    >
                    <span className="iconify" data-icon="fa:angle-left"></span>
                    </span>
                    <span className="bg-blue-800 rounded-2 text-sm py-2 px-3 text-white click">
                    <span className="iconify" data-icon="fa:angle-right"></span>
                    </span>
                </span>
                </p>
                <div className="p-3">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="pills-UpcomingEvents-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-UpcomingEvents"
                        type="button"
                        role="tab"
                        aria-controls="pills-UpcomingEvents"
                        aria-selected="true"
                    >
                        Upcoming Events
                    </button>
                    </li>
                    <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="pills-PastEvents-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-PastEvents"
                        type="button"
                        role="tab"
                        aria-controls="pills-PastEvents"
                        aria-selected="false"
                    >
                        Past Events
                    </button>
                    </li>
                </ul>
                </div>
                <div className="py-4 px-5">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                    <app-event-card></app-event-card>
                    </div>
                </div>
                </div>
            </div>
            </div>

    </>
  );
};

export default FinanceAdminEvent;
