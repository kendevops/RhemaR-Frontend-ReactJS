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
        borderColor: isSelected ? tabColor ?? colors.primary : "white",
        borderTopWidth: "0px",
        borderRightWidth: "0px",
        borderLeftWidth: "0px",
        borderBottomWidth: "2px",
      }}
      onClick={onClick}
      className={`btn text-blue-500  pb-3 shadow-none text-lg ease-transition`}
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
