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
import Connect from "./pages/private/automate/Connect";
import SettingLayout from "./pages/private/setting/SettingLayout";
import IntegrationPage from "./pages/private/setting/IntegrationsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/landing" element={<Landingpage />} />
        <Route element={<AuthenticationLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignIn />} />
        </Route>
        <Route path="/" element={<AutomateLayout />}>
          <Route path="new" element={<Connect />} />

          <Route path="/settings" element={<SettingLayout />}>
            <Route path="integrations" element={<IntegrationPage />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

export default router;
