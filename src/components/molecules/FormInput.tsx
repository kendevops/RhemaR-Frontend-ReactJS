import { InputHTMLAttributes } from "react";
import FormInputWrapper from "./FormInputWrapper";
import { Input } from "reactstrap";

type FormInputProps = {
  label: string;
  lg?: string;
  md?: string;
  hasErrors?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  lg,
  md,
  label,
  placeholder,
  hasErrors,
  ...others
}: FormInputProps) {
  return (
    <FormInputWrapper {...{ lg, md }}>
      <label htmlFor={others?.id}>{label}</label>
      <Input
        className="form-control"
        placeholder={placeholder ?? label}
        {...others}
        style={{
          ...others.style,
          borderColor: hasErrors ? "red" : "",
          borderStyle: hasErrors ? "solid" : "none",
        }}
        invalid={hasErrors}
        type={others.type as any}
      />
    </FormInputWrapper>
  );
}
