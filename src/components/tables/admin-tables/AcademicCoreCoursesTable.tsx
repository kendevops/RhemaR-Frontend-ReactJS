import { Link } from "react-router-dom";
import useAllCourses from "../../../hooks/queries/classes/useAllCourses";
import Table, { TableColumns } from "../../general/table/Table";
import { Spinner } from "reactstrap";

export default function AcademicCoreCoursesTable() {
  const { data: coursesData, isLoading } = useAllCourses();
  const data = coursesData?.nodes;

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i}</p> },
    {
      key: "Course",
      title: "Course",
      render: (data) => <p style={{ width: "300px" }}>{"Course Nmae"}</p>,
    },
    {
      key: "Level",
      title: "Level",
      render: (data) => <p>{"LEVEL_1"}</p>,
    },
    {
      key: "Option",
      title: "Option",
      render: (data) => <p>{"Core"}</p>,
    },

    {
      key: "Hour",
      title: "Hour",
      render: (data) => <p>{12}</p>,
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
            <p onClick={() => {}} style={{ cursor: "pointer" }}>
              Edit
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table.Wrapper>
        {isLoading && <Spinner />}
        <Table columns={columns} data={data} />
      </Table.Wrapper>
    </>
  );
}
