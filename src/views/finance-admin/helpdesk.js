import React, { useState, useRef, useEffect } from "react";

const FinanceAdminHelpdesk = () => {
  return (
    <>
        <div class="container my-5">
        <app-banner-with-pattern
            title="Frequently Asked Questions"
            img="faq.svg"
        ></app-banner-with-pattern>
        <div class="mb-5">
            <app-searchbar
            placeHolder="Search FAQ Database"
            
            ></app-searchbar>
        </div>
        <div class="bg-white r-card">
            <app-faq-list></app-faq-list>
        </div>
        </div>

    </>
  );
};

export default FinanceAdminHelpdesk;
