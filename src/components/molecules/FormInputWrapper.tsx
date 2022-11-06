import { ReactNode } from "react";

type FormInputWrapperProps = {
  children: ReactNode;
  lg?: string;
  md?: string;
};

export default function FormInputWrapper({
  children,
  lg,
  md,
}: FormInputWrapperProps) {
  return (
    <div className={` col-lg-${lg ?? 12} col-md-${md ?? 12} col-12 `}>
      <div className="form-group">{children}</div>
    </div>
  );
}
