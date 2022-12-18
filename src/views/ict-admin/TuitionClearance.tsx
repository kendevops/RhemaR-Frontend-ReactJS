import { Link } from "react-router-dom";
import typography from "../../assets/img/Typography";
import SearchBar from "../../components/general/searchBar";
import Table, { TableColumns } from "../../components/general/table/Table";
import CardWrapper from "../../components/students/CardWrapper";
import useToggle from "../../utility/hooks/useToggle";

const dashData = [
  { title: "Total Students", value: 126 },
  { title: "Total fees Paid", value: 750000 },
  { title: "Total Pending Fees", value: 320000 },
];

const studentData = [
  {
    studentName: "Ali Joshua",
    fee: "Level 1 Application Fee",
    dueDate: new Date(),
    status: "Ongoing (4/8)",
  },
  {
    studentName: "Ali Joshua",
    fee: "Level 1 Application Fee",
    dueDate: new Date(),
    status: "Ongoing (4/8)",
  },
  {
    studentName: "Ali Joshua",
    fee: "Level 1 Application Fee",
    dueDate: new Date(),
    status: "Ongoing (4/8)",
  },
];

const columns: TableColumns<typeof studentData[0]>[] = [
  {
    key: "Student Name",
    title: "Student Name",
    render: (d) => {
      return (
        <Link to={`/ict-admin/tuition/${d?.studentName}`}>
          <u> {d?.studentName}</u>
        </Link>
      );
    },
  },
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
];

export default function TuitionClearance() {
  const [isOpen, toggle] = useToggle();

  return (
    <>
      {/* Dash Cards */}
      <section className="mb-5 d-flex gap-5 justify-content-between">
        {dashData?.map((d) => {
          let value = d?.title?.includes("fees") ? `N${d?.value}` : d?.value;
          return (
            <CardWrapper className="w-100" key={d?.title}>
              <p className="mt-5">{d?.title}</p>
              <h2
                style={{
                  fontSize: typography.h2,
                  fontWeight: "bold",
                }}
              >
                {value}
              </h2>
            </CardWrapper>
          );
        })}
      </section>

      {/* Search and Send Reminder */}
      <div className="d-flex gap-4 my-5">
        <SearchBar />
        <button className="w-25 btn btn-blue-800 btn-lg " onClick={toggle}>
          Send Reminder
        </button>
      </div>

      {/* Student Table */}
      <Table.Wrapper>
        <Table data={studentData} columns={columns} />
      </Table.Wrapper>
    </>
  );
}
