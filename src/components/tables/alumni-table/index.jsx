import React, { useState, useRef, useEffect } from "react";

const AlumniTable = () => {
  return (
    <table className="table caption-top text-nowrap bg-blue-800">
      <thead className="bg-blue-800">
        <tr className="bg-blue-800">
          <th className="bg-blue-800">Name</th>
          <th className="bg-blue-800">Phone Number</th>
          <th className="bg-blue-800">Email</th>
          <th className="bg-blue-800">Graduation Year</th>
          <th className="bg-blue-800">Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Adeola Joseph</td>
          <td>08059884595</td>
          <td>adeolajoseph@gmail.com</td>
          <td>Feb. 2021</td>
          <td>Male</td>
        </tr>
        <tr>
          <td>Adeola Joseph</td>
          <td>08059884595</td>
          <td>adeolajoseph@gmail.com</td>
          <td>Feb. 2021</td>
          <td>Male</td>
        </tr>
        <tr>
          <td>Adeola Joseph</td>
          <td>08059884595</td>
          <td>adeolajoseph@gmail.com</td>
          <td>Feb. 2021</td>
          <td>Male</td>
        </tr>
        <tr>
          <td>Adeola Joseph</td>
          <td>08059884595</td>
          <td>adeolajoseph@gmail.com</td>
          <td>Feb. 2021</td>
          <td>Male</td>
        </tr>
        <tr>
          <td>Adeola Joseph</td>
          <td>08059884595</td>
          <td>adeolajoseph@gmail.com</td>
          <td>Feb. 2021</td>
          <td>Male</td>
        </tr>
        <tr>
          <td>Adeola Joseph</td>
          <td>08059884595</td>
          <td>adeolajoseph@gmail.com</td>
          <td>Feb. 2021</td>
          <td>Male</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AlumniTable;
