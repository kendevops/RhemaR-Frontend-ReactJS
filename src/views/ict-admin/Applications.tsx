import { Spinner } from "reactstrap";
import SearchBar from "../../components/general/searchBar";
import Table from "../../components/general/table/Table";
import useApplications from "../../hooks/queries/applications/useApplications";
import useToggle from "../../utility/hooks/useToggle";

interface ViewApplicationProps {
  data: any;
}

function ViewApplicationModal({ data }: ViewApplicationProps) {
  const [isOpen, toggle] = useToggle();
  return (
    <>
      <u onClick={toggle}>View Application</u>

      {/* Modal */}
    </>
  );
}

export default function Applications() {
  const { data, isLoading } = useApplications();

  return (
    <section>
      {isLoading && <Spinner />}

      <div className="my-4 w-75 mx-auto">
        <SearchBar />
      </div>

      {data && (
        <Table.Wrapper>
          {/* Table */}
          <Table
            data={data?.nodes}
            columns={[
              {
                key: "nationality",
                title: "Nationality",
                render: (d) => <p>{d?.nationality ?? "Nigerian"}</p>,
              },
              {
                key: "state",
                title: "State",
                render: (d) => <p>{d?.address?.state ?? "Not Provided"}</p>,
              },
              {
                key: "status",
                title: "Status",
                render: (d) => <p>{d?.status}</p>,
              },
              {
                key: "initialPayment",
                title: "Initial Payment",
                render: (d) => <p>{d?.initialPayment?.status}</p>,
              },
              {
                key: "feePayment",
                title: "Fee Payment",
                render: (d) => <p>{d?.feePayment?.status}</p>,
              },
              {
                key: "action",
                render: (d) => <ViewApplicationModal data={d} />,
              },
            ]}
          />
        </Table.Wrapper>
      )}
    </section>
  );
}
