import { CSSProperties, ReactNode } from "react";

interface CardWrapperProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function CardWrapper({
  children,
  className,
  style,
}: CardWrapperProps) {
  return (
    <article
      className={`r-card bg-white px-5 py-4 mt-4 ${className}`}
      style={style}
    >
      {children}
    </article>
  );
}
