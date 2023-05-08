import styled from "styled-components";
import { Navbar } from "./component/navbar";
import { Playground } from "./component/playground";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { SignUp } from "./component/signup";
import { LogIn } from "./component/login";
import { PageNotFound } from "./component/page-not-found";
import { AdminContainer } from "./component/admin";
import { Home } from "./component/home";
import { HelloWorld } from "./component/admin/hello-world";
import { OneView } from "./component/admin/one-view";

const Appcontainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #120f17;
`;

function App() {
  return (
    <Appcontainer>
      <BrowserRouter>
        <Navbar />
        <Playground>
          <Routes>
            <Route
              path="/login"
              element={<RouteHandler path="login" Element={LogIn} />}
            />
            <Route
              path="/signup"
              element={<RouteHandler path="signup" Element={SignUp} />}
            />
            <Route
              path="/home"
              element={<RouteHandler path="home" Element={Home} />}
            />
            <Route
              path="/admin"
              element={<AdminContainer ChildComponents={<Outlet />} />}
            >
              <Route
                path="one-view"
                element={<RouteHandler path="one-view" Element={OneView} />}
              />
              <Route
                path="hello-world"
                element={
                  <RouteHandler path="hello-world" Element={HelloWorld} />
                }
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Playground>
      </BrowserRouter>
    </Appcontainer>
  );
}

const RouteHandler = function (props) {
  const nav = useNavigate();
  const { path, Element } = props;
  const isLoggedIn = sessionStorage.getItem("userName") || false;
  const isAdmin = sessionStorage.getItem("isAdmin");
  if (!isLoggedIn) {
    switch (path) {
      case "login": {
        return <LogIn />;
      }
      case "one-view": {
        return <LogIn />;
      }
      case "hello-world": {
        return <LogIn />;
      }
      case "admin": {
        return <LogIn />;
      }
    }
  } else {
    if (
      isAdmin !== "true" &&
      (path === "one-view" || path === "hello-world" || path === "admin")
    ) {
      nav("/home");
    }
    return <Element />;
  }
};
export default App;
