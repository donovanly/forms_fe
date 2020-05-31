import React, { Fragment, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./saas/theme";
import GlobalStyles from "./saas/GlobalStyles";
import Pace from "./saas/shared/components/Pace";

const LoggedInComponent = lazy(() => import("./saas/logged_in/components/Main"));
const LoggedOutComponent = lazy(() => import("./saas/logged_out/components/Main"));


function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Pace color={theme.palette.primary.light} />
        <Suspense fallback={<Fragment />}>
          <Switch>
            <Route path="/c">
              <LoggedInComponent />
            </Route>
            <Route>
              <LoggedOutComponent />
            </Route>
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
