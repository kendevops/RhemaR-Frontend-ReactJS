// ** Router Import
import SocketWrapper from "./components/layouts/SocketWrapper";
import Router from "./router/Router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoleContextProvider } from "./utility/context/roleContext";
const queryclient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryclient}>
    <RoleContextProvider>
      <SocketWrapper>
        <Router />
      </SocketWrapper>
    </RoleContextProvider>
  </QueryClientProvider>
);

export default App;
