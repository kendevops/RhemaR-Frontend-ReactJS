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

  return (
    <FormInputWrapper {...{ lg, md }}>
      <label>{title}</label>

      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle className="text-lg w-100 text-left shadow-none" caret>
          Select {title}
        </DropdownToggle>
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
