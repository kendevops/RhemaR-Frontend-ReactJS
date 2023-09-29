import React, { useState, useRef, useEffect } from "react";

const CampusCoordinatorProfile = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-xl-7 col-lg-8 col-md-10 col-sm-12 mx-auto">
            <div className="r-card bg-white">
              <app-profile-container></app-profile-container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampusCoordinatorProfile;
