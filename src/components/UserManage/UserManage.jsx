import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { AllUsers, FetchSearch } from "../Axios/apis";
import { Row, Form, InputGroup, Button } from "react-bootstrap";
import CommonHeader from "../Header/Header";
import { BsSearch, BsFillCalendarDateFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableData from "./Table";

const UsersManage = () => {
  const { show } = useContext(UserContext);
  const [filter, setFilter] = useState(false);
  const [user, setUser] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const FetchUsers = async () => {
    try {
      const { data } = await AllUsers();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchUsers();
  }, []);
  let currentdate = new Date();
  let lastSevenDay = new Date();
  lastSevenDay.setDate(lastSevenDay.getDate() - 13);
  let lastOneDay = new Date();
  lastOneDay.setDate(lastOneDay.getDate() - 1);
  const FilterUsers = async (a,b) => {
    let NewData = { from: a, to: b };
    try {
      const { data } = await AllUsers(NewData);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
    setFilter(false);
  };
  const Reset = () => {
    FetchUsers();
    setFilter(false);
    setStartDate("");
    setToDate("");
  };
  useEffect(() => {
    const SearchUser = async () => {
      let NewData = { name: search };
      try {
        const { data } = await FetchSearch(NewData);
        setSearchData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    SearchUser();
  }, [search]);
  let result = search?.length === 0 ? user?.data : searchData;
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
                    value={search}
                    onChange={(e) => setSearch(e?.target?.value)}
                  />
                </InputGroup>
              </Form>
            </div>
            {user?.length !== 0 ? (
              <>
                {" "}
                <div className="d-flex justify-content-end ">
                  <h2
                    className="filterDate"
                    onClick={() =>
                      filter ? setFilter(false) : setFilter(true)
                    }
                  >
                    Filter Users{" "}
                    <BsFillCalendarDateFill size="24" color="#000" />{" "}
                  </h2>
                </div>
                {filter && (
                  <div className="d-flex justify-content-start">
                    <Form.Group>
                      <Form.Label>From Date</Form.Label>
                      <DatePicker
                        selected={startDate}
                        placeholderText="Please select from date"
                        onChange={(date) => setStartDate(date)}
                        className="landing-input-form "
                        dateFormat="dd MMMM yyyy"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>To Date</Form.Label>
                      <DatePicker
                        selected={toDate}
                        placeholderText="Please select to date"
                        onChange={(date) => setToDate(date)}
                        dateFormat="dd MMMM yyyy"
                        className="landing-input-form "
                      />
                    </Form.Group>
                    <Form.Group style={{ marginRight: "4em" }}>
                      <Form.Label>Last 7 days</Form.Label>
                      <div>
                        <Button
                          className="button-submit btn-ripple "
                          type="submit"
                          onClick={() => FilterUsers(lastSevenDay, currentdate)}
                          style={{ width: "8em" }}
                        >
                          Filter Users
                        </Button>
                      </div>
                    </Form.Group>
                    <Form.Group style={{ marginRight: "4em" }}>
                      <Form.Label>Last 24 hours</Form.Label>
                      <div>
                        <Button
                          className="button-submit btn-ripple "
                          type="submit"
                          onClick={() => FilterUsers(lastOneDay, currentdate)}
                          style={{ width: "8em" }}
                        >
                          Filter Users
                        </Button>
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Reset</Form.Label>
                      <div>
                        <Button
                          className="button-submit btn-ripple"
                          type="submit"
                          onClick={Reset}
                          style={{ width: "8em" }}
                        >
                          Reset Filter
                        </Button>
                      </div>
                    </Form.Group>

                    <br />
                  </div>
                )}
                {startDate && toDate && filter && (
                  <div className="d-flex justify-content-start mt-3 ">
                    <Button
                      className="button-submit btn-ripple "
                      type="submit"
                      onClick={() => FilterUsers(startDate, toDate)}
                      style={{ width: "7em", margin: "10px 0em" }}
                    >
                      Filter Date
                    </Button>
                  </div>
                )}
                <Row style={{ marginTop: "20px" }}>
                  <TableData user={result} />
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
