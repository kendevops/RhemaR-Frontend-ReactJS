import { Fragment, useState } from "react";
import SearchBar from "../../components/general/searchBar";
import useAllUsers from "../../hooks/queries/useAllUsers";
import { Spinner } from "reactstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import Table, { TableColumns } from "../../components/general/table/Table";
import parseRole from "../../utils/parseRole";
import useToggle from "../../utility/hooks/useToggle";
import FilterModal, { FilterProps } from "../../components/modals/FilterModal";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import useRoles from "../../hooks/queries/useRoles";
import { FaFilter, FaRegEye } from "react-icons/fa";
import useCurrentUser from "../../hooks/queries/users/useCurrentUser";
import { Icon } from "@iconify/react";
import { MdOutlineCancel } from "react-icons/md";
import useCourses from "../../hooks/queries/classes/useCourses";
import { Link } from "react-router-dom";
import AddCourseScheduleModal from "../../components/modals/AddCourseScheduleModal";
import UploadBulkCourseScheduleModal from "../../components/modals/UploadBulkCourseScheduleModal";
import useAllClasses from "../../hooks/queries/classes/useAllClasses";
import useDeleteClass from "../../hooks/mutations/classes/useDeleteClass";
import { toast } from "react-toastify";
import ToastContent from "../../components/molecules/ToastContent";
import handleError from "../../utils/handleError";
import { ConfirmDeleteModal } from "../../components/modals/ConfirmDeleteModal";

type FiltersProps = {
  campus?: string;
  instructor?: string;
  startDate?: string;
  endDate?: string;
  session?: string;
};

interface DeleteProps {
  id: any;
  refetch: any;
}

const DeleteClass = ({ id, refetch }: DeleteProps) => {
  const [visibilityDeleteModal, toggleDeleteModal] = useToggle();
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const deleteIt = useDeleteClass(id);

  const isDeleteLoading = deleteIt?.isLoading;

  const handleDelete = async () => {
    try {
      await deleteIt.mutateAsync();
      console.log("Resource deleted");
      toast.success(
        <ToastContent
          type={"success"}
          heading={"Successful"}
          message={"Class deleted successfully"}
        />,
        ToastContent.Config
      );
      refetch();
      toggleDeleteModal();
    } catch (error: any) {
      console.error("Error deleting resource", error);
      handleError(error);
      toggleDeleteModal();
    }
  };

  return (
    <ConfirmDeleteModal
      visibility={visibilityDeleteModal}
      toggle={toggleDeleteModal}
      onDelete={() => handleDelete()}
      isLoading={isDeleteLoading}
    />
  );
};

