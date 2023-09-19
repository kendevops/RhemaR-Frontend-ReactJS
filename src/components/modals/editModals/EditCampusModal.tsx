import useToggle from "../../../utility/hooks/useToggle";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { Input } from "reactstrap";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { levels } from "../../../data/Levels";
import useForm from "../../../utility/hooks/useForm";
import FormInput from "../../molecules/FormInput";
import parseRole from "../../../utils/parseRole";
import FormDropdownSelectMultiple from "../../molecules/FormDropdownSelectMultiple";
import FormDropdown from "../../molecules/FormDropdown";
import { states, regions } from "../../../data/States";
import { UserDto } from "../../../types/dto";
import useAllUsers from "../../../hooks/queries/useAllUsers";
import useEditCampus from "../../../hooks/mutations/classes/useEditCampus";
import useCampusLevel from "../../../hooks/queries/classes/useCampusLevel";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import { InstructorsData } from "../../../data/InstructorsData";

interface EditCampusModalProps {
  data: any;
  onCreate: VoidFunction;
}

export default function EditCampusModal({
  data,
  onCreate,
}: EditCampusModalProps) {
  const [visibility, toggle] = useToggle();
  const [levelValues, setLevelValues] = useState<any>(
    data?.levels?.map((l: any) => l.name)
  );

  const { data: levelData } = useCampusLevel();

  console.log(levelData);

  const initialState = {
    levels: data?.levels,
    name: data?.name,
    region: data?.region,
    currency: data?.currency,
    continent: data?.continent,
    campusCode: data?.campusCode,
    campusCoordinator: data?.campusCoordinator?.email,
    phoneNumber1: data?.phoneNumber1,
    phoneNumber2: data?.phoneNumber2,
    shortName: data?.shortName,
    country: data?.address?.country,
    campusAbbreviation: data?.campusAbbreviation,

    city: data?.address?.city,
    street: data?.address?.street,
    state: data?.address?.state,
    // zipCode: data?.zipCode,
  };

  const editCampus = useEditCampus(data?.id);

  const isLoading = editCampus.isLoading;
  const { data: usersData, isLoading: usersLoading } = useAllUsers();

  const { formData, updateForm, formIsValid, formErrors, toggleError } =
    useForm({ initialState });

  console.log(data);

  const users: UserDto[] = usersData?.users?.nodes?.filter((u: any) => {
    return u?.roles
      ?.map((r: any) => r?.name)
      .some((n: any) => n?.includes("CAMPUS_COORD_ADMIN"));
  });

  const adminOptions = users?.map((u) => ({
    label: `${u?.firstName} ${u?.lastName}`,
    id: u?.email,
  }));

  console.log(adminOptions);

  // const roleOptions = rolesData?.roles
  //   ?.filter((r: any) => r.name?.includes("ADMIN"))
  //   .map((d: any) => ({
  //     children: d?.name,
  //   }));

  //   function onSubmit() {}
  console.log("level", formData.levels, levelValues);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const address = {
      city: formData.city,
      street: formData.state,
      state: formData.state,
      // zipCode: formData.zipCode,
    };

    const data2 = {
      ...formData,
      address,
      levels: levelValues,
    };

    if (!formIsValid) {
      alert("Please fill in all fields");
      return;
    }
    if (data) {
      editCampus?.mutate(data2, {
        onSuccess: () => {
          toast.success(
            <ToastContent
              type={"success"}
              heading={"Successful"}
              message={"Campus Updated successfully"}
            />,
            ToastContent.Config
          );
          !!onCreate && onCreate();
          toggle();
        },

        onError: (e: any) => {
          console.log(e);
          toast.error(
            <ToastContent
              type={"error"}
              heading={"Error"}
              message={e?.response?.data?.error?.message?.toString()}
            />,
            ToastContent.Config
          );
          toggle();
        },
      });

      return;
    }
  };

  // const updateForm2 = (field: string, value: string | string[]) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: value,
  //   }));
  // };

  return (
    <div className=" ">
      <p
        onClick={toggle}
        className=" click d-flex"
        // data-bs-toggle="modal"
        // data-bs-target="#studentModal"
      >
        Edit
      </p>

      {/* Modal */}
      <Modal centered isOpen={visibility} toggle={toggle} scrollable>
        <ModalHeader toggle={toggle}>Edit Campus</ModalHeader>
        <ModalBody>
          <form onSubmit={onSubmit}>
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
              value={formData?.levels}
              onChange={(e) => updateForm("levels", e.target.value)}
              options={levelData?.map((v: any) => ({ children: v.name }))}
              setLevelValues={setLevelValues}
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
              onChange={(e) =>
                updateForm("campusAbbreviation", e?.target?.value)
              }
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
            />

            <FormDropdown
              title="Campus Address (State)"
              value={formData?.region}
              options={regions?.map((d: any) => ({ children: d }))}
              onChange={(e) => updateForm("region", e?.target?.value)}
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
              onChange={(e) =>
                updateForm("campusCoordinator", e?.target?.value)
              }
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
                {"Edit Campus"}
              </button>
            )}
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
