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
  options: FormDropdownOption[];
  title: string;
  lg?: string;
  md?: string;
  hasErrors?: boolean;
  setLevelValues?: any;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function FormDropdownSelectMultiple({
  options,
  title,
  lg,
  md,
  hasErrors,
  value,
  setLevelValues,
  ...otherProps
}: FormDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<any>([]);

  console.log(value);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );

    setLevelValues((prevSelected: any) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item: any) => item !== option)
        : [...prevSelected, option]
    );
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
          {options?.map(({ children }, i) => {
            console.log(children);

            return (
              <DropdownItem
                key={i.toString()}
                onClick={() => handleOptionClick(children as string)}
              >
                {children}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </FormInputWrapper>
  );
}
