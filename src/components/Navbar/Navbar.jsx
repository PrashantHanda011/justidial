import React from "react";
import "./navbar.css";
import Logo from "../../assets/Logo.svg";
// import Face from "../../assets/Face.svg";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  let navigate = useNavigate();
  return (
    <div className="navbar-main">
      <img src={Logo} alt="Logo" className="navLogo" />
      <p className="navLogo-name" onClick={() => navigate("/")}>Rent Out</p>
      {/* <p className="navRegister"  onClick={() => navigate("/register")}>
        Dont have an account? <b style={{ color: "#385E54" }}>Register</b>{" "}
       
      </p> */}
      {/* <img src={Face} alt="Logo" className="navRegisterLogo" />{" "} */}
    </div>
  );
};

export default Navbar;
