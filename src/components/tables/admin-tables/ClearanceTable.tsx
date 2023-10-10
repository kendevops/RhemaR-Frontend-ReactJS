import { Spinner } from "reactstrap";
import useToggle from "../../../utility/hooks/useToggle";
import Table, { TableColumns } from "../../general/table/Table";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import AddIntakeModal from "../../modals/AddIntakeModal";
import useDeleteIntake from "../../../hooks/mutations/classes/useDeleteIntake";
import useAllIntakes from "../../../hooks/queries/classes/useAllIntakes";
import useAllClearance from "../../../hooks/queries/classes/useAllClearance";
import useDeleteClearance from "../../../hooks/mutations/classes/useDeleteClearance";
import LevelClearanceModal from "../../modals/ClearanceModal";
import { useEffect } from "react";

interface Props {
  data: any;
  onCreate?: VoidFunction;
  level?: string;
}

function ModifyClearance({ data, onCreate, level }: Props) {
  const [visibility, toggle] = useToggle();
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();

  const defaultValues = {
    intakeId: data?.intake?.id,
    hasPaidFees: data.hasPaidFees,
    hasCompletedPMR: data.hasCompletedPMR,
    hasTakenAllCourses: data.hasTakenAllCourses,
    hasTakenAllQuizzes: data.hasTakenAllQuizzes,
    id: data?.id,
  };

  const deleteMutation = useDeleteClearance(
    level as string,
    data?.id as string
  );
  const isLoading = deleteMutation?.isLoading;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      console.log("Resource deleted");
      toast.success(
        <ToastContent
          type={"success"}
          heading={"Successful"}
          message={"Clearance Request Deleted successfully"}
        />,
        ToastContent.Config
      );
      toggleDeleteModal();
    } catch (error: any) {
      console.error("Error deleting resource", error);
      toast.error(
        <ToastContent
          type={"error"}
          heading={"Error"}
          message={error?.response?.data?.error?.message?.toString()}
        />,
        ToastContent.Config
      );
      toggleDeleteModal();
    }
  };

  return (
    <>
      <p onClick={toggle} style={{ cursor: "pointer" }}>
        Edit
      </p>
      <ConfirmDeleteModal
        visibility={visibilityDeleteModal}
        toggle={toggleDeleteModal}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      <LevelClearanceModal
        {...{ visibility, toggle, defaultValues, onCreate }}
      />
    </>
  );
}

export default function ClearanceTable(level: any) {
  const {
    data: clearanceData,
    isLoading,
    refetch,
  } = useAllClearance(level?.level === "LEVEL_1" ? "LEVEL_1" : "LEVEL_2");
  const { data: clearanceData2, isLoading: isLoading2 } =
    useAllClearance("LEVEL_2");

  const data = clearanceData?.nodes;

  useEffect(() => {
    refetch();
  }, [level]);

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "First Name",
      title: "First Name",
      render: (data) => {
        return <p>{data?.user?.firstName}</p>;
      },
    },
    {
      key: "Last Name",
      title: "Last Name",
      render: (data) => {
        return <p>{data?.user?.lastName}</p>;
      },
    },

    {
      key: "Level",
      title: "Level",
      render: (data) => {
        return <p>{data?.level?.name}</p>;
      },
    },

    {
      key: "hasPaidFees",
      title: "hasPaidFees",
      render: (data) => <p>{data?.hasPaidFees ? "Yes" : "No"}</p>,
    },
    {
      key: "hasCompletedPMR",
      title: "hasCompletedPMR",
      render: (data) => <p>{data?.hasCompletedPMR ? "Yes" : "No"}</p>,
    },
    {
      key: "hasTakenAllCourses",
      title: "hasTakenAllCourses",
      render: (data) => <p>{data?.hasTakenAllCourses ? "Yes" : "No"}</p>,
    },
    {
      key: "hasTakenAllQuizzes",
      title: "hasTakenAllQuizzes",
      render: (data) => <p>{data?.hasTakenAllQuizzes ? "Yes" : "No"}</p>,
    },

    {
      key: "Action",
      title: "Action",
      render: (data) => {
        console.log(data);

        return (
          <div className="d-flex gap-3">
            <ModifyClearance onCreate={refetch} data={data} level={level} />
          </div>
        );
      },
    },
  ];

  return (
    <Table.Wrapper>
      {isLoading && <Spinner />}
      <Table data={data} columns={columns} />
    </Table.Wrapper>
  );
}
