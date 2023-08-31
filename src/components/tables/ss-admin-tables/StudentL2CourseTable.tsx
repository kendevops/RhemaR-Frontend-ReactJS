import { Link } from "react-router-dom";
import useAllCourses from "../../../hooks/queries/classes/useAllCourses";
import Table from "../../general/table/Table";
import { Spinner } from "reactstrap";

export default function StudentL2CoursesTable() {
  const { data: coursesData, isLoading } = useAllCourses();
  const data = coursesData?.nodes;

  console.log(data);

  return (
    <>
      <div className="my-3 d-flex  justify-content-between">
        <div className="d-flex flex-column gap-3 " style={{ fontSize: "20px" }}>
          <div className=" ">L2 Start Date: 28th April 2023</div>
          <div>L2 End Date: 28th April 2023</div>
        </div>

        <div className="d-flex flex-column gap-3 " style={{ fontSize: "20px" }}>
          <div className=" ">Total Course Completed: 15</div>
          <div>Total Course Outstanding: 12</div>
        </div>

        <div className="d-flex flex-column gap-3 " style={{ fontSize: "20px" }}>
          <div className=" ">First Course: 28th April 2023</div>
          <div>Last Course: 28th April 2023</div>
        </div>
      </div>
      <Table.Wrapper>
        {isLoading && <Spinner />}
        <Table
          {...{
            data,
            columns: [
              {
                key: "Serial number",
                title: "S/N",
                render: (data, i) => <p>{i + 1}</p>,
              },

              {
                key: "Course",
                title: "Course",
                render: (d) => <p>{d?.title}</p>,
              },
              {
                key: "Course Date",
                title: "Course Date",
                render: (d) => <p>{new Date(d?.createdAt)?.toDateString()}</p>,
              },

              {
                key: "Session",
                title: "Session",
                render: (d) => <p>{d?.code}</p>,
              },

              {
                key: "Grade",
                title: "Grade",
                render: (d) => <p>{80}</p>,
              },
              {
                key: "Quiz/Assignment",
                title: "Quiz/Assignment",
                render: (d) => <p>{"N/B"}</p>,
              },

              // {
              //   key: "Action",
              //   title: "Action",
              //   render: (d) => {
              //     function handleDelete() {
              //       // confirmAlert({
              //       //   title: "Delete Course",
              //       //   message:
              //       //     "Are you sure you want to delete this course? It cannot be undone",
              //       //   buttons: [
              //       //     { label: "Yes", onClick: () => {} },
              //       //     { label: "No" },
              //       //   ],
              //       // });
              //     }

              //     return (
              //       <div className="d-flex gap-4">
              //         <u onClick={handleDelete}>Delete</u>
              //       </div>
              //     );
              //   },
              // },
            ],
          }}
        />
      </Table.Wrapper>

      <div className="my-5 d-flex align-items-start justify-content-between ">
        <div className="col-6  ">
          <div className=" d-flex  justify-content-between">
            <div className=" " style={{ fontSize: "20px" }}>
              Total Tuition (Paid): N30,000
            </div>
            <div className=" " style={{ fontSize: "20px" }}>
              Outstanding Tuition: N130,000
            </div>
          </div>

          <Table.Wrapper>
            <Table
              {...{
                data,
                columns: [
                  {
                    key: "Payment",
                    title: "Payment",
                    render: (d) => <p>{d?.title}</p>,
                  },
                  {
                    key: "Amount",
                    title: "Amount",
                    render: (d) => <p>{"N30000"}</p>,
                  },
                  {
                    key: " Date",
                    title: " Date",
                    render: (d) => (
                      <p>{new Date(d?.createdAt)?.toDateString()}</p>
                    ),
                  },
                ],
              }}
            />
          </Table.Wrapper>
        </div>
        <div className="col-5  ">
          <div className=" " style={{ fontSize: "20px" }}>
            Reports and Scripts
          </div>

          <div className="d-flex gap-3 my-4">
            <button className="btn btn-blue-800 btn-lg w-100  d-flex align-items-center justify-content-between">
              Progress Report (PDF)
            </button>

            <button className="btn btn-blue-800 btn-lg w-100  d-flex align-items-center justify-content-between">
              Send Password Reset Link
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
