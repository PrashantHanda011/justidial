import React, { useContext } from "react";
import { UserContext } from "../../App";
import Group from "../../assets/group.png";
import Design from "../../assets/design.png";
import Cash from "../../assets/cash.png";
import AstroDetailTable from "./AstroDetailTable";
import { Col, Row, Button, Form, InputGroup } from "react-bootstrap";
import Filtericon from "../../assets/filter.svg";
import { BsSearch } from "react-icons/bs";
import CommonHeader from "../Header/Header";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

const AstroDetails = () => {
  const { show } = useContext(UserContext);
  return (
    <>
      <div className="main-div">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
          <Row>
            <CommonHeader />
            <div style={{ display: "grid", marginBottom: "2em" }}>
              <h3>Naman</h3>
              <div
                class={
                  show
                    ? "report-top-right-button"
                    : "report-top-right-button-collapse"
                }
              >
                <Button className="report-button">
                  <FiDownload size={22} /> View Aadhar
                  <MdKeyboardArrowDown size={25} />
                </Button>
                <Button className="report-button">
                  <FiDownload size={22} /> View PanCard
                  <MdKeyboardArrowDown size={25} />
                </Button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div
                className="card-main"
                style={{
                  width: "250px",
                  height: "150px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "1em",
                  }}
                >
                  <img src={Group} alt="group" width="70px" height="70px" />

                  <h4 style={{ marginTop: "15px" }}>
                    12,500
                    <br />
                    <p
                      style={{
                        color: "#aeafae",
                        fontSize: "12px",
                        fontWeight: "650",
                      }}
                    >
                      Total User entertain
                    </p>
                  </h4>
                </span>
              </div>
              <div
                className="card-main"
                style={{ width: "250px", height: "150px" }}
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "1em",
                  }}
                >
                  <img src={Design} alt="Design" width="70px" height="70px" />

                  <h4>
                    Bank Details
                    <br />
                    <p
                      style={{
                        color: "#aeafae",
                        fontSize: "12px",
                        fontWeight: "650",
                      }}
                    >
                      SBI
                      <br />
                      Acc.No-2222222222
                      <br />
                      Branch-Sbi
                    </p>
                  </h4>
                </span>
              </div>
              <div
                className="card-main"
                style={{ width: "250px", height: "150px" }}
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "1em",
                  }}
                >
                  <img src={Cash} alt="Cash" width="70px" height="70px" />

                  <h4 style={{ marginTop: "15px" }}>
                    12,500
                    <br />
                    <p
                      style={{
                        color: "#aeafae",
                        fontSize: "12px",
                        fontWeight: "650",
                      }}
                    >
                      Total Earn
                    </p>
                  </h4>
                </span>
              </div>
            </div>
            <div className="report-grid-main pt-5">
              <div
                className={
                  show ? "report-search-item" : "report-search-item-collapse"
                }
              >
                <Form>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="rsearch-button-icon">
                      <BsSearch size={20} />
                    </InputGroup.Text>
                    <Form.Control
                      className="rsearch-bar"
                      type="text"
                      placeholder="Search. Customer name, Type, Phone No"
                    />
                  </InputGroup>
                </Form>
              </div>
              <div
                class={
                  show
                    ? "report-top-right-button"
                    : "report-top-right-button-collapse"
                }
              >
                <span style={{ display: "flex" }}>
                  <Form.Control
                    className="rsearch-bar"
                    type="date"
                    value="2022-06-25"
                    style={{
                      marginRight: "8em",
                      width: "10em",
                      borderLeft: "1.5px solid",
                    }}
                  />

                  {/* <Button className="report-button">
                          <AiFillPrinter size={25} /> Print
                        </Button> */}
                  <span className="report-span-filter">
                    <img src={Filtericon} alt="Filter" />
                    Filter
                  </span>
                </span>
              </div>
            </div>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h2 className="cdash1-text">Total Earning : 8000 INR</h2>
                <AstroDetailTable page={1} total={12} />
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AstroDetails;
