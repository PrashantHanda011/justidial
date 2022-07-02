import React, { useState } from "react";
import "./register.css";
import Navbar from "../Navbar/Navbar";
import LoginItem from "../../assets/LoginItem.svg";
import LoginImage from "../../assets/register.svg";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
const initialData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  password: "",
  tradelicense: "",
  vatcertificate: "",
};
const Register = () => {
  const [show, setState] = useState(1);
  const [formData, setFormData] = useState(initialData);

  console.log(formData);
  return (
    <>
      <Navbar />
      <div className="landing-main">
        <div className="landing-Form-main" style={{ marginTop: "150px" }}>
          <div className="landing-title">Sign up</div>
          <div
            style={{ fontWeight: 400, fontSize: "20px", marginTop: "-10px" }}
            className="landing-title"
          >
            &nbsp;We are happy to have you !
          </div>
          {/* First Register page  */}
          <FirstPage show={show} setState={setState} />
          {/* Second Register page  */}
          <SecondPage
            show={show}
            setState={setState}
            formData={formData}
            setFormData={setFormData}
          />
          {/* Third Register page  */}
          <ThirdPage
            show={show}
            setState={setState}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="landing-grid2">
          <img src={LoginImage} className="landing-image" alt="landing" />
        </div>
        <img src={LoginItem} className="landing-item" alt="LoginItem" />
      </div>
    </>
  );
};

export default Register;
