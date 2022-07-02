import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { AllUsers } from "../Axios/apis";
import Cookies from "js-cookie";
// import Group from "../../assets/group.png";
// import Design from "../../assets/design.png";
// import Cash from "../../assets/cash.png";
// import BarChart from "./BarChart";
import { Row, Form, InputGroup } from "react-bootstrap";
import CommonHeader from "../Header/Header";
import { BsSearch } from "react-icons/bs";
// import { AiFillQuestionCircle, AiOutlineCaretDown } from "react-icons/ai";
import TableData from "./Table";

const UsersManage = () => {
  const { show } = useContext(UserContext);
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState([]);
  let id = Cookies.get("Token");

  const FetchUsers = async () => {
    try {
      const { data } = await AllUsers(id);
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className="card-Dash text-start "
                style={{ backgroundColor: "transparent", height: "0" }}
              >
                <h2 className="mt-4">Users Management</h2>
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
            {user?.length !== 0 ? (
              <>
                {" "}
                <div className="d-flex justify-content-end">
                  <input type="date" className="date-calendar" />
                </div>
                <Row style={{ marginTop: "20px" }}>
                  <TableData
                    filter={filter}
                    setPage={setPage}
                    user={user}
                  />
                </Row>
              </>
            ) : (
              <div className="d-flex justify-content-center mt-5">
                <div className="loading-main ">
                  <div className="loader" />
                </div>
              </div>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default UsersManage;
