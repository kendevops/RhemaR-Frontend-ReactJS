import { createContext, useCallback, useState } from "react";
import deepEqual from "../../utils/deepEqual";

//access = {action, resource}[]
//update access =
//can access = userAccess?.includes(resource)

interface access {
  action: string;
  resource: string;
}

interface accessContextProps {
  access: access[];
  updateAccess: (access: access[]) => void;
  canAccess: (resource: access) => boolean;
}

interface accessContextProviderProps {
  children: string;
}

const AccessContext = createContext<accessContextProps>({
  access: [],
  canAccess: (res) => false,
  updateAccess: (access) => {},
});

export function AccessContextProvider({
  children,
}: accessContextProviderProps) {
  const [access, setAccess] = useState<accessContextProps["access"]>([]);

  const canAccess = useCallback(
    (resource) => {
      const match = access.some((obj) => {
        console.log({ obj, res: resource, outcome: deepEqual(resource, obj) });

        return deepEqual(resource, obj);
      });

      return match;
    },
    [access]
  );

  const updateAccess = useCallback(
    (accs) => {
      accs !== access && setAccess(accs);
    },
    [access]
  );

  return (
    <AccessContext.Provider
      value={{
        access,
        canAccess,
        updateAccess,
      }}
    >
      {children}
    </AccessContext.Provider>
  );
}

export default AccessContext;
