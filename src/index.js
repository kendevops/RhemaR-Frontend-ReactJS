// ** React Imports
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

// ** Redux Imports
import { Provider } from "react-redux";
import { store } from "./redux/store";

// ** Intl, CASL & ThemeColors Context
import ability from "@configs/acl/ability";
import { ToastContainer } from "react-toastify";
import { AbilityContext } from "@context/can";
import { ThemeContext } from "@context/themeColors";

// ** i18n
import "@configs/i18n";

// ** Spinner (Splash Screen)
import Spinner from "@components/spinner/Fallback-spinner";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Core styles
import "@styles/index.scss";

// ** Service Worker
import * as serviceWorker from "./serviceWorker";

// ** Fake Database
import './@fake-db'

// ** Lazy load app
const LazyApp = lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <AbilityContext.Provider value={ability}>
        <ThemeContext>
          <LazyApp />
          <ToastContainer newestOnTop />
        </ThemeContext>
      </AbilityContext.Provider>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
