import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { CssBaseline } from "@mui/material";

import stateLoader from "src/state/StateLoader";
import store from "src/state/store";
import LoadingBar from "src/components/LoadingBar/LoadingBar";
import AppToastContainer from "src/components/ToastContainer";
import ThemeProvider from "src/theme/ThemeProvider";
import router from "src/router";

import "src/custom.css";
import "react-toastify/dist/ReactToastify.css";

import "src/localization/i18n";

function App() {
  const content = useRoutes(router);

  store.subscribe(() => {
    stateLoader.saveState(store.getState());
  });

  return (
    <Provider store={store}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AppToastContainer />
          <LoadingBar />
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
