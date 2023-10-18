import { FormEvent, Fragment, useState } from "react";
import SearchBar from "../../components/general/searchBar";
import useAllUsers from "../../hooks/queries/useAllUsers";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import Table, { TableColumns } from "../../components/general/table/Table";
import parseRole from "../../utils/parseRole";
import useToggle from "../../utility/hooks/useToggle";
import FilterModal, { FilterProps } from "../../components/modals/FilterModal";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import useRoles from "../../hooks/queries/useRoles";
import AddAdminModal from "../../components/modals/AddAdminModal";
import EditAdminModal from "../../components/modals/editModals/EditAdminModal";
import FormInput from "../../components/molecules/FormInput";
import FormDropdown from "../../components/molecules/FormDropdown";
import handleError from "../../utils/handleError";
import ToastContent from "../../components/molecules/ToastContent";
import { toast } from "react-toastify";
import useRetractRole from "../../hooks/mutations/roles/useRetractRole";
import useForm from "../../utility/hooks/useForm";

type DeleteAdminProps = {
  toggle: VoidFunction;
  visibility: boolean;
  data?: any;
  onCreate: VoidFunction;
};
const DeleteAdmin = ({
  data,
  toggle,
  visibility,
  onCreate,
}: DeleteAdminProps) => {
  const initialState = {
    email: data?.email,
    emailName: `${data?.firstName} ${data?.lastName}`,
    role: "",
  };

  const { mutate, isLoading } = useRetractRole();

  const { formData, updateForm, formErrors, formIsValid, toggleError } =
    useForm({ initialState });

  const roleOptions = data?.roles?.map((d: any) => ({
    children: d?.name,
  }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const body = { email: data?.email, role: formData?.role };
    console.log(body);
    mutate([body], {
      onSuccess: (d) => {
        toast.success(
          <ToastContent
            type={"success"}
            heading={"Success"}
            message={`Successfully Retract ${formData.role} from ${data?.email}`}
          />,
          ToastContent.Config
        );
        toggle();
        onCreate();
      },
      onError: (e: any) => handleError(e, formData, toggleError),
    });
  }

  return (
    <Modal centered {...{ isOpen: visibility, toggle }}>
      <ModalHeader toggle={toggle}>Retract Admin</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            placeholder="Name"
            onChange={(e) => updateForm("emailName", e?.target?.value)}
            value={`${data?.firstName} ${data?.lastName}`}
            disabled
          />
          <FormInput
            label="Email"
            placeholder="Email"
            onChange={(e) => updateForm("email", e?.target?.value)}
            value={data?.email}
            disabled
          />

          <FormDropdown
            options={roleOptions}
            title="Select role"
            onChange={(e) => updateForm("role", e.target.value)}
            hasErrors={formErrors?.role}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <button className="btn btn-blue-800 btn-lg w-100" type="submit">
              Retract role
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
};

export default function AdminManagement() {
  const [filters, setFilters] = useState({});
  const [adminData, setAdminData] = useState<any>({});
  const { data, isLoading, refetch }: any = useAllUsers(filters);
  const { data: campusesData } = useAllCampuses();
  const { data: rolesData } = useRoles();

  const [isFiltering, toggleFiltering] = useToggle();
  const [isAdding, toggleAdding] = useToggle();
  const [isEditing, toggleEditing] = useToggle();

  const usersData = data?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("ADMIN"));
  });

  const campusOptions = campusesData?.nodes?.map((d: any) => ({
    children: d?.name,
  }));

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
      {
        inputType: "Dropdown",
        inputProps: {
          options: roleOptions,
        },
        id: "role",
        name: "Role",
      },
      {
        inputType: "Text",
        inputProps: {
          type: "date",
        },
        id: "fromLoginDate",
        name: "Last Login Date (From)",
      },
      {
        inputType: "Text",
        inputProps: {
          type: "date",
        },
        id: "toLoginDate",
        name: "Last Login Date (To)",
      },
    ],
    isOpen: isFiltering,
    onFilter: (params: any) => {
      setFilters(params);
    },
    toggle: toggleFiltering,
  };

  function onSearch() {}

  const columns: TableColumns<any>[] = [
    { key: "Serial number", title: "S/N", render: (data, i) => <p>{i + 1}</p> },
    {
      key: "First name",
      title: "First name",
      render: (data) => <p>{data?.firstName}</p>,
    },
    {
      key: "Last name",
      title: "Last name",
      render: (data) => <p>{data?.lastName}</p>,
    },
    {
      key: "Roles",
      title: "Roles",
      render: (data) => (
        <p>
          {data?.roles?.map(
            (r: any, i: number) =>
              `${parseRole(r?.name)}${
                i === data?.roles?.length - 1 ? "" : ", "
              }`
          )}
        </p>
      ),
    },
    {
      key: "Campus",
      title: "Campus",
      render: (data) => <p>{"Not Included"}</p>,
    },
    {
      key: "Last Login",
      title: "Last Login",
      render: (data) => <p>{"Not Included"}</p>,
    },
    {
      key: "Action",
      title: "Action",
      render: (data) => {
        console.log("usersData", data);
        return (
          <div className="d-flex gap-3">
            <p
              className=""
              onClick={() => {
                setAdminData(data);
                toggleEditing();
              }}
              style={{ color: "red", cursor: "pointer" }}
            >
              Delete
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div id="Modals">
        <FilterModal {...filterProps} />
        <AddAdminModal
          isOpen={isAdding}
          toggle={toggleAdding}
          onCreate={refetch}
        />
        {/* <EditAdminModal isOpen={isEditing} toggle={toggleEditing} /> */}
        <DeleteAdmin
          data={adminData}
          visibility={isEditing}
          toggle={toggleEditing}
          onCreate={refetch}
        />
      </div>

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
            className="btn btn-outline-info btn-lg "
            style={{ width: "fit-content" }}
            onClick={toggleFiltering}
          >
            Filter
          </button>
          <button
            className="btn btn-blue-800 btn-lg"
            style={{ width: "fit-content" }}
            onClick={toggleAdding}
          >
            Add admin
          </button>
        </div>
      </article>

      <main id="Table">
        {isLoading && <Spinner />}
        <Table.Wrapper>
          {usersData && <Table columns={columns} data={usersData} />}
        </Table.Wrapper>
      </main>
    </Fragment>
  );
}
