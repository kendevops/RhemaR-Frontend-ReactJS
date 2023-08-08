import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface ContextProps {
  currentRole: string;
  setCurrentRole: Dispatch<SetStateAction<string>>;
}

const RoleContext = createContext<ContextProps>({
  currentRole: "",
  setCurrentRole: () => {},
});

export function RoleContextProvider({ children }: Props) {
  const [currentRole, setCurrentRole] = useState("");

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setCurrentRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export default RoleContext;
