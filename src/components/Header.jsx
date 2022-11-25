import Logo from "@/assets/logo.svg";
import { useLocation, useNavigate } from "react-router";
import useAuthStatus from "@/hooks/useAuthStatus.js";

const getNavItems = (loggedIn) => {
  return [
    { title: "Home", path: "/" },
    { title: "Offers", path: "/offers" },
    loggedIn
      ? { title: "Profile", path: "/profile" }
      : { title: "Sign In", path: "/sign-in" }
  ];
};

function Header(props) {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const pathMatchRoute = (route) => {
    return route === pathname ? true : "";
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 left-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div className=" ">
          <img
            src={Logo}
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex items-center space-x-10">
            {getNavItems(loggedIn).map(({ title, path }) => (
              <li
                key={path}
                onClick={() => navigate(path)}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoute(path) && "text-black border-b-red-500"
                }`}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
