import React, { useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { Spinner } from "reactstrap";
import typography from "../../assets/img/Typography";
import Tab from "../../components/atoms/Tab";
import SearchBar from "../../components/general/searchBar";
import Table from "../../components/general/table/Table";
import MakePaymentModal from "../../components/modals/MakePaymentModal";
import CardWrapper from "../../components/students/CardWrapper";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import usePaymentHistory from "../../hooks/queries/users/usePaymentHistory";
import useToggle from "../../utility/hooks/useToggle";
import downloadFile from "../../utils/downloadFile";

const tabs = ["Fee Breakdown", "Payment History"];

const TuitionAndClearancePage = () => {
  const [isOpen, toggle] = useToggle();
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  let columns = [];
  let data = [];

  const { data: userData, isLoading } = useCurrentUser();
  const applications = userData?.applications;
  const application = applications?.length ? applications[0] : undefined;

  const dash = [
    {
      title: "Application Fee",
      ...application?.feePayment,
    },
    {
      title: "Initial Payment",
      ...application?.initialPayment,
    },
    {
      title: "Monthly Installment",
      installments: application?.installments,
      amount: 80000,
      paidAt: application?.installments?.length === 8,
    },
  ];

  const feeData = application?.installments;
  const { data: paymentsData, isLoading: paymentsDataLoading } =
    usePaymentHistory();

  // Conditionals
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
      {
        title: "Payment",
        key: "Payment",
        render: (d) => <p>{d?.payment ?? "Level 1 Fees"}</p>,
      },
      {
        title: "Transaction ID",
        key: "Transaction ID",
        render: (d) => <p>{d?.accessCode}</p>,
      },
      {
        title: "Amount Paid",
        key: "Amount Paid",
        render: (d) => <p>N{d?.amount}</p>,
      },
      {
        title: "Payment Date",
        key: "Payment Date",
        render: (d) => <p>{new Date(d?.createdAt)?.toDateString()}</p>,
      },
      {
        title: "Action",
        key: "Action",
        render: (d) => {
          const attributes = downloadFile(
            d?.paymentUrl,
            `Payment Receipt - ${new Date(d?.createdAt)?.toLocaleString()}`
          );
          return (
            <>
              {d?.status === "success" ? (
                <u>
                  <a {...attributes}>Download Receipt</a>
                </u>
              ) : (
                <p>{d?.status}</p>
              )}
            </>
          );
        },
      },
    ];
    data = paymentsData?.nodes;
  }

  return (
    <>
      {/* Payment Modal */}
      <MakePaymentModal amount={10000} {...{ isOpen, toggle }} />
      {/* Dash Cards */}
      <section className="mb-5 d-flex gap-5 justify-content-between">
        {application &&
          dash?.map((d) => {
            return (
              <CardWrapper className="w-100" key={d?.title}>
                <div className="my-3">
                  <p className="d-flex justify-content-between">
                    {d?.title}
                    {d?.title === "Monthly Installment" && (
                      <span>{`${d?.installments?.length}/8`}</span>
                    )}
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

                {d?.paidAt ? (
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
                    onClick={() =>
                      d?.paymentUrl ? window?.open(d?.paymentUrl) : toggle()
                    }
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
          {(isLoading || paymentsDataLoading) && <Spinner />}
          <Table columns={columns} data={data} />
        </Table.Wrapper>
      </CardWrapper>
    </>
  );
};

export default TuitionAndClearancePage;
