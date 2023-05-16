import { MouseEventHandler, ReactNode } from "react";

export interface TabSelectOptionProps {
  isActive: boolean;
  element: ReactNode;
  key: string;
  onPress?: MouseEventHandler;
}

interface TabSelectProps {
  options: TabSelectOptionProps[];
}

interface Styles {
  isActive: boolean;
}

export default function TabSelect({ options }: TabSelectProps) {
  return (
    <ul
      style={{
        display: "flex",
        padding: "0.5rem",
        borderRadius: "2rem",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #e8e8e8",
        background: "#F5F7F9",
      }}
    >
      {options.map(({ element, isActive, key, onPress }, i) => {
        return (
          <li key={key}>
            <button
              onClick={onPress}
              className={`ease-transition ${isActive && "sleek-shadow"}`}
              style={{
                padding: "0.5rem 1rem",
                fontWeight: "600",
                color: isActive ? "#333" : "#A5A5A5",
                textDecoration: "none",
                border: isActive ? "1px solid #e8e8e8" : "none",
                backgroundColor: isActive ? "#FFF" : "transparent",
                borderRadius: "1rem",
                marginRight: i === options.length - 1 ? "" : "0.625rem",
              }}
            >
              {element}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
