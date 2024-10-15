import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-lg border-b border-gray-200">
      <Link
        to="/"
        className="text-3xl font-extrabold text-blue-600 logo hover:text-blue-700 transition duration-300"
      >
        MyBlog
      </Link>
      <nav className="flex items-center gap-8">
        {username ? (
          <>
            <Link
              to="/create"
              className="text-base font-semibold text-gray-700 hover:text-blue-600 transition duration-300"
            >
              Create Post
            </Link>
            <button
              onClick={logout}
              className="text-lg font-semibold text-gray-100 hover:text-red-600 transition duration-300"
            >
              Logout ({username})
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 font-medium shadow"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-transparent border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 font-medium shadow"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
