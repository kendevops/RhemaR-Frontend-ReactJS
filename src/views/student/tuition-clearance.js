import React, { useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import typography from "../../assets/img/Typography";
import Tab from "../../components/atoms/Tab";
import SearchBar from "../../components/general/searchBar";
import Table from "../../components/general/table/Table";
import MakePaymentModal from "../../components/modals/MakePaymentModal";
import CardWrapper from "../../components/students/CardWrapper";
import useToggle from "../../utility/hooks/useToggle";
import downloadFile from "../../utils/downloadFile";

const dashData = [
  {
    title: "Application Fee",
    amount: 10000,
    paid: true,
  },
  {
    title: "Application Fee",
    amount: 30000,
    paid: true,
  },
  {
    title: "Monthly Installment",
    amount: 10000,
    paid: false,
    pendingPayments: 7,
  },
];

const feeData = [
  {
    fee: "Level 1 Application Fee",
    amount: 10000,
    date: new Date(),
    status: "Completed",
  },
  {
    fee: "Level 1 Application Fee",
    amount: 10000,
    date: new Date(),
    status: "Completed",
  },
  {
    fee: "Level 1 Application Fee",
    amount: 10000,
    date: new Date(),
    status: "Completed",
  },
];

const paymentData = [
  {
    payment: "Level 1 Application Fee",
    trxId: "CH03508885",
    amount: 10000,
    date: new Date(),
  },
  {
    payment: "Level 1 Application Fee",
    trxId: "CH03508885",
    amount: 10000,
    date: new Date(),
  },
];

const tabs = ["Fee Breakdown", "Payment History"];

const TuitionAndClearancePage = () => {
  const [isOpen, toggle] = useToggle();
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  let columns = [];
  let data = [];

  if (currentTab === tabs[0]) {
    columns = [
      {
        title: "Fee",
        key: "Fee",
        render: (d) => {
          return <p>{d?.fee}</p>;
        },
      },
      {
        title: "Amount",
        key: "Amount",
        render: (d) => {
          return <p>N{d?.amount}</p>;
        },
      },
      {
        title: "Due Date",
        key: "Due Date",
        render: (d) => {
          return <p>{new Date(d?.date).toDateString()}</p>;
        },
      },
      {
        title: "Status",
        key: "Status",
        render: (d) => {
          return <p>{d?.status}</p>;
        },
      },
    ];
    data = feeData;
  } else if (currentTab === tabs[1]) {
    columns = [
      { title: "Payment", key: "Payment", render: (d) => <p>{d?.payment}</p> },
      {
        title: "Transaction ID",
        key: "Transaction ID",
        render: (d) => <p>{d?.trxId}</p>,
      },
      {
        title: "Amount Paid",
        key: "Amount Paid",
        render: (d) => <p>N{d?.amount}</p>,
      },
      {
        title: "Payment Date",
        key: "Payment Date",
        render: (d) => <p>{new Date(d?.date)?.toDateString()}</p>,
      },
      {
        title: "Action",
        key: "Action",
        render: (d) => {
          const attributes = downloadFile(
            "https://google.com/",
            `Payment Receipt - ${d?.trxId}`
          );
          return (
            <u>
              <a {...attributes}>Download Receipt</a>
            </u>
          );
        },
      },
    ];
    data = paymentData;
  }

  return (
    <>
      {/* Payment Modal */}
      <MakePaymentModal amount={10000} {...{ isOpen, toggle }} />
      {/* Dash Cards */}
      <section className="mb-5 d-flex gap-5 justify-content-between">
        {dashData?.map((d) => {
          return (
            <CardWrapper className="w-100" key={d?.title}>
              <div className="my-3">
                <p className="d-flex justify-content-between">
                  {d?.title}
                  <span>
                    {!!d?.pendingPayments && `${8 - d?.pendingPayments}/8`}
                  </span>
                </p>
                <h2
                  style={{
                    fontSize: typography.h2,
                    fontWeight: "bold",
                  }}
                >
                  N{d?.amount}
                </h2>
              </div>

              {d?.paid ? (
                <div
                  style={{
                    background: "rgba(92, 153, 61, 0.1)",
                    color: "#5C993D",
                  }}
                  className="p-3 rounded-3 text-center w-100  bg-success-200"
                >
                  Paid
                </div>
              ) : (
                <button
                  onClick={toggle}
                  className="btn btn-blue-800 btn-lg w-100"
                >
                  Make Payment
                </button>
              )}
            </CardWrapper>
          );
        })}
      </section>

      {/* Table */}
      <CardWrapper>
        <div className="text-center my-5">
          <SearchBar />
        </div>

        <Tab.Wrapper>
          {tabs.map((c, i) => {
            return (
              <Tab
                onClick={() => setTab(i)}
                tabColor="#289483"
                isSelected={currentTab === c}
                key={c}
              >
                {c}
              </Tab>
            );
          })}
        </Tab.Wrapper>

        {/* Tables */}
        <Table.Wrapper>
          <Table columns={columns} data={data} />
        </Table.Wrapper>
      </CardWrapper>
    </>
  );
};

export default TuitionAndClearancePage;
