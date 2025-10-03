
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "./index.css";

import router from "./Router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./components/Other/theme/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>

   <ThemeProvider defaultTheme="system" storageKey="theam">

 
    <RouterProvider router={router} />
      </ThemeProvider>
     </Provider>
  </StrictMode>
);
