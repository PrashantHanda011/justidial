import React, { useContext } from "react";
import { UserContext } from "../../App";
import UserDetailTable from "./UserDetailTable";
import { Col, Row,Form, InputGroup } from "react-bootstrap";
import Filtericon from "../../assets/filter.svg";
import { BsSearch } from "react-icons/bs";
import CommonHeader from "../Header/Header";

const UserDetails = () => {
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
              <h3>Rohit Sharma</h3>
            </div>

            <div className="report-grid-main ">
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
                <h2 className="cdash1-text">Total Spending: 9000 INR</h2>
                <UserDetailTable page={1} total={12} />
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
