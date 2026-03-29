import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.data);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-black bg-gray-100 px-3 py-1 rounded-lg"
      : "text-gray-500 hover:text-black hover:bg-gray-100 px-3 py-1 rounded-lg transition";

  return (
    <nav className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-lg sm:text-xl font-semibold text-black">MyStore</h1>

        {/* Links */}
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>

          {user ? (
            <>
              {user.isAdmin && (
                <NavLink to="/admin/create-product" className={linkStyle}>
                  Create
                </NavLink>
              )}

              <NavLink to="/admin/user-profile" className={linkStyle}>
                Profile
              </NavLink>

              <NavLink to="/cart" className={linkStyle}>
                Cart
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className="bg-black text-white px-4 py-1.5 rounded-lg hover:bg-gray-800 transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
