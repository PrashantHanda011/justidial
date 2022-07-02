import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../../../App";
import CommonHeader from "../../Header/Header";
import Cookies from "js-cookie";
import { Singleinvoice } from "../../Axios/apis";
import { useParams, useNavigate } from "react-router-dom";

function ClientWorkDetails() {
  let param = useParams();
  let salesId = param.id;
  const navigate = useNavigate();
  const { show } = useContext(UserContext);
  const [boolVal, setBoolVal] = useState(false);
  const [work, setWork] = useState([]);

  let id = Cookies.get("AysToken");
  const FetchWorkwork = async () => {
    try {
      const { data } = await Singleinvoice(salesId, id);
      setWork(data.invoiceData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!boolVal) {
      FetchWorkwork();
      setBoolVal(true);
    }
  }, [boolVal]);
  console.log(work);
  let url = `https://aysadvisors.herokuapp.com/api/invoice/pdf/show?invoiceId=${salesId}`;

  let Amount = [...new Set(work?.lineItems?.map((item) => item?.amount))];
  let TotalAmount = Amount.reduce((a, b) => a + b, 0);

  let Quantity = [...new Set(work?.lineItems?.map((item) => item?.quantity))];
  let TotalQuantity = Quantity.reduce((a, b) => a + b, 0);
  let Rate = [...new Set(work?.lineItems?.map((item) => item?.rate))];
  let TotalRate = Rate.reduce((a, b) => a + b, 0);
  console.log(TotalRate);
  return (
    <>
      <div className="main-div">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
          <Row>
            <CommonHeader title="Work Details" />
          </Row>

          {/* details */}

          <Row className="reports-details-row">
            <Col lg={8}>
              <div className="reports-details">
                <span style={{ fontWeight: "600" }}>Part A/C Name:</span>{" "}
                {work.customerName}
              </div>
              <div className="reports-details">Current Balance: ₹1,60,000</div>
              <div className="reports-details">
                <span style={{ fontWeight: "600" }}>Sales Ledger:</span> Sale
                Interstate GST
              </div>
              <div className="reports-details">Current Balance: ₹1,60,000</div>
            </Col>
            <Col lg={4}>
              <div>
                Status:{" "}
                <span
                  className="report-status"
                  style={{
                    color:
                      work?.invoiceStatus === "Issue Raised"
                        ? "#E1001B"
                        : work?.invoiceStatus === "To be Reviewed"
                        ? "#E9D749"
                        : work?.invoiceStatus === "Duplicate"
                        ? "#FF813F"
                        : work?.invoiceStatus === "Reviewed"
                        ? "#29CD00"
                        : "#16a0e0",
                  }}
                >
                  {work.invoiceStatus}
                </span>
              </div>
            </Col>
          </Row>
          {/* another section */}
          <Row className="report-conclusion">
            <Col lg={6}>
              <div>Name of Item</div>
            </Col>
            <Col sm={2}>
              <div>Quantity</div>
            </Col>
            <Col sm={2}>
              <div>Rate</div>
            </Col>
            <Col sm={2}>
              <div>Amount</div>
            </Col>
          </Row>
          {/* another section */}
          <Row className="report-conclusion-details ">
            {work?.lineItems?.map((item) => {
              return (
                <>
                  <Col lg={6}>
                    <div>{item.itemName}</div>
                  </Col>
                  <Col sm={2}>
                    <div>{item.quantity}</div>
                  </Col>
                  <Col sm={2}>
                    <div>{!item.rate ? "0" : item.rate}</div>
                  </Col>
                  <Col sm={2}>
                    <div>{item.amount}</div>
                  </Col>
                </>
              );
            })}
          </Row>
          {/* another section */}
          <Row>
            <Col lg={6}></Col>
            <Col sm={2} className="report-conclusion">
              <div>{TotalQuantity}</div>
            </Col>
            <Col sm={2} className="report-conclusion">
              <div>{TotalRate}</div>
            </Col>
            <Col sm={2} className="report-conclusion">
              <div>{TotalAmount}</div>
            </Col>
          </Row>

          {/* <Row className='reports-details-row'>
                  <div style={{fontWeight:'600'}}>Image Uploaded by You</div>
                  <img src={example} alt='logo' style={{width:'200px',marginTop:'1rem'}}/>
                </Row> */}

          {/* /// */}
          {work?.length !== 0 ? (
            <>
              <Row>
                <Col lg={8} className="mt-5">
                  <div style={{ fontWeight: "600", marginBottom: "20px" }}>
                    Generated invoice :
                  </div>

                  <div style={{ width: "90%", height: "80vh" }}>
                    <iframe width="100%" height="100%" src={url} />
                  </div>
                </Col>
                <Col className="mt-4" lg={4}>
                  {work?.attachFiles.map((data, id) => {
                    return (
                      <Col className="mr-4" key={id}>
                        <Button
                          onclick={() =>
                            window.open(data, "_blank", "fullscreen=yes")
                          }
                        >
                          {data}
                        </Button>
                      </Col>
                    );
                  })}
                </Col>
              </Row>
            </>
          ) : (
            <div style={{ margin: "6em" }}>
              <div className="loading-main">
                <div className="loader"></div>
              </div>
              <h5 style={{ textAlign: "center" }}>Loading...</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ClientWorkDetails;
