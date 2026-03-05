import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.data);

  return (
    <nav className="flex justify-center item-center gap-x-25 p-5 mb-5">
      <NavLink to="/">Home</NavLink>

      {user ? (
        <>
          {user.isAdmin ? (
            <NavLink to="/admin/create-product">Create product</NavLink>
          ) : (
            ""
          )}
          <NavLink to="/admin/user-profile">Setting</NavLink>

          <NavLink to="/cart">Cart</NavLink>
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
