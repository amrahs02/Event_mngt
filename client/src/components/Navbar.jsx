import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md rounded-2xl mx-4 mt-4 px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
      {/* Left: Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
      >
        Event Management App
      </Link>

      {/* Right: Navigation Links */}
      <div className="flex flex-wrap items-center gap-4 mt-3 sm:mt-0">
        <Link
          to="/events"
          className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
        >
          Events
        </Link>

        {token ? (
          <>
            <Link
              to="/add-event"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Add Event
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
