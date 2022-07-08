import React, { useState, useRef, useEffect } from "react";

const CampusCoordinatorInstructors = () => {
  return (
    <>
    <p>TODO: Search bar</p>
    <section className="container my-5">
    <section className="row">
    <div className="col-xl-8 col-lg-9 col-md-11 col-12 mx-auto">
      <app-searchbar
        placeHolder="Search"
        
      ></app-searchbar>
    </div>
  </section>
  </section>

  <div className="table-responsive rounded-2 r-card bg-white">
    <table className="table caption-top text-nowrap">
        <thead className="bg-blue-800">
          <tr>
            <th>Instructor Name</th>
            <th>Courses</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>Rev. Toks Adejuwon</td>
            <td>Pneumatology 1</td>
            <td>63%</td>
            <td>Send Message</td>
          </tr>
          <tr>
            <td>Rev. Toks Adejuwon</td>
            <td>Pneumatology 1</td>
            <td>63%</td>
            <td>Send Message</td>
          </tr>
          <tr>
            <td>Rev. Toks Adejuwon</td>
            <td>Pneumatology 1</td>
            <td>63%</td>
            <td>Send Message</td>
          </tr>
          <tr>
            <td>Rev. Toks Adejuwon</td>
            <td>Pneumatology 1</td>
            <td>63%</td>
            <td>Send Message</td>
          </tr>
          <tr>
            <td>Rev. Toks Adejuwon</td>
            <td>Pneumatology 1</td>
            <td>63%</td>
            <td>Send Message</td>
          </tr>
          <tr>
            <td>Rev. Toks Adejuwon</td>
            <td>Pneumatology 1</td>
            <td>63%</td>
            <td>Send Message</td>
          </tr>
      </tbody>
    </table>
  </div>
 
    </>
  );
};

export default CampusCoordinatorInstructors;
