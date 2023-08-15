import { Spinner } from "reactstrap";
import useCampusLevel from "../../../hooks/queries/classes/useCampusLevel";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import useAllCampuses from "../../../hooks/queries/classes/useAllCampuses";

type EditCampusProps = {
  data: any;
};

type CampusesTableProps = {
  setShowCampusDetail: any;
  toggle: VoidFunction;
};

function EditCampus({ data }: EditCampusProps) {
  const [isEditing, toggleEditing] = useToggle();

  return (
    <>
      <p onClick={toggleEditing} style={{ cursor: "pointer" }}>
        Edit
      </p>
    </>
  );
}

export default function AcademicTuitionTable() {
  const { isLoading, data } = useAllCampuses();
  const campusesData = data?.nodes;

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "Name",
      title: "Name",
      render: (data) => <p>{data?.name}</p>,
    },
    {
      key: "Level",
      title: "Level",
      render: (data) => <p>{2}</p>,
    },
    {
      key: "Cost",
      title: "Cost",
      render: (data) => <p>{30000}</p>,
    },

    {
      key: "Action",
      title: "Action",
      render: (data) => {
        return (
          <div className="d-flex gap-3">
            <p className="" style={{ color: "red", cursor: "pointer" }}>
              Delete
            </p>
            <EditCampus data={data} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      {isLoading && <Spinner />}
      <Table.Wrapper>
        {<Table columns={columns} data={campusesData} />}
      </Table.Wrapper>
    </>
  );
}
