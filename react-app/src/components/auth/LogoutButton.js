import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div onClick={onLogout}>
      <NavLink to="/" exact={true} activeClassName="active">
          Logout
      </NavLink>
    </div>
  );
};

export default LogoutButton;
