import { Spinner } from "reactstrap";
import useAllExams from "../../../hooks/queries/classes/useAllExams";
import useToggle from "../../../utility/hooks/useToggle";
import Table from "../../general/table/Table";

type EditExamProps = {
  data: any;
};

function EditExam({ data }: EditExamProps) {
  const [isEditing, toggleEditing] = useToggle();

  return (
    <>
      <u onClick={toggleEditing}>Edit</u>
    </>
  );
}

export default function ExamsTable() {
  const { data: examsData, isLoading } = useAllExams();
  const data = examsData?.nodes





  return (
    <>
      <Table.Wrapper>
        {isLoading && <Spinner />}
 {data &&      <Table
          data={data}
          columns={[
            { key: "Name", title: "Name", render: (d) => <p>{d?.name}</p> },
            {
              key: "Course",
              title: "Course",
              render: (d) => <p>{d?.course?.title}</p>,
            },
            {
              key: "Duration",
              title: "Duration",
              render: (d) => <p>{d?.duration / 60}</p>,
            },
            {
              key: "Date",
              title: "Date",
              render: (d) => <p>{new Date(d?.startsAt)?.toDateString()} - {new Date(d?.endsAt)?.toDateString()} </p>,
            },
            // {
            //   key: "Action",
            //   title: "Action",
            //   render: (d) => {
            //     function handleDelete() {}

            //     return (
            //       <div className="d-flex gap-4">
            //         <EditExam data={d} />
            //         <u onClick={handleDelete}>Delete</u>
            //       </div>
            //     );
            //   },
            // },
          ]}
        />}
      </Table.Wrapper>
    </>
  );
}
