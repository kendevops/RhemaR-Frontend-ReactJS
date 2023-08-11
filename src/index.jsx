// ** React Imports
import { Suspense } from "react";
import ReactDOM from "react-dom";

// ** Redux Imports
import { Provider } from "react-redux";
import { store } from "./redux/store";

// ** Lazy load app
// const LazyApp = lazy(() => import("./App"));
import App from "./App";

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

// ** Extra Styles
import "./assets/styles/student.css";
import "./assets/styles/style.css";

// ** Service Worker
import * as serviceWorker from "./serviceWorker";

// ** Fake Database
// import './@fake-db'


ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <AbilityContext.Provider value={ability}>
        <ThemeContext>
          <App />
          <ToastContainer newestOnTop />
        </ThemeContext>
      </AbilityContext.Provider>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
