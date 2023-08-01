import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function Row({ children, className, style }: Props) {
  return (
    <div className={`row ${className}`} style={style}>
      {children}
    </div>
  );
}
