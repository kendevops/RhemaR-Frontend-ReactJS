import React, { useState, useRef, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { PaystackButton } from "react-paystack";

import { StarIcon } from '@heroicons/react/solid';
import { GridCard } from './gridcard';

    const TuitionAndClearancePage = () => {

    const Paystack = () => {
    const publicKey = "pk_test_f00e1201fd644cf609e1be7954e8bdf299d1be5b"
    const amount = 1000000
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
  
    const componentProps = {
      email,
      amount,
      metadata: {
        name,
        phone,
      },
      publicKey,
      text: "Buy Now",
      onSuccess: () => {
        setEmail("")
        setName("")
        setPhone("")
      },
      onClose: () => alert("Wait! You need this oil, don't go!!!!"),
    }
  }

  return (
    
    <>
    <div style={{}}>
        <Card
          style={{
            width: 300,
            backgroundColor: "grey",
          }}
        >
          <CardContent>
            btnColor="green"
            [title]="'Application Fee'"
            [number]="'N10,000'"
          </CardContent>
          <CardActions>
            <Button size="medium">Paid</Button>
          </CardActions>
        </Card>
      </div>
    
      <div className="col-lg-4 col-sm-6 col-12 mb-4">
        <div className="app-tuition-summary-card">
          btnColor="green"
          [title]="'Application Fee'"
          [number]="'N10,000'"
          btnName="Paid"
        </div>
      </div>
      <div className="col-lg-4 col-sm-6 col-12 mb-4">
        <div className="app-tuition-summary-card">
          btnColor="green"
          btnName="Paid"
          [title]="'Initial Payment'"
          [number]="'N30,000'"
        </div>
      </div>
      <div className="col-lg-4 col-sm-6 col-12 mb-4">
        <div classname="app-tuition-summary-card">
          btnColor="blue"
          [title]="'Monthly Installment'"
          [number]="'N10,000'"
          [progress]="true"
          (btnAction)="openModal()"
          btnName="Make Payment"
        </div>
      </div>
      <section>
        <div>
            <div>
                <input type = "text" placeholder =  "Enter Your Search Key"/>
                <button>Search</button>
            </div>
        </div>
        <ul className="nav nav-pills mb-5" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-FeeBreakdown-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-FeeBreakdown"
              type="button"
              role="tab"
              aria-controls="pills-FeeBreakdown"
              aria-selected="true"
            >
              Fee Breakdown
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-PaymentHistory-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-PaymentHistory"
              type="button"
              role="tab"
              aria-controls="pills-PaymentHistory"
              aria-selected="false"
            >
              Payment History
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-FeeBreakdown"
            role="tabpanel"
            aria-labelledby="pills-FeeBreakdown-tab"
          >
            <div className="table-responsive rounded-2 border">
              <table className="table caption-top text-nowrap">
                <div ng-container>
                  <thead className="bg-blue-800">
                    <tr>
                      <th>Fee</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                </div>
                <tbody>
                  <div g-container>
                    {/**<tr let user of [1, 2, 3, 4]"></ndiv>**/}
                    <tr>
                      <td>Level 1 Application Fee</td>
                      <td>N10,000</td>
                      <td>23/02/2022</td>
                      <td>Completed</td>
                    </tr>
                  </div>
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="pills-PaymentHistory"
            role="tabpanel"
            aria-labelledby="pills-PaymentHistory-tab"
          >
            <div className="table-responsive rounded-2 border">
              <table className="table caption-top text-nowrap">
                <div ng-container>
                  <thead className="bg-blue-800">
                    <tr>
                      <th>Payment</th>
                      <th>Transaction ID</th>
                      <th>Amount Paid</th>
                      <th>Payment Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                </div>
                <tbody>
                  <div ng-container>
                    {/**<tr *ngFor="let user of [1, 2, 3, 4]">**/}
                    <tr>
                      <td>Level 1 Application Fee</td>
                      <td>CH03508885</td>
                      <td>N10,000</td>
                      <td>23/02/2022</td>
                      <td className="click">
                        <u className="me-2">Download Receipt</u>
                        <span>
                          className="iconify"
                          data-icon="ant-design:cloud-download-outlined"
                        </span>
                      </td>
                    </tr>
                  </div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    
    <div className openAccountModal>
      data-bs-toggle="modal"
      data-bs-target="#accountModal"
    </div>

    </>
    )
  }

export default TuitionAndClearancePage;
