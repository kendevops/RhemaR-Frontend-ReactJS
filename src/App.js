// ** Router Import
import Router from "./router/Router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryclient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryclient}>
    <Router />
  </QueryClientProvider>
);

export default App;
