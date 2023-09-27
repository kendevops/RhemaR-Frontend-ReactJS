import { FormEvent, useState } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import useForm from "../../utility/hooks/useForm";
import FormDropdown from "../molecules/FormDropdown";
// import { levels } from "../../data/Levels";
import FormInput from "../molecules/FormInput";
import { UserDto } from "../../types/dto";
import { toast } from "react-toastify";
import ToastContent from "../molecules/ToastContent";
import handleError from "../../utils/handleError";
import useAllCampuses from "../../hooks/queries/classes/useAllCampuses";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import { states, regions } from "../../data/States";
import { InstructorsData } from "../../data/InstructorsData";
import useCreateCampus from "../../hooks/mutations/classes/useCreateCampus";
import useAllUsers from "../../hooks/queries/useAllUsers";
import useCampusLevel from "../../hooks/queries/classes/useCampusLevel";

// import './styles.css';

interface AddCampusModalProps {
  toggle: VoidFunction;
  visibility: boolean;
  defaultValues?: any;
  onCreate?: VoidFunction;
}

export default function AddCampusModal({
  toggle,
  defaultValues,
  visibility,
  onCreate,
}: AddCampusModalProps) {
  const isCreating = !defaultValues;

  const [levelValues, setLevelValues] = useState<any>("");

  const { isLoading: campusesLoading, data } = useAllCampuses();
  const campusesData = data?.nodes;
  const createCampus = useCreateCampus();
  // const updateTuition = useUpdateCampusTuition(id ?? "");

  const isLoading = createCampus.isLoading || campusesLoading;
  const { data: usersData, isLoading: usersLoading } = useAllUsers();

  const { data: levelData } = useCampusLevel();

  const users: UserDto[] = usersData?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("CAMPUS_COORD_ADMIN"));
  });

  const adminOptions = users?.map((u) => ({
    label: `${u?.firstName} ${u?.lastName}`,
    id: u?.email,
  }));

  const initialState = {
    levels: [],
    name: "",
    region: regions[0],
    currency: "",
    continent: "Africa",
    campusCode: "",
    phoneNumber1: "",
    phoneNumber2: "",
    shortName: "",
    country: "Nigeria",
    // campusArea: "",
    // primaryLanguage: "",
    // secondaryLanguage: "",
    campusAbbreviation: "",
    campusCoordinator: adminOptions[0]?.id,

    city: "",
    state: states[0],
    street: "",
    // zipCode: 0,
  };

  const { formData, formIsValid, updateForm, formErrors, toggleError } =
    useForm<typeof initialState>({
      initialState: defaultValues ?? initialState,
      // optionalFields: ["discount"],
    });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log(formData);

    const address = {
      city: formData.city,
      street: formData.state,
      state: formData.state,
      // zipCode: formData.zipCode,
      country: formData.country,
    };

    // const levels = formData?.levels?.map((l: any, i: number) => l.name);

    const data = { ...formData, address, levels: levelValues };

    console.log(data?.campusCoordinator, levelValues, data);

    if (formIsValid) {
      createCampus.mutate(data, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Success"}
              message={`Campus created Successfully`}
            />,
            ToastContent.Config
          );
          !!onCreate && onCreate();
          toggle();
        },
        onError: (e: any) => {
          handleError(e, formData);
        },
      });
    } else {
      alert("Please fill in all fields");
      console.log(formData);
    }
  }

  return (
    <Modal centered isOpen={visibility} toggle={toggle} scrollable>
      <ModalHeader toggle={toggle}>
        Create Campus
        {/* <span className="custom-close-icon">&times;</span> */}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Campus Full Name"
            placeholder="Enter Campus Full Name"
            onChange={(e) => updateForm("name", e?.target?.value)}
            value={formData?.name}
          />

          <FormInput
            label="Campus Short Name"
            placeholder="Enter Campus Short Name"
            onChange={(e) => updateForm("shortName", e?.target?.value)}
            value={formData?.shortName}
          />

          <FormDropdownSelectMultiple
            title="Campus Levels"
            // value={formData?.levels}
            onChange={(e) => updateForm("levels", e.target.value)}
            options={levelData?.map((v: any) => ({ children: v.name }))}
            setLevelValues={setLevelValues}
            disabled={!isCreating}
          />

          <FormInput
            label="Campus Address (Street)"
            placeholder="Enter Campus Street Address"
            onChange={(e) => updateForm("street", e?.target?.value)}
            value={formData?.street}
          />

          <FormInput
            label="City"
            placeholder="City"
            onChange={(e) => updateForm("city", e?.target?.value)}
            value={formData?.city}
          />

          <FormInput
            label="Campus Abbreviation"
            placeholder="Campus Abbreviation"
            onChange={(e) => updateForm("campusAbbreviation", e?.target?.value)}
            value={formData?.campusAbbreviation}
          />

          <FormInput
            label="Campus Code"
            placeholder="Campus Code"
            onChange={(e) => updateForm("campusCode", e?.target?.value)}
            value={formData?.campusCode}
          />

          <FormDropdown
            title="Campus Address (State)"
            value={formData?.state}
            options={states?.map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("state", e?.target?.value)}
            disabled={!isCreating}
          />

          <FormDropdown
            title="Campus Address (Region)"
            value={formData?.region}
            options={regions?.map((d: any) => ({ children: d }))}
            onChange={(e) => updateForm("region", e?.target?.value)}
            disabled={!isCreating}
          />
          <FormInput
            label="Country"
            placeholder="Country"
            onChange={(e) => updateForm("country", e?.target?.value)}
            value={formData?.country}
            disabled
          />

          {/* <FormInput
            label="Zip Code"
            placeholder="Zip Code"
            onChange={(e) => updateForm("zipCode", e?.target?.value)}
            value={formData?.zipCode}
          /> */}

          <FormInput
            label="Continent"
            placeholder="Continent"
            onChange={(e) => updateForm("continent", e?.target?.value)}
            value={formData?.continent}
            disabled
          />

          <FormInput
            label="Currency"
            placeholder="Currency"
            onChange={(e) => updateForm("currency", e?.target?.value)}
            value={formData?.currency}
          />

          <FormDropdown
            title="Campus Cordinator"
            value={formData.campusCoordinator}
            options={adminOptions?.map((d: any) => ({ children: d?.id }))}
            onChange={(e) => updateForm("campusCoordinator", e?.target?.value)}
            disabled={!isCreating}
          />

          <FormInput
            label="Phone Number 1"
            placeholder="+2348044444444"
            onChange={(e) => {
              updateForm("phoneNumber1", e?.target?.value);
              formErrors?.phoneNumber && toggleError("phoneNumber1");
            }}
            value={formData?.phoneNumber1}
          />

          <FormInput
            label="Phone Number 2"
            placeholder="Enter Optional 2nd number"
            onChange={(e) => updateForm("phoneNumber2", e?.target?.value)}
            value={formData?.phoneNumber2}
          />

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn btn-blue-800 btn-lg w-100 my-5"
              type="submit"
            >
              {"Create Campus"}
            </button>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
}
