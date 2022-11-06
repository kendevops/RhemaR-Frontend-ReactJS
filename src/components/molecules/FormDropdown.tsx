import { MouseEventHandler, ReactNode } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import useToggle from "../../utility/hooks/useToggle";
import FormInputWrapper from "./FormInputWrapper";

interface FormDropdownOption {
  children: ReactNode;
  onClick: MouseEventHandler;
}

type FormDropdownProps = {
  options: FormDropdownOption[];
  title: string;
  lg?: string;
  md?: string;
};

export default function FormDropdown({
  options,
  title,
  lg,
  md,
}: FormDropdownProps) {
  const [roleOpen, toggleRole] = useToggle();

  return (
    <FormInputWrapper {...{ lg, md }}>
      <label>{title}</label>

      <Dropdown
        onChange={(e) => console.log(e.target)}
        className="form-control"
        isOpen={roleOpen}
        toggle={toggleRole}
      >
        <DropdownToggle className="text-lg w-100 text-left shadow-none" caret>
          Select {title}
        </DropdownToggle>
        <DropdownMenu>
          {options.map(({ children, ...others }, i) => {
            return (
              <DropdownItem key={i.toString()} {...others}>
                {children}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </FormInputWrapper>
  );
}
