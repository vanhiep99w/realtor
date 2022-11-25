import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "@/components/Header.jsx";
import Profile from "@/pages/Profile.jsx";
import SignIn from "@/pages/SignIn.jsx";
import SignUp from "@/pages/SignUp.jsx";
import ForgotPassword from "@/pages/ForgotPassword.jsx";
import Offers from "@/pages/Offers.jsx";
import Home from "@/pages/Home.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "@/components/PrivateRoute.jsx";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </Router>
      <ToastContainer/>
    </>

  );
}

export default App;
