import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
const Products = lazy(() => import("../pages/Products"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetails = lazy(() => import("../pages/admin/ProductDetails"));
const ProfileUser = lazy(() => import("../pages/user/ProfileUser"));
const PageNotFound = lazy(() => import("../PageNotFound"));
const AuthWrapper = lazy(() => import("./AuthWrapper"));
const LoginWrapper = lazy(() => import("./loginWrapper"));
const Cart = lazy(() => import("../pages/user/Cart"));

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      {/* <Route path="/products" element={} /> */}
      <Route
        path="/login"
        element={
          <LoginWrapper>
            <Login />
          </LoginWrapper>
        }
      />

      <Route path="/register" element={<Register />} />

      <Route
        path="/admin/user-profile"
        element={
          <AuthWrapper>
            <ProfileUser />
          </AuthWrapper>
        }
      />

      <Route
        path="/admin/create-product"
        element={
          <AuthWrapper>
            <CreateProduct />
          </AuthWrapper>
        }
      />
      {/* cart */}
      <Route
        path="/cart"
        element={
          <AuthWrapper>
            <Cart />
          </AuthWrapper>
        }
      />

      <Route
        path="/admin/product/:id"
        element={
          <AuthWrapper>
            <ProductDetails />
          </AuthWrapper>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Mainroutes;
