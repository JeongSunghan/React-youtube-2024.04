import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext();

  //유저가 존재하지않으면 홈으로 보냄
  if (!user)
    return <Navigate to='/' replace={true} />

  return children;
}