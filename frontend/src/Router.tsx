import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import Landingpage from "./pages/public/Landingpage";
import Login from "./pages/public/Authentication/Login";
import SignIn from "./pages/public/Authentication/SignIn";
import AuthenticationLayout from "./pages/public/Authentication/AuthenticationLayout";
import AutomateLayout from "./pages/private/automate/AutomateLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Landingpage />} />
        <Route element={<AuthenticationLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignIn />} />
        </Route>
            <Route path="/automate"  element={   <AutomateLayout/>}>
                   
            </Route>
      </Route>
    </>
  )
);

export default router;
