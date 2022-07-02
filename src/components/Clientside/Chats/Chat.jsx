import React, { useContext } from "react";
import { UserContext } from "../../../App";
import { Col, Row } from "react-bootstrap";
import CommonHeader from "../../Header/Header";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./chat.css";
import User from "../../../assets/user.svg";

const ClientChat = () => {
  const { show } = useContext(UserContext);
  return (
    <>
      <div className="main-div">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
          <CommonHeader title="Chats" />
          <Row>
            <Col className="Cchat-main" lg={12}>
              <div className="Cchat-top">
                <span style={{ display: "flex" }}>
                  <img
                    alt="user"
                    src={User}
                    style={{ borderRadius: "50%" }}
                    width="30px"
                    height="30px"
                  />
                  <h5
                    style={{
                      color: "#000000",
                      fontWeight: "600",
                      fontSize: "16px",
                      padding: "5px 0px 0px 0px",
                    }}
                  >
                    &nbsp;&nbsp; Tony Stark
                  </h5>
                </span>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginRight: "15px",
                  }}
                >
                  <BsThreeDotsVertical size={22} color="#C2CFE0" />
                </span>
              </div>
              <hr style={{ width: "99%" }} />
              <div style={{ padding: "15px" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <img
                      alt="user"
                      src={User}
                      style={{ borderRadius: "50%" }}
                      width="20px"
                      height="20px"
                    />
                    <h5
                      style={{
                        color: "#000000",
                        fontWeight: "600",
                        fontSize: "12px",
                        padding: "5px 0px 20px 0px",
                      }}
                    >
                      &nbsp;&nbsp; Tony Stark
                    </h5>

                    <h5
                      style={{
                        color: "#90A0B7",
                        fontWeight: "600",
                        fontSize: "10px",
                        padding: "8px 0px 0px 10px",
                      }}
                    >
                      11:20pm
                    </h5>
                  </div>
                  <div className="cchat-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Nibh mauris cursus mattis molestie. Ligula
                    ullamcorper malesuada proin libero nunc consequat interdum.
                    A lacus vestibulum sed arcu non odio euismod lacinia.
                    Aliquet eget sit amet tellus cras adipiscing enim.
                  </div>
                </div>
                <div style={{ float: "right" }}>
                  <div style={{ display: "flex" }}>
                    <img
                      alt="user"
                      src={User}
                      style={{ borderRadius: "50%" }}
                      width="20px"
                      height="20px"
                    />
                    <h5
                      style={{
                        color: "#000000",
                        fontWeight: "600",
                        fontSize: "12px",
                        padding: "5px 0px 20px 0px",
                      }}
                    >
                      &nbsp;&nbsp; You
                    </h5>

                    <h5
                      style={{
                        color: "#90A0B7",
                        fontWeight: "600",
                        fontSize: "10px",
                        padding: "8px 0px 0px 10px",
                      }}
                    >
                      11:22pm
                    </h5>
                  </div>
                  <div
                    className="cchat-text"
                    style={{ backgroundColor: "#fff", color: "#112D57" }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Id aliquet lectus proin nibh nisl. Suspendisse
                    faucibus interdum posuere lorem ipsum dolor sit amet
                    consecteturg.
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ClientChat;
