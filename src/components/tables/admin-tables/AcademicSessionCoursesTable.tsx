import { Link } from "react-router-dom";
import useAllCourses from "../../../hooks/queries/classes/useAllCourses";
import Table, { TableColumns } from "../../general/table/Table";
import { Spinner } from "reactstrap";
import useAcademicSessions from "../../../hooks/queries/classes/useAcademicSessions";

export default function AcademicSessionCoursesTable() {
  const { data: sessionsData, isLoading, refetch } = useAcademicSessions();
  const data = sessionsData?.nodes;

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "Session Course",
      title: "Course",
      render: (data) => <p style={{ width: "300px" }}>{"Course Nmae"}</p>,
    },
    {
      key: "Level",
      title: "Level",
      render: (data) => <p>{"LEVEL_1"}</p>,
    },
    {
      key: "Campus",
      title: "Option",
      render: (data) => <p>{"Abuja"}</p>,
    },

    {
      key: "Start Date",
      title: "Start Date",
      render: (data) => <p>{new Date(data?.startDate).toDateString()}</p>,
    },
    {
      key: "End Date",
      title: "End Date",
      render: (data) => <p>{new Date(data?.endDate).toDateString()}</p>,
    },

    {
      key: "Instructor",
      title: "Instructor",
      render: (data) => <p>{"Instructor Name"}</p>,
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
