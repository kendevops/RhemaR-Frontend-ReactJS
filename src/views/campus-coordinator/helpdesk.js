import React, { useState, useRef, useEffect } from "react";

const CampusCoordinatorHelpDesk = () => {
  return (
    <>
     <div className="container my-5">

  <div className="mb-5">
    <app-searchbar
      placeHolder="Search FAQ Database"></app-searchbar>
  </div>
  <div className="bg-white r-card">
  </div>
</div>
<div
  data-bs-toggle="modal"
  data-bs-target="#addFaqModal"
></div>

<app-add-faq></app-add-faq>

    </>
  );
};

export default CampusCoordinatorHelpDesk;
