import { Link } from "react-router-dom";
import useAllCourses from "../../../hooks/queries/classes/useAllCourses";
import Table from "../../general/table/Table";
import { Spinner } from "reactstrap";

export default function CoursesTable() {
  const { data: coursesData, isLoading } = useAllCourses();
  const data = coursesData?.nodes;

  return (
    <>
      <Table.Wrapper>
        {isLoading && <Spinner />}
        <Table
          {...{
            data,
            columns: [
              {
                key: "Name",
                title: "Name",
                render: (d) => (
                  <u>
                    <Link to={`/ict-admin/course/${d?.id}`}>{d?.title}</Link>
                  </u>
                ),
              },
              {
                key: "Code",
                title: "Code",
                render: (d) => <p>{d?.code}</p>,
              },
              {
                key: "Date Created",
                title: "Date Created",
                render: (d) => <p>{new Date(d?.createdAt)?.toDateString()}</p>,
              },
              {
                key: "Action",
                title: "Action",
                render: (d) => {
                  function handleDelete() {}

                  return (
                    <div className="d-flex gap-4">
                      <u onClick={handleDelete}>Delete</u>
                    </div>
                  );
                },
              },
            ],
          }}
        />
      </Table.Wrapper>
    </>
  );
}
