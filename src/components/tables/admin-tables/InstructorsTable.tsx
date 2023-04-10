import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { InstructorsData } from "../../../data/InstructorsData";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import { Chart, ArcElement } from "chart.js";
import AssignInstructorModal from "../../modals/AssignInstructorModal";
import useAllUsers from "../../../hooks/queries/useAllUsers";
import { Spinner } from "reactstrap";
import userRoles from "../../../utility/userRoles";
import { useEffect } from "react";

type ReassignInstructorProps = {
  data: any;
};

interface Props {
  shouldRefetch?: boolean;
}

Chart.register(ArcElement);

function ReassignInstructor({ data }: ReassignInstructorProps) {
  const defaultValues = {
    name: data?.name,
    email: data?.email,
    phone: data?.phone,
  };
  const [visibility, toggle] = useToggle();

  return (
    <>
      <AssignInstructorModal {...{ toggle, visibility, defaultValues }} />
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

export default function InstructorsTable({ shouldRefetch }: Props) {
  const { isLoading, data: usersData, refetch } = useAllUsers();

  useEffect(() => {
    if (shouldRefetch) refetch();
  }, [shouldRefetch, refetch]);

  //userRoles?.includes
  const users = usersData?.users?.nodes;

  const instrsData = users
    ?.filter((user: any) =>
      user?.roles?.map((r: any) => r?.name)?.includes(userRoles.INSTRUCTOR)
    )
    .map((user: any) => {
      return {
        name: user?.firstName + " " + user?.lastName,
        rating: 56,
        email: user?.email,
        phome: user?.phoneNumber,
        courses: [
          {
            name: "Pneumatology 1",
            rating: 36,
          },
        ],
      };
    });

  const columns: TableColumns<typeof InstructorsData[0]>[] = [
    {
      key: "Instructor Name",
      title: "Instructor Name",
      render: (data) => {
        return (
          <Link to={`/ict-admin/instructor/${data?.name}`}>{data?.name}</Link>
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
        return <ReassignInstructor data={data} />;
      },
    },
  ];

  return (
    <Table.Wrapper>
      {isLoading && <Spinner />}
      <Table data={instrsData} columns={columns} />
    </Table.Wrapper>
  );
}
