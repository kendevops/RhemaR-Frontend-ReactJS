import { Modal, ModalBody, ModalHeader } from "reactstrap";
import FormDropdown from "../molecules/FormDropdown";
import FormInput from "../molecules/FormInput";
import useForm from "../../utility/hooks/useForm";

export type FilterParams = {
  inputType: "Text" | "Dropdown";
  inputProps: any; //props for the inputType
  id: string;
  name: string;
};

export type FilterProps = {
  params: FilterParams[];
  onFilter: (params: any) => void;
  isOpen?: boolean;
  toggle: VoidFunction;
  // setIsFiltering?: VoidFunction
};

export default function FilterModal({
  onFilter,
  params,
  toggle,
  isOpen,
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
          const defProps = {
            title: p.name,
            label: p.name,
            name: p.name,
            placeholder: p.name,
            onChange: (e: any) => {
              updateForm(p.id, e?.target?.value);
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
            toggle();
            // setIsFiltering()
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
