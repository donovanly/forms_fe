import React, { Fragment, Suspense, lazy } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./saas/theme";
import GlobalStyles from "./saas/GlobalStyles";
import Pace from "./saas/shared/components/Pace";
import { AuthRoute } from './saas/shared/components/AuthRoute'

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
            <AuthRoute path="/c" type="private">
              <LoggedInComponent />
            </AuthRoute>
            <AuthRoute path="" type="guest">
              <LoggedOutComponent />
            </AuthRoute>
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
