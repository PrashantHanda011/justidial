import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RegisterUpload from "../../assets/RegisterUpload.svg";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";
import { Signup } from "../Axios/apis";
const ThirdPage = ({ show, formData, setFormData }) => {
  const [radio, setRadio] = useState(false);
  const [uplaodedFileName, setUploadFileName] = useState(null);
  const [uplaodedVatFile, setUploadVat] = useState(null);
  const UploadInput = useRef(null);
  const UploadVatInput = useRef(null);
  let navigate = useNavigate();
  function fileUploadHandler() {
    setUploadFileName(UploadInput.current.files[0]);
    setFormData({ ...formData, tradelicense: UploadInput.current.files[0] });
  }

  function fileUploadCloseHandler() {
    UploadInput.current.value = "";
    setUploadFileName(null);
    setFormData({ ...formData, tradelicense: "" });
  }
  function fileUploadVatHandler() {
    setUploadVat(UploadVatInput.current.files[0]);
    setFormData({
      ...formData,
      vatcertificate: UploadVatInput.current.files[0],
    });
  }

  function fileUploadVatCloseHandler() {
    UploadVatInput.current.value = "";
    setUploadVat(null);
    setFormData({ ...formData, vatcertificate: "" });
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData });
    const { name, email, phone, company,password, tradelicense, vatcertificate } =
      formData;
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("companyName", company);
    data.append("mobileNo", phone);
    data.append("password", password);
    data.append("tradeLicense", tradelicense);
    data.append("vatCertificate", vatcertificate);

    try {
      const res = await Signup(data);
      if (res?.status === 200) {
        alert("Profile Created Successfully");
        navigate("/");
      }
    } catch (error) {
      alert(error)
      console.log(error);
      
    }
  };
  return (
    <div style={{ display: show === 3 ? "grid" : "none" }}>
      <div className="login-Form">
        <h3 className="registerUpload">
          Upload Latest Trade license
          <span style={{ color: "#F05454" }}>* </span>
        </h3>
        <img
          src={RegisterUpload}
          alt="Upload"
          height="80px"
          style={{
            marginLeft: "10px",
            display: uplaodedFileName ? "none" : "inline-block",
          }}
        />
        <input
          ref={UploadInput}
          type="file"
          className="Reginput-file"
          onChange={fileUploadHandler}
        />
        <h3
          className="regupload-file"
          style={{ display: uplaodedFileName ? "inline-block" : "none" }}
        >
          {uplaodedFileName ? uplaodedFileName.name : ""}{" "}
          <AiOutlineClose
            size={20}
            color="red"
            title="remove"
            cursor="pointer"
            onClick={() => fileUploadCloseHandler()}
          />
          <br />
          <AiOutlineCloudUpload
            size={24}
            color="#1eaef1"
            title="update document"
          />
        </h3>
        <br />
        <h3 className="registerUpload">Vat certificate</h3>
        <div style={{ marginTop: "-10px", marginLeft: "10px" }}>
          <input
            type="radio"
            name="vat"
            value="vat"
            checked={radio}
            onChange={() => setRadio(true)}
          />
          &nbsp;
          <label for="vat" className="registerradio">
            {" "}
            Yes
          </label>
          &nbsp;
          <input
            type="radio"
            name="vat"
            value="vat"
            checked={!radio}
            onChange={() => {
              setRadio(false);
              UploadVatInput.current.value = "";
              setUploadVat(null);
            }}
          />
          &nbsp;
          <label for="vat" className="registerradio">
            {" "}
            No
          </label>
        </div>
        <h3
          className="registerUpload"
          style={{ display: !radio ? "none" : "flex" }}
        >
          Upload Vat Certificate<span style={{ color: "#F05454" }}>* </span>
        </h3>
        <img
          src={RegisterUpload}
          alt="Upload"
          height="80px"
          style={{
            display: !radio || uplaodedVatFile ? "none" : "flex",
            marginLeft: "10px",
          }}
        />
        <input
          ref={UploadVatInput}
          style={{ display: !radio || uplaodedVatFile ? "none" : "flex" }}
          type="file"
          className="Regvatinput-file"
          onChange={fileUploadVatHandler}
        />
        <h3
          className="regupload-file"
          style={{
            display: uplaodedVatFile && radio ? "inline-block" : "none",
          }}
        >
          {uplaodedVatFile ? uplaodedVatFile.name : ""}
          <AiOutlineClose
            size={20}
            color="red"
            title="remove"
            cursor="pointer"
            onClick={() => fileUploadVatCloseHandler()}
          />
          <br />
          <AiOutlineCloudUpload
            size={24}
            color="#1eaef1"
            title="update document"
          />
        </h3>
        <br />
        <Button
          className="button-submit"
          style={{ zIndex: 10 }}
          onClick={handlesubmit}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default ThirdPage;
