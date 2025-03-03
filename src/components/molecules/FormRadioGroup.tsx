import { ChangeEventHandler, ReactNode } from "react";
import FormInputWrapper from "./FormInputWrapper";

type RadioGroupOption = string;

type RadioGroupProps = {
  options: RadioGroupOption[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label: string;
  md?: string;
  lg?: string;
  customLabel?: ReactNode;
};

export default function FormRadioGroup({
  options,
  label,
  onChange,
  lg,
  md,
  customLabel,
}: RadioGroupProps) {
  return (
    <FormInputWrapper {...{ md, lg }}>
      {customLabel ?? <label htmlFor={label}>{label}</label>}
      <div className="d-flex">
        {options.map((value, index) => {
          const isLastItem = options?.length - 1 === index;

          return (
            <div className={`radio-box ${!isLastItem ? "me-3" : ""}`}>
              <label htmlFor={label}>{value}</label>
              <input
                type="radio"
                id={label}
                value={value}
                name={label}
                onChange={onChange}
              />
            </div>
          );
        })}
      </div>
    </FormInputWrapper>
  );
}
