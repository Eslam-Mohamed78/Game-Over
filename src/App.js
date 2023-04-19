import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  createHashRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import All from "./Components/All/All";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import SpecificGame from "./Components/SpecificGame/SpecificGame";
import Platforms from "./Components/Platforms/Platforms";
import SortBy from "./Components/SortBy/SortBy";
import Categories from "./Components/Categories/Categories";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import { Offline } from "react-detect-offline";
import { Toaster } from "react-hot-toast";

export default function App() {
  // to prevent routing without login /
  // first letter should be capital because this fucntion will be Component.
  function ProtectedRoute(props) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }

  const routers = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "all",
          element: (
            <ProtectedRoute>
              <All />
            </ProtectedRoute>
          ),
        },

        // Platform links
        {
          path: "Platforms/:platform",
          element: (
            <ProtectedRoute>
              <Platforms />
            </ProtectedRoute>
          ),
        },

        // Sort-By links
        {
          path: "sortby/:sort",
          element: (
            <ProtectedRoute>
              <SortBy />
            </ProtectedRoute>
          ),
        },

        // Categories links
        {
          path: "Categories/:categorie",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },

        {
          path: "specificGame/:id",
          element: (
            <ProtectedRoute>
              <SpecificGame />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Offline>
          <div className="offline text-danger rounded-2">
            We are Offline Now ! <i className="text-color fa-solid fa-wifi"> </i>
          </div>
        </Offline>
        <RouterProvider router={routers}></RouterProvider>
      </Provider>
    </>
  );
}
