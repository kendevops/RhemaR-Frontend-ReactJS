import { Spinner } from "reactstrap";
import useCampusLevel from "../../../hooks/queries/classes/useCampusLevel";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import useAllCampuses from "../../../hooks/queries/classes/useAllCampuses";
import parseRole from "../../../utils/parseRole";

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

export default function CampusesTable2({
  setShowCampusDetail,
  toggle,
}: CampusesTableProps) {
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
      render: (data) => (
        <p>
          {data?.levels?.map(
            (r: any, i: number) =>
              `${parseRole(r?.name)}${
                i === data?.levels?.length - 1 ? "" : ", "
              }`
          )}
        </p>
      ),
    },
    {
      key: "Campus Cordinator",
      title: "Campus Cordinator",
      render: (data) => <p>{"Demo Names"}</p>,
    },
    {
      key: "Address",
      title: "Address",
      render: (data) => (
        <p>
          {"To make the table scrollable in the x-direction, you can add the"}
        </p>
      ),
    },
    {
      key: "View",
      title: "View",
      render: (data) => (
        <u
          onClick={() => {
            toggle();
            setShowCampusDetail(true);
          }}
          className="text-info click"
          data-bs-toggle="modal"
          data-bs-target="#studentModal"
        >
          View
        </u>
      ),
    },

    {
      key: "Action",
      title: "Action",
      render: (data) => {
        console.log(data);

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
