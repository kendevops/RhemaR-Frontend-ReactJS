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
import { states } from "../../../data/States";
import { UserDto } from "../../../types/dto";
import useAllUsers from "../../../hooks/queries/useAllUsers";
import useEditCampus from "../../../hooks/mutations/classes/useEditCampus";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import ToastContent from "../../molecules/ToastContent";
import { InstructorsData } from "../../../data/InstructorsData";
import useCampusLevel from "../../../hooks/queries/classes/useCampusLevel";
import FormDropdownSelectMultiple2 from "../../molecules/FormDropdownSelectmultiple2";

interface EditCampusModalProps {
  data: any;
}

export default function EditCampusModal({ data }: EditCampusModalProps) {
  const [visibility, toggle] = useToggle();
  const [levelValues, setLevelValues] = useState<any>("");

  const { data: levelData } = useCampusLevel();

  console.log(levelData);

  const initialState = {
    levels: data?.levels,
    name: data?.name,
    region: data?.region,
    currency: data?.currency,
    continent: data?.continent,
    campusCode: data?.campusCode,
    campusCoordinator: data?.campusCoordinator,
    phoneNumber1: data?.phoneNumber1,
    phoneNumber2: data?.phoneNumber2,
    shortName: data?.shortName,
    country: data?.country,
    campusArea: data?.campusArea,
    primaryLanguage: data?.primaryLanguage,
    secondaryLanguage: data?.secondaryLanguage,
    campusAbbreviation: data?.campusAbbreviation,

    city: data?.address?.city,
    street: data?.address?.street,
    state: data?.address?.state,
    zipCode: data?.address?.zipCode,
  };

  const editCampus = useEditCampus(data?.id);

  const isLoading = editCampus.isLoading;
  const { data: usersData, isLoading: usersLoading } = useAllUsers();

  const { formData, updateForm, formIsValid } = useForm({ initialState });

  console.log(data?.levels);

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
  console.log("level", formData.levels);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const address = {
      city: formData.city,
      street: formData.street,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
    };

    const levels =
      levelValues?.lenght > 0
        ? levelValues
        : formData?.levels?.map((l: any, i: string) => l.name);

    console.log(levels);

    const data2 = { ...formData, address, levels };

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
        },
      });

      toggle();
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

            {/* <FormDropdownSelectMultiple2
              title="Campus Levels"
              onChange={(e) => updateForm("levels", e.target.value)}
              options={levelData?.map((v: any) => ({ children: v.name }))}
              value={formData?.levels}
            /> */}

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
              label="Campus Area"
              placeholder="Campus Area"
              onChange={(e) => updateForm("campusArea", e?.target?.value)}
              value={formData?.campusArea}
            />

            <FormInput
              label="Campus Code"
              placeholder="Campus Code"
              onChange={(e) => updateForm("campusCode", e?.target?.value)}
              value={formData?.campusCode}
            />

            <FormInput
              label="Continent"
              placeholder="Continent"
              onChange={(e) => updateForm("continent", e?.target?.value)}
              value={formData?.continent}
            />

            <FormInput
              label="Country"
              placeholder="Country"
              onChange={(e) => updateForm("country", e?.target?.value)}
              value={formData?.country}
            />

            <FormInput
              label="Currency"
              placeholder="Currency"
              onChange={(e) => updateForm("currency", e?.target?.value)}
              value={formData?.currency}
            />

            <FormInput
              label="Zip Code"
              placeholder="Zip Code"
              onChange={(e) => updateForm("zipCode", e?.target?.value)}
              value={formData?.zipCode}
            />

            <FormDropdown
              title="Campus Address (State)"
              value={formData?.state}
              options={states?.map((d: any) => ({ children: d }))}
              onChange={(e) => updateForm("state", e?.target?.value)}
            />

            <FormDropdown
              title="Campus Cordinator"
              options={adminOptions?.map((d: any) => ({ children: d?.id }))}
              onChange={(e) => {
                updateForm("campusCoordinator", e?.target?.value);
              }}
              value={formData?.campusCoordinator}
            />

            <FormInput
              label="Phone Number 1"
              placeholder="Enter Phone Number"
              onChange={(e) => updateForm("phoneNumber1", e?.target?.value)}
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
