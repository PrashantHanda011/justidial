import React, { useContext, useState} from "react";
import TableData from "./Table";
import { UserContext } from "../../App";
import { Col, Row,Form, InputGroup } from "react-bootstrap";
import CommonHeader from "../Header/Header";
import Filtericon from "../../assets/filter.svg";
import { BsSearch } from "react-icons/bs";
// import { FiDownload } from "react-icons/fi";
// import fileDownload from "js-file-download";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { Salestatus, SalesDownload } from "../Axios/apis";
// import Cookies from "js-cookie";
const AstrologerManage = () => {
  const { show } = useContext(UserContext);
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [work, setWork] = useState([]);
  // let id = Cookies.get("AysToken");
  // const FetchWorkData = async () => {
  //   try {
  //     const { data } = await Salestatus(id, page);
  //     setWork(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
 
  // const DownloadBtn = () => {
  //   SalesDownload(id)
  //     .then((res) => {
  //       console.log(res);
  //       fileDownload(res.data, "Sales-Status.xlsx");
  //     })
  //     .catch((error) => console.log(error));
  // };


  return (
    <>
      <div className="main-div">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
          <Row>
            <CommonHeader title="Sales Status" />
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
                    {/* <Button className="report-button" onClick={DownloadBtn}>
                      <FiDownload size={22} /> Download
                      <MdKeyboardArrowDown size={25} />
                    </Button> */}
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
                    page={1}
                    total={12}
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

export default AstrologerManage;
