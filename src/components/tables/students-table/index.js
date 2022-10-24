import React from "react";

const StudentsTable = () => {
  return (
    <table className="table caption-top text-nowrap">
      <thead className="bg-blue-800">
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Admission Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Adeola Joseph</td>
          <td>08059884595</td>
          <td>adeolajoseph@gmail.com</td>
          <td>Male</td>
          <td className="d-flex align-items-center">
            <span className="me-2 text-error">
              <span className="iconify" data-icon="ci:dot-04-l"></span>
            </span>
            <span>Pending</span>
          </td>
          <td>
            <u
              className="text-info click"
              data-bs-toggle="modal"
              data-bs-target="#studentModal"
            >
              View
            </u>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default StudentsTable;
