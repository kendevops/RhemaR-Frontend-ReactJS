import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { InstructorsData } from "../../../data/InstructorsData";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";

type ReassignInstructorProps = {
  data: any;
};

function ReassignInstructor({ data }: ReassignInstructorProps) {
  const defaultValues = {};
  const [isOpen, toggle] = useToggle();

  return (
    <>
      <u
        onClick={toggle}
        className="text-info click"
        data-bs-toggle="modal"
        data-bs-target="#assignInstructorModal"
      >
        Reassign Instructor
      </u>
    </>
  );
}

export default function InstructorsTable() {
  const columns: TableColumns<typeof InstructorsData[0]>[] = [
    {
      key: "Instructor Name",
      title: "Instructor Name",
      render: (data) => {
        return (
          <Link to={`ict-admin/instructor/${data?.name}`}>{data?.name}</Link>
        );
      },
    },
    {
      key: "Courses",
      title: "Courses",
      render: (data) => {
        return <p>{data?.courses?.length}</p>;
      },
    },
    {
      key: "Rating",
      title: "Rating",
      render: (data) => {
        const dat = {
          labels: ["Rating", ""],
          datasets: [
            {
              data: [data?.rating, 100 - data?.rating],
              backgroundColor: ["#FF6384", "#ffffff"],
              borderWidth: 2,
            },
          ],
        };

        return (
          <Doughnut
            style={{
              maxWidth: "3rem",
              maxHeight: "3rem",
            }}
            height={5}
            width={5}
            data={dat}
          />
        );
      },
    },
    {
      key: "Action",
      title: "Action",
      render: (data) => {
        return <ReassignInstructor data={data} />;
      },
    },
  ];

  return (
    <Table.Wrapper>
      <Table data={InstructorsData} columns={columns} />
    </Table.Wrapper>
  );
}
