import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import Tab from "../../../components/atoms/Tab";
import Table from "../../../components/general/table/Table";
import CardWrapper from "../../../components/students/CardWrapper";
import useCurrentUser from "../../../hooks/queries/users/useCurrentUser";
import usePaymentHistory from "../../../hooks/queries/users/usePaymentHistory";
import downloadFile from "../../../utils/downloadFile";

const tabs = ["Fee Breakdown", "Payment History"];

const TuitionAndClearanceTable = () => {
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  let columns = [];
  let data = [];

  const { data: userData, isLoading } = useCurrentUser();
  const applications = userData?.applications;

  // console.log(applications);
  const application = applications?.length ? applications[0] : undefined;

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
      {/* Table */}
      <CardWrapper>
        <Tab.Wrapper>
          {tabs.map((c, i) => {
            return (
              <Tab
                onClick={() => setTab(i)}
                tabColor="#203864"
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

export default TuitionAndClearanceTable;
