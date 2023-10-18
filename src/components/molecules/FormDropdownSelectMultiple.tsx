import { MouseEventHandler, ReactNode, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import FormInputWrapper from "./FormInputWrapper";

interface FormDropdownOption {
  children: ReactNode;
  onClick?: MouseEventHandler;
}

type FormDropdownProps = {
  options: any;
  title: string;
  lg?: string;
  md?: string;
  hasErrors?: boolean;
  setValues?: any;
  setIdVales?: any;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function FormDropdownSelectMultiple({
  options,
  title,
  lg,
  md,
  hasErrors,
  value,
  setValues,
  setIdVales,
  ...otherProps
}: FormDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<any>([]);

  console.log(options);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string, id: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );

    if (setValues) {
      setValues((prevSelected: any) =>
        prevSelected.includes(option)
          ? prevSelected.filter((item: any) => item !== option)
          : [...prevSelected, option]
      );
    }

    if (setIdVales) {
      setIdVales((prevSelected: any) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item: any) => item !== id)
          : [...prevSelected, id]
      );
    }
  };

  //
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <FormInputWrapper {...{ lg, md }}>
      <label>{title}</label>

      <input
        type="text"
        value={selectedOptions} // Display selected options in the input
        readOnly
        className="form-control"
        onClick={toggle}
        placeholder={`Select ${title}`}
        style={{
          borderColor: hasErrors ? "red" : "",
          borderStyle: hasErrors ? "solid" : "none",
          cursor: "pointer",
          position: "relative",
        }}
      />

      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle
          style={{ position: "absolute", right: "30px", top: "-28px" }}
          className="text-lg text-left shadow-none"
          caret
        ></DropdownToggle>

        <DropdownMenu
        // style={{
        //   width: "100%",
        // }}
        >
          {options?.map((v: any, i: number) => {
            console.log(v);

            return (
              <DropdownItem
                key={i.toString()}
                onClick={() => handleOptionClick(v.name as string, v.id)}
              >
                {v.name}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </FormInputWrapper>
  );
}
