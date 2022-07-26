import React from "react";

const TutionClearanceTable = ()=>{
    return(
        <table className="table caption-top text-nowrap">
        <React.Fragment>
          <thead className="bg-blue-800">
            <tr>
              <th>Student Name</th>
              <th>Fee</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
        </React.Fragment>
        <tbody>
            <tr>
              <td>
                <div className="click d-flex align-items-center">
                  <span className="me-2">
                    <span
                      className="iconify"
                      data-icon="fontisto:angle-down"
                    ></span>
                  </span>
                  <span> Ali Joshua </span>
                </div>
              </td>
              <td>--</td>
              <td>--</td>
              <td>
                <span className="text-success me-2">
                  <span className="iconify" data-icon="ci:dot-04-l"></span> </span
                >Ongoing (4/8)
              </td>
            </tr>
              <tr>
                <td>Ali Joshua</td>
                <td>Level 1 Application Fee</td>
                <td>23/02/2022</td>
                <td>
                  <span className="text-success me-2">
                    <span className="iconify" data-icon="ci:dot-04-l"></span> </span
                  >Completed
                </td>
              </tr>
        </tbody>
      </table>
    )
}

export default TutionClearanceTable;