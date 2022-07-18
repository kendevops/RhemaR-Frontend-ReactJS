import React, { useState, useRef, useEffect } from "react";

const LiveEvent = () => {
  return (
    <>
    <div class="container mb-5 mt-3">
    <p class="d-flex align-items-center mb-5 click">
        <span class="me-3"><img src="assets/img/back.svg" alt="" /> </span>
        <span class="text-lg"> Go back </span>
    </p>
        <app-live-event-view></app-live-event-view>
    </div>

    </>
  );
};

export default LiveEvent;
