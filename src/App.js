// ** Router Import
import SocketWrapper from "./components/layouts/SocketWrapper";
import Router from "./router/Router";
import "react-confirm-alert/src/react-confirm-alert.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryclient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryclient}>
    <SocketWrapper>
      <Router />
    </SocketWrapper>
  </QueryClientProvider>
);

export default App;