export default function ScheduleManagement() {
  const [filters, setFilters] = useState<FiltersProps>({});
  const [filtering, setFiltering] = useState(false);
  const { data, isLoading } = useAllUsers(filters);
  const { data: campusesData } = useAllCampuses();
  const { data: classesData, refetch } = useAllClasses(filters);

  console.log(classesData);

  const { data: rolesData } = useRoles();
  const { data: userData, isLoading: userLoading } = useCurrentUser();
  const { data: coursesData, isLoading: coursesLoading } = useCourses();

  const classes = classesData?.nodes;

  console.log(filters);

  const [isFiltering, toggleFiltering] = useToggle();
  const [isAdding, toggleAdding] = useToggle();
  const [isBulkUploadOpen, toggleBulkUpload] = useToggle();

  const usersData = data?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("ADMIN"));
  });

  const ssData = data?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("STUDENT_SERVICES_ADMIN"));
  });

  console.log(ssData);

  console.log(usersData);

  const campusOptions = campusesData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));
  console.log(campusOptions);

  const roleOptions = rolesData?.roles?.map((d: any) => ({
    children: d?.name,
  }));

  const filterProps: FilterProps = {
    params: [
      {
        inputType: "Dropdown",
        inputProps: {
          options: campusOptions,
        },
        id: "campus",
        name: "Campus",
      },
      // {
      //   inputType: "Dropdown",
      //   inputProps: {
      //     options: ["Enugu", "Lagos"].map((d: any) => ({
      //       children: d,
      //     })),
      //   },
      //   id: "campus",
      //   name: "Campus",
      // },
      {
        inputType: "Dropdown",
        inputProps: {
          options: ["2023/2334", "2021/2324", "2036/2325"].map((d: any) => ({
            children: d,
          })),
        },
        id: "session",
        name: "Session",
      },

      {
        inputType: "Text",
        inputProps: {
          type: "date",
        },
        id: "startDate",
        name: "Start Date (From)",
      },
      {
        inputType: "Text",
        inputProps: {
          type: "date",
        },
        id: "endDate",
        name: "End Date (To)",
      },
      {
        inputType: "Dropdown",
        inputProps: {
          options: ["Mr Ken", "Rhema"].map((d: any) => ({
            children: d,
          })),
        },
        id: "instructor",
        name: "Instructor",
      },
    ],
    isOpen: isFiltering,
    onFilter: (params: any) => {
      setFilters(params);
      setFiltering(true);
    },
    toggle: toggleFiltering,
  };

  function onSearch() {}

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },

    {
      key: "Course Instance",
      title: "Course",
      render: (data) => <p>{data?.name}</p>,
    },
    {
      key: "Session",
      title: "Session",
      render: (data) => <p>{data?.session?.name}</p>,
    },
    // {
    //   key: "Level",
    //   title: "Level",
    //   render: (data) => <p>{data.type}</p>,
    // },
    {
      key: "Campus",
      title: "Campus",
      render: (data) => <p>{data?.campus?.name}</p>,
    },

    {
      key: "Online Start Date",
      title: "Online Start Date",
      render: (data) => (
        <p>{new Date(data?.onlineStartDateTime).toDateString()}</p>
      ),
    },

    {
      key: "Online End Date",
      title: "Online End Date",
      render: (data) => (
        <p> {new Date(data?.onlineEndDateTime).toDateString()}</p>
      ),
    },
    {
      key: "Onsite Start Date",
      title: "Onsite Start Date",
      render: (data) => (
        <p> {new Date(data?.onsiteStartDateTime).toDateString()}</p>
      ),
    },

    {
      key: "Onsite End Date",
      title: "Onsite End Date",
      render: (data) => (
        <p>{new Date(data?.onsiteEndDateTime).toDateString()}</p>
      ),
    },
    {
      key: "ID",
      title: "ID",
      render: (data) => <p>{data?.id}</p>,
    },

    {
      key: "Online Instructor",
      title: "Online Instructor",
      render: (data) => (
        <p>
          {`${data?.onlineInstructor?.firstName} ${data?.onlineInstructor?.lastName}`}
        </p>
      ),
    },

    {
      key: "Onsite Instructor",
      title: "Onsite Instructor",
      render: (data) => (
        <p>
          {`${data?.onsiteInstructor?.firstName} ${data?.onsiteInstructor?.lastName}`}
        </p>
      ),
    },

    {
      key: "Option",
      title: "Option",
      render: (data) => <p>{data?.type}</p>,
    },

    {
      key: "Action",
      title: "Action",
      render: (data) => {
        console.log(data);
        return (
          <div className="d-flex gap-4 align-items-center ">
            {/* <Link to={`/student-services-admin/course-details`}> */}
            <FaRegEye style={{ cursor: "pointer", fontSize: "23px" }} />
            {/* </Link> */}
            <DeleteClass id={data.id} refetch={refetch} />
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div id="Modals">
        <FilterModal {...filterProps} />
        <AddCourseScheduleModal
          visibility={isAdding}
          toggle={toggleAdding}
          onCreate={refetch}
        />
        <UploadBulkCourseScheduleModal
          isOpen={isBulkUploadOpen}
          toggle={toggleBulkUpload}
          refetch={refetch}
        />
      </div>

      <div
        className="d-flex align-items-center  bg-blue-800 btn-lg gap-5 mb-5"
        style={{ color: "white", fontWeight: 700 }}
      >
        <Icon icon="mdi:note-text" style={{ width: "20px", height: "20px" }} />
        <div>2022/2034 Course Schedule</div>
        <div
          className=" bg-white "
          style={{ width: "2px", height: "20px" }}
        ></div>

        <div>User Campus</div>

        {filtering && (
          <div
            className=" bg-white "
            style={{ width: "2px", height: "20px" }}
          ></div>
        )}

        {filtering && <div>Filtered List</div>}
      </div>

      {filtering && (
        <div className="d-flex gap-4 ">
          {filters?.campus && (
            <p
              className="d-flex gap-3 py-3 px-4 rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.campus}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}

          {filters?.session && (
            <p
              className="d-flex gap-3 py-3 px-4 rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.session}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}

          {filters?.endDate && (
            <p
              className="d-flex gap-3 py-3 px-4  rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.endDate}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}

          {filters?.startDate && (
            <p
              className="d-flex gap-3 py-3 px-4  rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.startDate}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}

          {filters?.instructor && (
            <p
              className="d-flex gap-3 py-3 px-4  rounded-5  "
              style={{ background: "#f0f0f0" }}
            >
              <p>
                {filters?.instructor}{" "}
                <MdOutlineCancel onClick={() => setFiltering(false)} />
              </p>
            </p>
          )}
        </div>
      )}

      <article className="d-flex gap-5 my-5" id="Search">
        <div style={{ flex: 1 }}>
          <SearchBar />
        </div>
        <div
          className="d-flex gap-3 justify-content-end"
          style={{
            flex: 1,
          }}
        >
          <button
            className="btn btn-blue-800 btn-lg"
            style={{ width: "fit-content" }}
            onClick={toggleBulkUpload}
          >
            Bulk Upload
          </button>
          <button
            className="border-800-blue border-2 btn-lg "
            style={{ width: "fit-content" }}
            onClick={toggleFiltering}
          >
            <FaFilter /> Filter Courses
          </button>

          <button
            className="btn btn-blue-800 btn-lg"
            style={{ width: "fit-content" }}
            onClick={toggleAdding}
          >
            Add Course Schedule
          </button>
        </div>
      </article>

      <main id="Table">
        {isLoading && <Spinner />}
        <Table.Wrapper>
          {usersData && <Table columns={columns} data={classes} />}
        </Table.Wrapper>
      </main>
    </Fragment>
  );
}
