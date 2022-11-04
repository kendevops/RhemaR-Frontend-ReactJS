import { CSSProperties, ReactNode } from "react";

type ColWrapperProps = {
  children: ReactNode;
  lg?: string;
  md?: string;
  style?: CSSProperties;
  className?: string;
};

export default function ColWrapper({
  children,
  lg,
  md,
  style,
  className,
}: ColWrapperProps) {
  return (
    <div
      className={`col-lg-${lg ?? 6} col-md-${md ?? 6} col-12 mb-4 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
