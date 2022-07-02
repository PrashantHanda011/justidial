import React, { useEffect } from "react";
import User from "../../assets/user.svg";
import { Col, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
const CommonHeader = () => {
  const navigate = useNavigate();
const logout =()=>{
  Cookies.remove('Token')
  window.location.reload(); 
}
  useEffect(() => {
    if (!Cookies.get("Token")) {
      navigate("/");
      window.location.reload();
    }
  }, []);

  return (
    <Row
      style={{
        boxShadow: " rgba(0, 0, 0, 0.45) 0px 15px 15px -20px",
        marginBottom: "2em",
      }}
    >
      <Col>
      
      </Col>
      <Col lg={4}>
        <div style={{ display: "flex", marginRight: "50px",float:  "right" }}>
          {/* <div className="notification-icon">
            <img alt="notification" src={Notificationicon} width="14px" />
            <p style={{ color: "white" }}>15</p>
          </div> */}
          &nbsp;&nbsp;
          <div style={{ display: "flex" }}>
            <img
              alt="user"
              src={User}
              style={{ marginTop: "7px" }}
              width="30px"
            />
            <p
              className={"logout-main mt-4"}
              style={{ fontWeight: "600", cursor: "pointer",color:'#FF9933' }}
            >
              
              &nbsp;&nbsp; ADMIN PANEL
              <span>
                <BiLogOutCircle size={21} title="Logout" cursor="pointer" onClick={logout} />
              </span>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CommonHeader;
