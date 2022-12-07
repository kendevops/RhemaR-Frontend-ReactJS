import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import typography from "../../assets/img/Typography";
import Table from "../../components/general/table/Table";
import ViewReceiptModal from "../../components/modals/ViewReceiptModal";
import BackButton from "../../components/molecules/BackButton";
import useToggle from "../../utility/hooks/useToggle";

interface ViewReceiptProps {
  name: string;
}

function ViewReceipt({ name }: ViewReceiptProps) {
  const [isOpen, toggle] = useToggle();

  const data = {
    amount: 10000,
    type: "Bank Deposit",
    date: new Date(),
    time: new Date(),
    sender: name,
    status: "Successful",
  };

  return (
    <div>
      <u onClick={toggle}>View Receipt</u>
      <ViewReceiptModal {...{ isOpen, data, toggle }} />
    </div>
  );
}

export default function Tuition() {
  const history = useHistory();
  const params = useParams<{
    id: string;
  }>();

  useEffect(() => {
    if (!params?.id) {
      history.replace("/");
    }
  }, [params?.id, history]);

  //find payment data for the student
  const data = [
    { fee: "Level 1 Application", dueDate: new Date(), status: "Completed" },
    { fee: "Level 1 Application", dueDate: new Date(), status: "Completed" },
    { fee: "Level 1 Application", dueDate: new Date(), status: "Completed" },
  ];

  return (
    <section>
      <div className="px-4 my-5">
        <BackButton prevUrl={"/ict-admin/tuition-clearance"} />
        <h2 style={{ fontSize: typography.h2 }} className="font-bold mt-3">
          {params?.id}
        </h2>
      </div>

      {/* Table */}
      <Table.Wrapper>
        <Table
          data={data}
          columns={[
            {
              key: "Fee",
              title: "Fee",
              render: (d) => {
                return <p>{d?.fee}</p>;
              },
            },
            {
              key: "Due Date",
              title: "Due Date",
              render: (d) => {
                return <p>{new Date(d?.dueDate)?.toDateString()}</p>;
              },
            },
            {
              key: "Status",
              title: "Status",
              render: (d) => {
                return <p>{d?.status}</p>;
              },
            },
            {
              key: "Action",
              render: (d) => {
                return <ViewReceipt name={params?.id} />;
              },
            },
          ]}
        />
      </Table.Wrapper>
    </section>
  );
}
