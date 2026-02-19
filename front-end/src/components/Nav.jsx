import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const user = useSelector((state) => state.userReducer);

  // const logOutUser = () => {
  //   dispatch(asyncLogoutUser());
  //   navigate("/login");
  // };

  return (
    <nav className="flex justify-center item-center gap-x-25 p-5 mb-5">
      <NavLink to="/">Home</NavLink>

      {user.data ? (
        <>
          {user.data.isAdmin ? (
            <NavLink to="/admin/create-product">Create product</NavLink>
          ) : (
            ""
          )}
          <NavLink to="/admin/user-profile">Setting</NavLink>
          {/* <button
            onClick={() => {
              logOutUser();
            }}
            className="text-red-600 font-medium"
          >
            Log Out
          </button> */}
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}

      {/* <NavLink to="/admin-update-product/:id">Update Product</NavLink>
      <NavLink to="/admin-delete-product/:id">Delete Product</NavLink> */}
    </nav>
  );
};

export default Nav;
