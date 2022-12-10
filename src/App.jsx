import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "@/components/Header.jsx";
import Profile from "@/pages/Profile.jsx";
import SignIn from "@/pages/SignIn.jsx";
import SignUp from "@/pages/SignUp.jsx";
import ForgotPassword from "@/pages/ForgotPassword.jsx";
import Offers from "@/pages/Offers.jsx";
import Home from "@/pages/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "@/components/PrivateRoute.jsx";
import CreateListing from "@/pages/CreateListing.jsx";
import EditListing from "@/pages/EditListing.jsx";

const PUBLIC_ROUTES = [
  { path: "/", element: <Home /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/offers", element: <Offers /> }
];

const PRIVATE_ROUTES = [
  { rootPath: "/profile", children: [{ path: "", element: <Profile /> }] },
  {
    rootPath: "/create-listing",
    children: [{ path: "", element: <CreateListing /> }]
  },
  {
    rootPath: "/edit-listing",
    children: [{ path: ":listingId", element: <EditListing /> }]
  }
];

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          {PUBLIC_ROUTES.map(({ path, element }) => (
            <Route path={path} element={element} key={path} />
          ))}
          {PRIVATE_ROUTES.map(({ rootPath, children }) => (
            <Route path={rootPath} element={<PrivateRoute />} key={rootPath}>
              {children.map(({ path, element }) => (
                <Route path={path} element={element} key={path} />
              ))}
            </Route>
          ))}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
