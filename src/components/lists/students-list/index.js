import React from 'react';

const StudentsList = ()=>{
    return(
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-ProspectiveStudents-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-ProspectiveStudents"
            type="button"
            role="tab"
            aria-controls="pills-ProspectiveStudents"
            aria-selected="true"
          >
            Prospective Students
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-New/ReturningStudents-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-New/ReturningStudents"
            type="button"
            role="tab"
            aria-controls="pills-New/ReturningStudents"
            aria-selected="false"
          >
            New/Returning Students
          </button>
        </li>
      </ul>
    )
}

export default StudentsList;