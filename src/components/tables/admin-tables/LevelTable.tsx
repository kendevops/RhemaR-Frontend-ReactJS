import { Spinner } from "reactstrap";
import useCampusLevel from "../../../hooks/queries/classes/useCampusLevel";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";

type EditLevelProps = {
  data: any;
};

function EditLevel({ data }: EditLevelProps) {
  const [isEditing, toggleEditing] = useToggle();

  return (
    <>
      <p onClick={toggleEditing} style={{ cursor: "pointer" }}>
        Edit
      </p>
    </>
  );
}

export default function LevelTable() {
  const { data: levelData, isLoading } = useCampusLevel();
  const data = levelData?.nodes;

  const levelData2 = [1, 2, 3];

  const levelTColumns: TableColumns<any>[] = [
    { key: "Level", title: "Level", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "No. of Campuses",
      title: "No. of Campuses",
      render: (data) => <p>{data + 20}</p>,
    },
    {
      key: "No. of Courses",
      title: "No. of Courses",
      render: (data) => <p>{data + 10}</p>,
    },

    {
      key: "Action",
      title: "Action",
      render: (data) => {
        function handleDelete() {}
        return (
          <div className="d-flex gap-3">
            <p
              className=""
              style={{ color: "red", cursor: "pointer" }}
              onClick={handleDelete}
            >
              Delete
            </p>
            {/* <p style={{ cursor: "pointer" }}>Edit</p> */}
            <EditLevel data={data} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table.Wrapper>
        {levelData2 && <Table columns={levelTColumns} data={levelData2} />}
      </Table.Wrapper>
    </>
  );
}
