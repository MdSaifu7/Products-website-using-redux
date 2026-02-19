import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProduct from "../pages/admin/CreateProduct";
import ProductDetails from "../pages/admin/ProductDetails";
import { useSelector } from "react-redux";
import ProfileUser from "../pages/user/ProfileUser";
import PageNotFound from "../PageNotFound";
import AuthWrapper from "./AuthWrapper";
import LoginWrapper from "./loginWrapper";
const Mainroutes = () => {
  const user = useSelector((state) => state.userReducer.data);
  console.log(user);
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
