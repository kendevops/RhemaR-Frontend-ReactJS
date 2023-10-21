import { Modal, ModalBody, ModalHeader } from "reactstrap";
import FormDropdown from "../molecules/FormDropdown";
import FormDropdownSelectMultiple from "../molecules/FormDropdownSelectMultiple";
import FormInput from "../molecules/FormInput";
import useForm from "../../utility/hooks/useForm";
import { Autocomplete } from "@mui/material";

export type FilterParams = {
  inputType: "Text" | "Dropdown" | "Autocomplete";
  inputProps: any; //props for the inputType
  id: string;
  name: string;
  setId?: any;
};

export type FilterProps = {
  params: FilterParams[];
  onFilter: (params: any) => void;
  isOpen?: boolean;
  toggle: VoidFunction;
  otherStates?: any;
  // setIsFiltering?: VoidFunction
};

export default function FilterModal({
  onFilter,
  params,
  toggle,
  isOpen,
  otherStates,
}: // setIsFiltering
FilterProps) {
  let initialState: any = {};

  params.forEach((p) => {
    initialState[p.id] = "";
  });

  console.log(params);

  const inputs = {
    Text: FormInput,
    Dropdown: FormDropdown,
    Autocomplete: Autocomplete,
  };

  const { formData, formErrors, updateForm } = useForm({ initialState });

  function handleFilter() {
    onFilter(formData);
  }

  function handleReset() {
    params.forEach((p) => {
      updateForm(p.id, "");
    });
  }

  return (
    <Modal centered {...{ isOpen, toggle }}>
      <ModalHeader toggle={toggle}>Filter </ModalHeader>
      <ModalBody>
        {params.map((p) => {
          console.log(p);

          const defProps = {
            title: p.name,
            label: p.name,
            name: p.name,
            placeholder: p.name,
            onChange: (e: any) => {
              updateForm(p.id, e?.target?.value);
              const pId = p?.inputProps?.options.filter(
                (en: any) => en.children === e?.target?.value
              );

              if (p.setId) {
                p?.setId(pId[0]?.id);
              }
            },
          };
          return (
            <li key={p.id}>
              {inputs[p.inputType]({ ...p.inputProps, ...defProps })}
            </li>
          );
        })}

        <button
          className="btn btn-blue-800 btn-lg mb-3"
          onClick={() => {
            handleFilter();
            // toggle();
            // setIsFiltering()
            handleReset();
          }}
        >
          Apply filter
        </button>
        <button className="btn btn-outline-info btn-lg" onClick={handleReset}>
          Reset filters
        </button>
      </ModalBody>
    </Modal>
  );
}
