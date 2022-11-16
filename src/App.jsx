import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@p/Home.jsx";
import Profile from "@p/Profile.jsx";
import SignIn from "@p/SignIn.jsx";
import SignUp from "@p/SignUp.jsx";
import ForgotPassword from "@p/ForgotPassword.jsx";
import Offers from "@p/Offers.jsx";
import Header from "@com/Header.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </Router>
  );
}

export default App;
