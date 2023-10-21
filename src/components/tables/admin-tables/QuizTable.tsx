import { Spinner } from "reactstrap";
import useAllExams from "../../../hooks/queries/classes/useAllExams";
import useToggle from "../../../utility/hooks/useToggle";
import Table from "../../general/table/Table";
import { ConfirmDeleteModal } from "../../modals/ConfirmDeleteModal";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import handleError from "../../../utils/handleError";
import CreateQuizModal from "../../modals/CreateQuizModal";
import useDeleteQuiz from "../../../hooks/mutations/classes/useDeleteQuiz";
import useAllQuizes from "../../../hooks/queries/classes/useAllQuizes";
import { Link } from "react-router-dom";
import { FaEdit, FaRegEye } from "react-icons/fa";
import FilterModal, { FilterProps } from "../../modals/FilterModal";
import useAcademicSessions from "../../../hooks/queries/classes/useAcademicSessions";
import useAllCampuses from "../../../hooks/queries/classes/useAllCampuses";
import useAllCourses from "../../../hooks/queries/classes/useAllCourses";
import useCampusLevel from "../../../hooks/queries/classes/useCampusLevel";
import { useState } from "react";

type EditQuizProps = {
  data: any;
  refetch: any;
};

type QuizesTableProps = {
  isOpen?: boolean;
  toggle: VoidFunction;
  setFilters?: any;
  filters?: any;
  setFiltering?: any;
};

function EditQuiz({ data, refetch }: EditQuizProps) {
  const [isEditing, toggleEditing] = useToggle();
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();

  const id = data?.id;

  const deleteIt = useDeleteQuiz(id);

  const isDeleteLoading = deleteIt?.isLoading;

  const handleDelete = async () => {
    deleteIt.mutate(undefined, {
      onSuccess: () => {
        toast.success(
          <ToastContent
            type={"success"}
            heading={"Success"}
            message={`Quiz deleted successfully`}
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
      <CreateQuizModal
        defaultValues={data}
        isOpen={isEditing}
        toggle={toggleEditing}
      />
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

export default function QuizesTable({
  isOpen,
  toggle,
  setFilters,
  setFiltering,
  filters,
}: QuizesTableProps) {
  const [filterQuizId, setFilterQuizId] = useState("");
  const [filterLevelId, setFilterLevelId] = useState("");
  const [filterCourseId, setFilterCourseId] = useState("");

  const { data: quizesData, isLoading, refetch } = useAllQuizes(filters);
  const data = quizesData?.nodes;

  console.log(filters);

  const quizOptions = data?.map((exam: any) => ({
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

  console.log(data, quizesData);

  const filterProps: FilterProps = {
    params: [
      {
        inputType: "Dropdown",
        inputProps: {
          options: quizOptions,
        },
        id: "quiz",
        name: "Quiz",
        setId: setFilterQuizId,
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
            quizId: filterQuizId,
            levelId: filterLevelId,
            courseId: filterCourseId,
            quiz: params?.quiz,
            level: params?.level,
            course: params?.course,
          }).filter(([, value]) => value !== null && value !== "")
        )
      );
      console.log(params);

      refetch();
      setFiltering(true);
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
                render: (d) => (
                  // <p>{Math.ceil(d?.durationInSeconds / 60)}hr(s)</p>
                  <p>{d?.durationInSeconds}mins</p>
                ),
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

                      <Link to={`/ict-admin/quiz-details/${d?.id}`}>
                        <FaRegEye
                          style={{ cursor: "pointer", fontSize: "23px" }}
                        />
                      </Link>
                      <EditQuiz data={d} refetch={refetch} />
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
