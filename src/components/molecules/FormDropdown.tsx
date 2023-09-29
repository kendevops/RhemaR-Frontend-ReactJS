import { MouseEventHandler, ReactNode } from "react";
import { Input, InputProps } from "reactstrap";
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
} & InputProps;

export default function FormDropdown({
  options = [],
  title,
  lg,
  md,
  hasErrors,
  ...otherProps
}: FormDropdownProps) {
  const optionsWithEmpty = [{ children: "" }, ...options];

  return (
    <FormInputWrapper {...{ lg, md }}>
      <label>{title}</label>

      <Input
        name={title}
        className="form-control"
        type="select"
        {...otherProps}
        style={{
          ...otherProps.style,
          borderColor: hasErrors ? "red" : "",
          borderStyle: hasErrors ? "solid" : "none",
        }}
      >
        <>
          {optionsWithEmpty?.map(({ children, ...others }, i) => {
            return (
              <option key={i.toString()} {...others}>
                {children}
              </option>
            );
          })}
        </>
      </Input>
    </FormInputWrapper>
  );
}

//Old
// function ActionDropdown({ options, title, lg, md }: FormDropdownProps) {
//   const [roleOpen, toggleRole] = useToggle();

//   return (
//     <FormInputWrapper {...{ lg, md }}>
//       <label>{title}</label>

//       <Dropdown
//         onChange={(e) => console.log(e.target)}
//         className="form-control"
//         isOpen={roleOpen}
//         toggle={toggleRole}
//       >
//         <DropdownToggle className="text-lg w-100 text-left shadow-none" caret>
//           Select {title}
//         </DropdownToggle>
//         <DropdownMenu>
//           {options.map(({ children, ...others }, i) => {
//             return (
//               <DropdownItem key={i.toString()} {...others}>
//                 {children}
//               </DropdownItem>
//             );
//           })}
//         </DropdownMenu>
//       </Dropdown>
//     </FormInputWrapper>
//   );
// }
