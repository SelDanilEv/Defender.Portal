import { useRoutes } from "react-router-dom";
import { connect, Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
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
import DateLocales from "src/consts/DateLocales";

const App = (props: any) => {
  const content = useRoutes(router);

  // store.subscribe(() => {
  //   stateLoader.saveState(store.getState());
  // });

  return (
    <Provider store={store}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={DateLocales[props.currentLanguage]}>
          <AppToastContainer />
          <LoadingBar />
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentLanguage: state.session.language,
  };
};

export default connect(mapStateToProps)(App);
