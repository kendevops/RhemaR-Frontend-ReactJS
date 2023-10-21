import { Spinner } from "reactstrap";
import useAllExams from "../../../hooks/queries/classes/useAllExams";
import useToggle from "../../../utility/hooks/useToggle";
import Table from "../../general/table/Table";
import CreateExamModal from "../../modals/CreateExamModal";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import handleError from "../../../utils/handleError";
import useDeleteExam from "../../../hooks/mutations/classes/useDeleteExam";
import { Link } from "react-router-dom";
import { FaEdit, FaRegEye } from "react-icons/fa";
import FilterModal, { FilterProps } from "../../modals/FilterModal";
import useAcademicSessions from "../../../hooks/queries/classes/useAcademicSessions";
import useAllCampuses from "../../../hooks/queries/classes/useAllCampuses";
import useAllCourses from "../../../hooks/queries/classes/useAllCourses";
import { useState } from "react";
import useCampusLevel from "../../../hooks/queries/classes/useCampusLevel";

type EditExamProps = {
  data: any;
  refetch: any;
};

type ExamsTableProps = {
  isOpen?: boolean;
  toggle: VoidFunction;
  setFilters?: any;
  filters?: any;
  setFiltering?: any;
  setFiltersTodispaly?: any;
};

function EditExam({ data, refetch }: EditExamProps) {
  const [isEditing, toggleEditing] = useToggle();
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();

  const id = data?.id;

  const deleteIt = useDeleteExam(id);

  const isDeleteLoading = deleteIt?.isLoading;

  const handleDelete = async () => {
    deleteIt.mutate(undefined, {
      onSuccess: () => {
        toast.success(
          <ToastContent
            type={"success"}
            heading={"Success"}
            message={`Exam deleted successfully`}
          />,
          ToastContent.Config
        );
        refetch();

        toggleDeleteModal();
      },
      onError: (e: any) => {
        handleError(e);
        toggleDeleteModal();
      },
    });
  };

  return (
    <>
      <CreateExamModal
        defaultValues={data}
        isOpen={isEditing}
        toggle={toggleEditing}
      />

      {/* <u onClick={toggleEditing} style={{ cursor: "pointer" }}>
        Edit
      </u> */}

      <FaEdit
        onClick={toggleEditing}
        style={{ cursor: "pointer", fontSize: "23px" }}
      />
      <ConfirmDeleteModal
        visibility={visibilityDeleteModal}
        toggle={toggleDeleteModal}
        onDelete={() => handleDelete()}
        isLoading={isDeleteLoading}
      />
    </>
  );
}

export default function ExamsTable({
  isOpen,
  toggle,
  setFilters,
  setFiltering,
  filters,
}: ExamsTableProps) {
  const [filterExamId, setFilterExamId] = useState("");
  const [filterLevelId, setFilterLevelId] = useState("");
  const [filterCourseId, setFilterCourseId] = useState("");

  const { data: examsData, isLoading, refetch } = useAllExams(filters);
  const data = examsData?.nodes;

  const examOptions = data?.map((exam: any) => ({
    children: exam?.name,
    id: exam?.id,
  }));

  const { data: coursesData } = useAllCourses();
  const coursesOptions = coursesData?.nodes?.map((cours: any) => ({
    children: cours?.name,
    id: cours?.id,
  }));

  const { data: levelData, isLoading: levelLoading } = useCampusLevel();
  const levelOptions = levelData?.map((session: any) => ({
    children: session?.name,
    id: session?.id,
  }));

  console.log(filters);

  console.log(coursesOptions);

  const filterProps: FilterProps = {
    params: [
      {
        inputType: "Dropdown",
        inputProps: {
          options: examOptions,
        },
        id: "exam",
        name: "Exam",
        setId: setFilterExamId,
      },

      {
        inputType: "Dropdown",
        inputProps: {
          options: coursesOptions,
        },
        id: "course",
        name: "Course",
        setId: setFilterCourseId,
      },

      {
        inputType: "Dropdown",
        inputProps: {
          options: levelOptions,
        },
        id: "level",
        name: "Level",
        setId: setFilterLevelId,
      },
    ],
    isOpen: isOpen,
    onFilter: (params: any) => {
      setFilters(
        Object.fromEntries(
          Object.entries({
            examId: filterExamId,
            levelId: filterLevelId,
            courseId: filterCourseId,
            exam: params?.exam,
            level: params?.level,
            course: params?.course,
          }).filter(([, value]) => value !== null && value !== "")
        )
      );

      console.log(filterCourseId, filterLevelId, params, filterExamId);

      refetch();
      setFiltering(true);
      // console.log(data);
      toggle();
    },
    toggle: toggle,
  };

  return (
    <>
      <FilterModal {...filterProps} />
      <Table.Wrapper>
        {isLoading && <Spinner />}
        {data && (
          <Table
            data={data}
            columns={[
              {
                key: "Serial number",
                title: "S/N",
                render: (data, i) => <p>{i + 1}</p>,
              },
              { key: "Name", title: "Name", render: (d) => <p>{d?.name}</p> },
              {
                key: "Course",
                title: "Course",
                render: (d) => <p>{d?.course?.name}</p>,
              },
              {
                key: "Session",
                title: "Session",
                render: (d) => <p>{d?.session?.name}</p>,
              },
              {
                key: "Duration",
                title: "Duration",
                render: (d) => <p>{d?.duration}mins</p>,
              },
              {
                key: "Date",
                title: "Date",
                render: (d) => (
                  <p>
                    {new Date(d?.startsAt)?.toDateString()} -{" "}
                    {new Date(d?.endsAt)?.toDateString()}{" "}
                  </p>
                ),
              },
              {
                key: "Action",
                title: "Action",
                render: (d) => {
                  return (
                    <div className="d-flex gap-4 align-items-center ">
                      {/* <u onClick={handleDelete}>Delete</u> */}

                      <Link to={`/ict-admin/exam-details/${d?.id}`}>
                        <FaRegEye
                          style={{ cursor: "pointer", fontSize: "23px" }}
                        />
                      </Link>
                      <EditExam data={d} refetch={refetch} />
                    </div>
                  );
                },
              },
            ]}
          />
        )}
      </Table.Wrapper>
    </>
  );
}
