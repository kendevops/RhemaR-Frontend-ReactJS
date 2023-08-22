import { MouseEventHandler, ReactNode, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function FormDropdownSelectMultiple({
  options,
  title,
  lg,
  md,
  hasErrors,
}: FormDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <FormInputWrapper {...{ lg, md }}>
      <label>{title}</label>

      <input
        type="text"
        value={selectedOptions}
        readOnly
        className="form-control"
        onClick={toggle}
        placeholder={`Select ${title}`}
        style={{
          borderColor: hasErrors ? "red" : "",
          borderStyle: hasErrors ? "solid" : "none",
          cursor: "pointer",
        }}
      />

      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle style={{ display: "none" }} />
        <DropdownMenu>
          {options.map(({ children }, i) => (
            <DropdownItem
              key={i.toString()}
              onClick={() => handleOptionClick(children as string)}
            >
              {children}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <p>
        Selected Options:{" "}
        {selectedOptions.map((option) => (
          <span key={option}>{option}, </span>
        ))}
      </p>
    </FormInputWrapper>
  );
}
