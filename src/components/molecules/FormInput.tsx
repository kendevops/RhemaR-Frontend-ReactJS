import { InputHTMLAttributes } from "react";
import FormInputWrapper from "./FormInputWrapper";

type FormInputProps = {
  label: string;
  lg?: string;
  md?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  lg,
  md,
  label,
  placeholder,
  ...others
}: FormInputProps) {
  return (
    <FormInputWrapper {...{ lg, md }}>
      <label htmlFor={others?.id}>{label}</label>
      <input
        className="form-control"
        placeholder={placeholder ?? label}
        {...others}
      />
    </FormInputWrapper>
  );
}
