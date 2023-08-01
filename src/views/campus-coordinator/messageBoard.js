import React, { useState, useRef, useEffect } from "react";

const CampusCoordinatorMessageBoard = () => {
  return (
    <>
      <div className="container my-5 mt-3">
  <div className="row">
    <div className="col-xl-4 col-lg-5 col-md-5 col-12 mb-4">
      <div
        className="rounded-2 p-4 bg-blue-800 mb-4 text-center text-white-100 click"
        data-bs-toggle="modal"
        data-bs-target="#announcementModal"
      >
        New Announcement
      </div>
      <div className="r-card bg-white">
        <p className="r-card-title px-5 pt-4">Announcement</p>
        <hr />
       
      </div>
    </div>
    <div className="col-xl-8 col-lg-7 col-md-7 col-12 mb-4">
      <div className="r-card bg-white h-100 px-5 py-4">
     
        <div>
          <div className="r-card-title">
            Taster Session on Believer’s Authority 1
          </div>
          <div className="text-xs">
            <span>07/01/2022</span>
            <span className="text-blue-800"
              ><span className="iconify" data-icon="ci:dot-02-s"></span
            ></span>
            <span>5:00PM</span>
          </div>
        </div>
        <hr />
        <div className="message-container">
          <p>
            This is to inform you that there will be a Taster Session on Christ
            the Healer at Abuja Campus from 07 08 January 2022 at the RBTC HQ in
            Abuja. Please invite others, Come with expectations to learn of all
            that Christ did for us through His life, death and ressurection.
          </p>

          <p>
            This session is opne to the public. We encourage our students and
            alumni to invite their friends and families to participate in this
            session which is free.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
<app-new-announcement></app-new-announcement>

    </>
  );
};

export default CampusCoordinatorMessageBoard;
