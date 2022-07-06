import { Route, Switch } from "react-router-dom";
import { memo, VFC } from "react";

import { Pagenation } from "../components/pages/Pagenation";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { homeRoutes } from "./HomeRoutes";
import { everyRoutes } from "./EveryRoutes";
import { LoginUserProvider } from "../providers/LoginUserProviderst";
import { useAuth } from "../hooks/useAuth";
import { EveryHome } from "../components/pages/every/EveryHome";
import { Login } from "../components/pages/Login";
import { Register } from "../components/pages/Register";

export const Router: VFC = memo(() => {
  const { auth } = useAuth();

  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/auth">
          <HeaderLayout>
            <Login />
          </HeaderLayout>
        </Route>
        {auth && (
          <Route exact path="/auth/register">
            <HeaderLayout>
              <Register />
            </HeaderLayout>
          </Route>
        )}
        {auth && (
          <Route exact path="/">
            <HeaderLayout>
              <EveryHome />
            </HeaderLayout>
          </Route>
        )}
        {auth && (
          <Route
            path="/every"
            render={({ match: { url } }) => (
              <Switch>
                {everyRoutes.map((route) => (
                  <Route
                    key={route.path}
                    exact={route.exact}
                    path={`${url}${route.path}`}
                  >
                    <HeaderLayout>{route.children}</HeaderLayout>
                  </Route>
                ))}
                <Route path="*">
                  <Page404 />
                </Route>
              </Switch>
            )}
          />
        )}
        {/* <Route
          path="/auth"
          render={({ match: { url } }) => (
            <Switch>
              {homeRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <HeaderLayout>{route.children}</HeaderLayout>
                </Route>
              ))}
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          )}
        /> */}
      </LoginUserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
});
