import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import "./dashboard.css";
import { DashUsers } from "../Axios/apis";
import Cookies from "js-cookie";
import { Row, Form, InputGroup } from "react-bootstrap";
import CommonHeader from "../Header/Header";
import { BsSearch } from "react-icons/bs";

import TableData from "./Table";

const ClientDashboard = () => {
  const { show } = useContext(UserContext);
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState([]);
  let id = Cookies.get("Token");

  const FetchUsers = async () => {
    try {
      const { data } = await DashUsers(id);
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchUsers();
  }, []);

  console.log(user);
  return (
    <>
      <div className="main-div">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
          <Row>
            <CommonHeader />
            {user?.length !== 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="card-Dash text-start p-4">
                    <p> Total Users</p>

                    <h2 className="mt-4">{user?.count}</h2>
                  </div>

                  <Form className="search-main">
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="rsearch-button-icon">
                        <BsSearch size={20} />
                      </InputGroup.Text>
                      <Form.Control
                        className="rsearch-bar"
                        type="text"
                        placeholder="Search"
                      />
                    </InputGroup>
                  </Form>
                </div>
                <div className="d-flex justify-content-end">
                  <input type="date" className="date-calendar" />
                </div>
                <Row style={{ marginTop: "20px" }}>
                  <TableData
                    filter={filter}
                    setPage={setPage}
                    user={user?.users}
                  />
                </Row>
              </>
            ) : (
              <div className="d-flex justify-content-center mt-5">
                <div className="loading-main ">
                  <div className="loader"/>
                </div>
              
              </div>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;
