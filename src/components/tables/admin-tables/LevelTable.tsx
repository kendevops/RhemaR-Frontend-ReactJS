import { Spinner } from "reactstrap";
import useCampusLevel from "../../../hooks/queries/classes/useCampusLevel";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";

type EditLevelProps = {
  data: any;
};

export default function LevelTable() {
  const { data: levelData, isLoading } = useCampusLevel();

  console.log(levelData);

  // const data = levelData?.nodes;

  const levelTColumns: TableColumns<any>[] = [
    { key: "Level", title: "Level", render: (data, i) => <p>{data.name}</p> },
    {
      key: "No. of Students",
      title: "No. of Students",
      render: (data) => <p>{data._count.students}</p>,
    },
    {
      key: "No. of Campuses",
      title: "No. of Campuses",
      render: (data) => <p>{data._count.campuses}</p>,
    },
    {
      key: "No. of Courses",
      title: "No. of Courses",
      render: (data) => <p>{data._count.courses}</p>,
    },

    {
      key: "No. of Tuitions",
      title: "No. of Tuitions",
      render: (data) => <p>{data._count.tuitions}</p>,
    },
  ];

  return (
    <>
      <Table.Wrapper>
        {levelData && <Table columns={levelTColumns} data={levelData} />}
      </Table.Wrapper>
    </>
  );
}
