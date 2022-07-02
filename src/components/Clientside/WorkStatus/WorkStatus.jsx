import React, { useContext, useState, useEffect } from "react";
import TableData from "./Table";
import { UserContext } from "../../../App";
import { Col, Row, Button, Form, InputGroup } from "react-bootstrap";
import CommonHeader from "../../Header/Header";
import Filtericon from "../../../assets/filter.svg";
import { BsSearch } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import fileDownload from "js-file-download";
import { Workstatus, WorkDownload, AllWork } from "../../Axios/apis";
import Cookies from "js-cookie";
import "./workstatus.css";
const ClientWorkStatus = () => {
  const { show } = useContext(UserContext);
  // const [boolVal, setBoolVal] = useState(false);
  const [work, setWork] = useState([]);
  const [filter, setFilter] = useState(false);
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1);
  let id = Cookies.get("AysToken");
  const FetchWorkData = async () => {
    try {
      const { data } = await Workstatus(id, page);
      setWork(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const FetchTWork = async () => {
    try {
      const { data } = await AllWork(id);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };
  const DownloadBtn = () => {
    WorkDownload(id)
      .then((res) => {
        console.log(res);
        // window.open("https://aysbackend.herokuapp.com/api/invoices/excel?invoiceType=Sales")
        fileDownload(res.data, "Work-Status.xlsx");
      })
      .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   if (!boolVal) {
  //     FetchWorkData();
  //     setBoolVal(true);
  //   }
  // }, [boolVal]);

  useEffect(() => {
    FetchWorkData();
    FetchTWork();
  }, [page]);

  return (
    <>
      <div className="main-div">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
          <Row>
            <CommonHeader title="Work Status" />
            <Row>
              <Col>
                <div className="report-grid-main">
                  <div
                    className={
                      show
                        ? "report-search-item"
                        : "report-search-item-collapse"
                    }
                  >
                    <Form>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="rsearch-button-icon">
                          <BsSearch size={20} />
                        </InputGroup.Text>
                        <Form.Control
                          className="rsearch-bar"
                          type="email"
                          placeholder="Ex. Invoice No, Customer name, Type."
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
                    <Button className="report-button" onClick={DownloadBtn}>
                      <FiDownload size={22} /> Download
                      <MdKeyboardArrowDown size={25} />
                    </Button>
                    {/* <Button className="report-button">
                          <AiFillPrinter size={25} /> Print
                        </Button> */}
                    <span
                      className="report-span-filter"
                      style={{ dispaly: work?.length === 0 ? "" : "none" }}
                      onClick={() =>
                        filter ? setFilter(false) : setFilter(true)
                      }
                    >
                      <img src={Filtericon} alt="Filter" />
                      Filter
                    </span>
                  </div>
                </div>
                <div
                  className="report-table-main"
                  style={{ width: show ? "100%" : "95%" }}
                >
                  <TableData
                    page={page}
                    total={total}
                    filter={filter}
                    setPage={setPage}
                    work={work}
                  />
                </div>
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ClientWorkStatus;
