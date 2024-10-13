import { ProtectedComponent } from "@/components";
import { AuthLayout, RootLayout } from "@/layout";
import { LoginForm, RegisterForm } from "@/pages";
import { store } from "@/store/index.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./style/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        element: <ProtectedComponent />,
        children: [
          {
            path: "/auth",
            element: <AuthLayout />,
            children: [
              {
                path: "login",
                element: <LoginForm />,
              },
              {
                path: "register",
                element: <RegisterForm />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  </StrictMode>
);
