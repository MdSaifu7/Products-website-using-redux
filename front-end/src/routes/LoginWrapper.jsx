import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginWrapper = (props) => {
  const user = useSelector((state) => state.userReducer.data);
  return user ? <Navigate to="/" /> : props.children;
};

export default LoginWrapper;
