// ** Router Import
import SocketWrapper from "./components/layouts/SocketWrapper";
import Router from "./router/Router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoleContextProvider } from "./utility/context/roleContext";
import { AccessContextProvider } from "./utility/context/accessContext";
const queryclient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryclient}>
    <RoleContextProvider>
      <AccessContextProvider>
        <SocketWrapper>
          <Router />
        </SocketWrapper>
      </AccessContextProvider>
    </RoleContextProvider>
  </QueryClientProvider>
);

export default App;
