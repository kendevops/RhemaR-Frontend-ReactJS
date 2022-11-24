import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useHistory, useParams } from "react-router-dom";
import typography from "../../assets/img/Typography";
import Table, { TableColumns } from "../../components/general/table/Table";
import ViewRatingModal from "../../components/modals/ViewRating";
import BackButton from "../../components/molecules/BackButton";
import { InstructorsData } from "../../data/InstructorsData";
import useToggle from "../../utility/hooks/useToggle";

// View Rating Component
type ViewRatingProps = {
  data: any;
};

function ViewRating({ data }: ViewRatingProps) {
  const [visibility, toggle] = useToggle();

  return (
    <>
      <ViewRatingModal {...{ visibility, toggle, data }} />
      <u
        onClick={toggle}
        className="text-info click"
        data-bs-toggle="modal"
        data-bs-target="#ratingModal"
      >
        View Rating
      </u>
    </>
  );
}

// Columns
const columns: TableColumns<any>[] = [
  {
    key: "Courses",
    title: "Courses",
    render: (data) => {
      return <p>{data?.name}</p>;
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
        <span className="d-flex gap-4 align-items-center ">
          <p>{data?.rating} %</p>
          <Doughnut
            style={{
              maxWidth: "3rem",
              maxHeight: "3rem",
            }}
            height={5}
            width={5}
            data={dat}
          />
        </span>
      );
    },
  },
  {
    key: "Action",
    title: "Action",
    render: (data) => {
      return <ViewRating data={data?.feedback} />;
    },
  },
];

// Instructor Page
export default function Instructor() {
  const history = useHistory();
  const params = useParams<{
    id: string;
  }>();

  useEffect(() => {
    if (!params?.id) {
      history.replace("/");
    }
  }, [params?.id, history]);

  //find data for the instructor
  const data =
    InstructorsData?.find(({ name }) => name === params?.id)?.courses ?? [];

  return (
    <section>
      <div className="px-4 my-5">
        <BackButton prevUrl={"/ict-admin/instructors"} />
        <h2 style={{ fontSize: typography.h2 }} className="font-bold mt-3">
          {params?.id}
        </h2>
      </div>

      {/* Table */}
      <Table.Wrapper>
        <Table data={data} columns={columns} />
      </Table.Wrapper>
    </section>
  );
}
