import React,{ useRef, useState, useContext } from "react";
import { UserContext } from "../../../App";
import { Col, Row, Button } from "react-bootstrap";
import { useNavigate, useLocation} from "react-router-dom";
import CommonHeader from "../../Header/Header";
import UploadLg from "../../../assets/upload-lg.svg";
import { Uploadsale } from "../../Axios/apis";
import "./upload.css";
import CommonModal from "../CommonModal/CommonModal";
import Cookies from "js-cookie";
const CommonUpload = (props) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [uplaodedFileName, setUploadFileName] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaidModalVisible, setIsPaidModalVisible] = useState(false);
  const [payment, setPayment] = useState("Paid");
  const [paidPayment, setPaidPayment] = useState("Bank");
  const [isSelected, setIsSelected] = useState(false);
  const UploadInput = useRef(null);
  const { show } = useContext(UserContext);
  let navigate = useNavigate();
  const location = useLocation();
  let id = Cookies.get("AysToken");
  let UType=location?.pathname?.slice(1)
  // to look change in uplaod file
  function fileUploadHandler(event) {
    if (props.name === "Banks") {
      setIsModalVisible(true);
      setPaidPayment("Bank");
    }
    setUploadFileName(UploadInput.current.files[0]);
    setIsFileUploaded(true);
  }

  //close button to clear input
  function fileUploadCloseHandler() {
    UploadInput.current.value = "";
    setUploadFileName(null);
    setIsFileUploaded(false);
    setPaidPayment("");
  }
  // modalClose function
  function handleClose() {
    if (isModalVisible) {
      setIsModalVisible(false);
    }
    if (isPaidModalVisible) {
      setIsPaidModalVisible(false);
    }
  }

  function handleChange(e) {
    if (isModalVisible) {
      setPayment(e.target.value);
    } else {
      setPaidPayment(e.target.value);
    }
  }

  function handleNext() {
    if (payment === "Un-Paid") {
      setIsModalVisible(false);
      setPaidPayment("");
    } else if (payment === "Paid" && isModalVisible) {
      setIsModalVisible(false);
      setIsPaidModalVisible(true);
      setIsSelected(false);
    } else if (payment === "Paid" && isPaidModalVisible) {
      setIsSelected(true);
      setIsPaidModalVisible(false);
    }
  }
  const PostFile = async () => {
    const file = new FormData();
    file.append("file", uplaodedFileName);
    file.append("invoiceType", UType);
    try {
      await Uploadsale(file, id);
      alert("Invoice uploaded");
      navigate("/sales/status");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(uplaodedFileName);
  return (
    <>
      <div className="main-div">
            <div
              className="clientsales-main"
              style={{ marginLeft: show ? "1px" : "2.3em" }}
            >
              <Row>
                <CommonHeader title={props.name} />
                <Row>
                  <div className="client-sales-uploadD">
                    <CommonModal
                      isModalVisible={isModalVisible}
                      handleClose={handleClose}
                      payment={payment}
                      handleNext={handleNext}
                      handleChange={handleChange}
                      value={["Paid", "Un-Paid"]}
                    />
                    <CommonModal
                      isModalVisible={isPaidModalVisible}
                      handleClose={handleClose}
                      payment={paidPayment}
                      handleNext={handleNext}
                      handleChange={handleChange}
                      value={["Cash", "Bank"]}
                    />
                    <div
                      className="csales-Generatetax"
                      style={{
                        display: location.pathname !== "/sales" ? "none" : "",
                      }}
                    >
                      Generate tax invoice with us
                      <br />{" "}
                      <Button
                        className="csales-button-browse"
                        onClick={() => navigate("/sales/invoice")}
                        style={{ marginBottom: "10px",marginLeft:'16em' }}
                      >
                        Create
                      </Button>
                      <span style={{float: "right",paddingRight:'3em'}}>
                        <Button
                          className="csales-button-browse"
                          onClick={() => navigate("/sales/status")}
                          style={{  marginBottom: "10px" }}
                        >
                          Sales Status
                        </Button>
                      </span>
                      <br />
                      OR
                    </div>
                    <h3 className="csales-upload-text">Upload Documents</h3>
                    <p className="csales-upload-subtext">(.pdf,.jpeg)</p>

                    <div className="csales-upload-section">
                      <div className="csales-upload-border-area">
                        
                        <img
                          alt="upload"
                          src={UploadLg}
                          style={{
                            marginTop: "-10px",
                            display: isFileUploaded ? "none" : null,
                          }}
                        />
                        <input
                          ref={UploadInput}
                          type="file"
                          className="inputclient-file"
                          accept=".pdf, .jpeg"
                          onChange={fileUploadHandler}
                          style={{ display: isFileUploaded ? "none" : null,cursor: "pointer"}}
                        />
                        <br />
                        <h4
                          style={{
                            marginTop: "30px",
                            alignItems: "center",
                            color: "#52596E",
                            fontWeight: "400",
                            display: isFileUploaded ? "none" : null,
                          }}
                        >
                          Drag and Drop Files here
                        </h4>
                        <h4
                          style={{
                            marginTop: "30px",
                            alignItems: "center",
                            color: "#52596E",
                            fontWeight: "400",
                            display: !isFileUploaded ? "none" : null,
                          }}
                        >
                          {uplaodedFileName?.name}
                          <Button
                            variant="danger"
                            className="inputclient-file-close-btn"
                            onClick={fileUploadCloseHandler}
                          >
                            X
                          </Button>
                        </h4>
                        <Button className="csales-button-browse"   style={{ display: isFileUploaded ? "none" : null }}>Browse</Button>
                      </div>
                      <div
                        style={{
                          marginTop: "1px",
                          fontSize: "1.2rem",
                          fontWeight: "600",
                        }}
                      >
                        {isSelected ? paidPayment : null}
                      </div>
                      <Button
                        onClick={PostFile}
                        style={{ display: !isFileUploaded ? "none" : null }}
                        className="csales-button-browse"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </Row>
              </Row>
            </div>
          {/* </Col>
        </Row> */}
      </div>
    </>
  );
};

export default CommonUpload;
