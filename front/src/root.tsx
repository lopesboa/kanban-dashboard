import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));

function Root() {
  return (
    <Suspense
      fallback={
        <BrowserRouter basename={'/'}>
          <p>Carregando...</p>
        </BrowserRouter>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Home />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

export default Root;
