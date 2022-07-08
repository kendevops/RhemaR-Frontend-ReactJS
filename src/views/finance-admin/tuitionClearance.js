import React, { useState, useRef, useEffect } from "react";

const FinanceAdminTuitionClearance = () => {
  return (
    <>
            <div className="container my-5">
                <div className="row mb-5">
                    <div className="col-lg-4 col-sm-6 col-12 mb-4">
                  
                    </div>
                    <div className="col-lg-4 col-sm-6 col-12 mb-4">
                  
                    </div>
                    <div className="col-lg-4 col-sm-6 col-12 mb-4">
                  
                    </div>
                </div>
                <div>
        

                    <div className="bg-white r-card table-responsive rounded-2 border">
                    <table className="table caption-top text-nowrap">
                        <div>
                        <thead className="bg-blue-800">
                            <tr>
                            <th>Student Name</th>
                            <th>Fee</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                        </div>
                        <tbody>
                        <div>
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
                            </div>
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
                    </div>
                </div>
                </div>
    </>
  );
};

export default FinanceAdminTuitionClearance;
