import { HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import colors from "../../assets/img/Colors";

interface TabProps {
  isSelected: boolean;
  onClick?: MouseEventHandler;
  children: ReactNode;
  tabColor?: string;
}

type TabWrapperProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Tab({
  isSelected,
  onClick,
  children,
  tabColor,
}: TabProps) {
  return (
    <button
      type="button"
      role={"tab"}
      style={{
        borderRadius: "0px",
        borderColor: tabColor,
        borderTopWidth: "2px",
        borderRightWidth: "2px",
        borderLeftWidth: "2px",
        borderBottomWidth: "2px",
        color: isSelected ? "white" ?? colors.primary : tabColor,
        // border: "2px",
        background: isSelected ? tabColor ?? colors.primary : "white",
      }}
      onClick={onClick}
      className="btn text-blue-500 px-4  pb-3 shadow-none text-xl ease-transition"
    >
      {children}
    </button>
  );
}

function Wrapper({ children, ...others }: TabWrapperProps) {
  return (
    <div
      role={"tabpanel"}
      className="d-flex px-2 gap-3 border-bottom "
      {...others}
    >
      {children}
    </div>
  );
}

Tab.Wrapper = Wrapper;
