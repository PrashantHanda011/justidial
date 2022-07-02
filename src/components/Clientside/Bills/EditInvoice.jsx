import React, { useContext, useState, useEffect, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./invoice.css";
import { Editinvoice, Singleinvoice } from "../../Axios/apis";
import CommonHeader from "../../Header/Header";
import { UserContext } from "../../../App";
import { Col, Row, Form, Table, Button } from "react-bootstrap";
import {
  AiOutlineFileText,
  AiOutlineUpload,
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import Select from "react-select";
const initialData = {
  customerName: "",
  customerNotes: "",
  invoiceNo: "",
  orderNumber: "",
  invoiceDate: "",
  currency: "",
  paymentTerms: "",
  deliveryTerms: "",
  paymentDue: "",
  termAndCondition: "",
  shippingAddress: "",
  billingAddress: "",
  trnNo: "",
};
const tableField = {
  itemName: "",
  serialNumber: "",
  description: "",
  quantity: "",
  rate: "",
  discount: "",
  Mtax: "",
  amount: "",
  tax: "",
};
const ClientEditInvoice = () => {
  let id = Cookies.get("AysToken");
  let sId = useParams();
  let salesId = sId.id;
  let navigate = useNavigate();
  const UploadInput = useRef(null);
  const users = localStorage.getItem("AysData");
  // let user = JSON.parse(users);
  let user = { vatCertificateUrl: 7 };
  const { show } = useContext(UserContext);
  const [boolVal, setBoolVal] = useState(false);
  const [work, setWork] = useState([]);
  const [input, setInput] = useState(initialData);
  const [tableinput, setTableInput] = useState(tableField);
  const [checkShip, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [addTable, setTable] = useState([1]);
  const [uplaodedFileName, setUploadFileName] = useState(null);
  const Customeroptions = [
    { value: "Testing", label: "Testing" },
    { value: "User", label: "User" },
  ];
  const Paymentoptions = [
    { value: 0, label: "Advanced" },
    { value: 30, label: "Net 30 days" },
    { value: 45, label: "Net 45 days" },
    { value: 60, label: "Net 60 days" },
    { value: 90, label: "Net 90 days" },
  ];
  const Currencyoptions = [
    { value: "AED", label: "AED" },
    { value: "USD", label: "USD" },
    { value: "INR", label: "INR" },
    { value: "EUR", label: "EUR" },
  ];
  const Taxoptions = [
    { value: 1, label: "exempt" },
    { value: 0, label: "zero rated(0%)" },
    { value: 5, label: "standard rated(5%)" },
  ];
  const handleChange = (e) => {
    const { name } = e.target;
    setInput({ ...input, [name]: e.target.value });
  };
  const tableHandler = (e) => {
    const { name } = e.target;
    setTableInput({ ...tableinput, [name]: e.target.value });
  };
  const changeCustomerhandler = (Cvalue) => {
    setInput({ ...input, customerName: Cvalue });
  };

  const changeCurrencyhandler = (Cvalue) => {
    setInput({ ...input, currency: Cvalue });
  };
  const changeTermsHandler = (Cvalue) => {
    setInput({ ...input, paymentTerms: Cvalue });
  };
  const changeTaxHandler = (e) => {
    setTableInput({ ...tableinput, Mtax: e, tax: e.label });
  };

  useEffect(() => {
    setInput({ ...input, shippingAddress: input.billingAddress });
    if (!checkShip) {
      setInput({ ...input, shippingAddress: "" });
    }
  }, [input.billingAddress, checkShip]);
  function fileUploadHandler() {
    setUploadFileName(UploadInput.current.files[0]);
  }
  function fileUploadCloseHandler() {
    UploadInput.current.value = "";
    setUploadFileName(null);
  }
  const AddNewTable = () => {
    delete tableinput["Mtax"];
    if (
      !tableinput.itemName ||
      !tableinput.serialNumber ||
      !tableinput.description ||
      !tableinput.quantity ||
      !tableinput.rate ||
      !tableinput.discount
    ) {
      alert("all fields are required");
    } else {
      setTable([...addTable, addTable.length + 1]);

      setTableData([...tableData, tableinput]);
      setTableInput(tableField);
    }
  };

  const unique = [...new Set(tableData?.flat().map((data) => data.amount))];
  let Total = unique.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  const PostData = async (e) => {
    const {
      customerName,
      customerNotes,
      invoiceNo,
      orderNumber,
      invoiceDate,
      currency,
      paymentTerms,
      deliveryTerms,
      paymentDue,
      termAndCondition,
      shippingAddress,
      billingAddress,
      trnNo,
    } = input;
    let table = JSON.stringify(tableData);
    if (trnNo?.length !== 15) {
      alert("TRno should be 15 digit only");
    } else {
      const data = new FormData();
      data.append("salesInvoiceId", salesId);
      data.append("customerName", customerName.label);
      data.append("customerNotes", customerNotes);
      data.append("invoiceNo", invoiceNo);
      data.append("orderNumber", orderNumber);
      data.append("invoiceDate", invoiceDate);
      data.append("currency", currency.label);
      data.append("paymentTerms", paymentTerms.label);
      data.append("deliveryTerms", deliveryTerms);
      data.append("paymentDue", paymentDue);
      data.append("termAndCondition", termAndCondition);
      data.append("shippingAddress", shippingAddress);
      data.append("billingAddress", billingAddress);
      data.append("trnNo", trnNo);
      data.append("isDrafted", e);
      data.append("lineItems", table);
      data.append("attachments", uplaodedFileName);
      try {
        await Editinvoice(data, id);
        alert("Invoice created");
        navigate("/sales/status");
      } catch (error) {
        console.log(error);
      }
    }
  };

  function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
  }
  function percentCalculation(a, b) {
    if (b === 1) {
      b = 0;
    }

    var d = parseFloat(b) / 100;

    var c = parseFloat(a) * (1 + parseFloat(d));
    return parseFloat(c);
  }

  const EditTable = (e) => {
    let FilterD = tableData.filter((data) => data === tableData[e]);

    if (FilterD[0].tax === "zero rated(0%)") {
      setTableInput({
        ...FilterD[0],
        Mtax: { value: 0, label: "zero rated(0%)" },
      });
    } else if (FilterD[0].tax === "exempt") {
      setTableInput({
        ...FilterD[0],
        Mtax: { value: 1, label: "exempt" },
      });
    } else {
      setTableInput({
        ...FilterD[0],
        Mtax: { value: 5, label: "standard rated(5%)" },
      });
    }
    setTableData(tableData.filter((data) => data !== FilterD[0]));
  };
  const DeleteTable = (e) => {
    let FilterD = tableData.filter((data) => data === tableData[e]);
    setTableData(tableData.filter((data) => data !== FilterD[0]));
  };

  useEffect(() => {
    if (input?.invoiceDate?.length > 0 && input?.paymentTerms) {
      let Pterms =
        new Date(input.invoiceDate).getTime() +
        daysToMilliseconds(input?.paymentTerms?.value);
      let Newdate = new Date(Pterms);
      let duedate = Newdate?.toISOString()?.slice(0, 10);
      if (
        input?.paymentTerms?.value === 30 ||
        input?.paymentTerms?.value === 45 ||
        input?.paymentTerms?.value === 60 ||
        input?.paymentTerms?.value === 90
      ) {
        setInput({ ...input, paymentDue: duedate });
      } else {
        setInput({ ...input, paymentDue: input?.invoiceDate });
      }
    }
  }, [input?.invoiceDate, input?.paymentTerms]);

  useEffect(() => {
    if (
      tableinput?.quantity.length > 0 &&
      tableinput?.rate.length > 0 &&
      tableinput?.discount.length > 0
    ) {
      let q = JSON.parse(tableinput?.quantity);
      let r = JSON.parse(tableinput?.rate);
      let d = JSON.parse(tableinput?.discount);
      let value = q * r - d;
      let Amount = percentCalculation(value, tableinput?.Mtax?.value);
      if (Amount > 0 || user?.vatCertificateUrl) {
        setTableInput({ ...tableinput, amount: Amount });
      } else {
        setTableInput({ ...tableinput, amount: value });
      }
    }
  }, [
    tableinput?.Mtax,
    tableinput?.discount,
    tableinput?.rate,
    tableinput?.quantity,
  ]);

  const FetchWorkData = async () => {
    try {
      const { data } = await Singleinvoice(salesId, id);
      setWork(data.invoiceData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!boolVal) {
      FetchWorkData();
      setBoolVal(true);
    }
  }, [boolVal]);

  useEffect(() => {
    if (work.length !== 0) {
      // { value: 0, label: "Advanced" },
      // { value: 30, label: "Net 30 days" },
      // { value: 45, label: "Net 45 days" },
      // { value: 60, label: "Net 60 days" },
      // { value: 90, label: "Net 90 days" },
      let ETerm;
      if (work?.paymentTerms === "Advanced") {
        ETerm = { value: 0, label: "Advanced" };
      } else if (work?.paymentTerms === "Net 30 days") {
        ETerm = { value: 30, label: "Net 30 days" };
      } else if (work?.paymentTerms === "Net 45 days") {
        ETerm = { value: 45, label: "Net 45 days" };
      } else if (work?.paymentTerms === "Net 60 days") {
        ETerm = { value: 60, label: "Net 60 days" };
      } else {
        ETerm = { value: 90, label: "Net 90 days" };
      }

      setInput({
        customerName: { value: work?.customerName, label: work?.customerName },
        trnNo: work?.trnNo,
        invoiceNo: work?.invoiceNo,
        orderNumber: work?.orderNumber,
        invoiceDate: work?.invoiceDate?.slice(0, 10),
        currency: { value: work?.currency, label: work?.currency },
        shippingAddress: work?.shippingAddress,
        billingAddress: work?.billingAddress,
        deliveryTerms: work?.deliveryTerms,
        customerNotes: work?.customerNotes,
        termAndCondition: work?.termAndCondition,
        paymentTerms: ETerm,
      });
      setTableData(work?.lineItems);
    }
  }, [work]);

  console.log(salesId);

  return (
    <>
      <div className="main-div">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
          <Row>
            <CommonHeader
              icon={<AiOutlineFileText style={{ marginTop: -6 }} />}
              title="Edit Invoice"
            />
          </Row>

          <Row>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Form.Label
                  column
                  sm="2"
                  className="invoice-label"
                  style={{ color: "#53B9EA" }}
                >
                  Customer Name
                </Form.Label>
                <Col sm="6">
                  <CreatableSelect
                    className="Cinvoiceinput-form"
                    options={Customeroptions}
                    name="customerName"
                    value={input.customerName}
                    onChange={changeCustomerhandler}
                    isClearable
                    placeholder="Select Customer"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Form.Label column sm="2" className="invoice-label">
                  Customer TRno
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    className="Cinvoiceinput-form"
                    type="text"
                    placeholder="TR no"
                    name="trnNo"
                    value={input.trnNo}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
              <hr />

              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Col lg={6}>
                  <Row>
                    <Form.Label
                      column
                      sm="4"
                      className="invoice-label"
                      style={{ color: "#53B9EA" }}
                    >
                      Invoice#
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        className="Cinvoiceinput-form"
                        type="text"
                        placeholder="Invoice no"
                        name="invoiceNo"
                        value={input.invoiceNo}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col lg={6}>
                  <Row>
                    <Form.Label column sm="3" className="invoice-label">
                      Order Number
                    </Form.Label>

                    <Col sm="6">
                      <Form.Control
                        className="Cinvoiceinput-form"
                        type="text"
                        name="orderNumber"
                        value={input.orderNumber}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Col lg={6}>
                  <Row>
                    <Form.Label
                      column
                      sm="4"
                      className="invoice-label"
                      style={{ color: "#53B9EA" }}
                    >
                      Invoice Date
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        className="Cinvoiceinput-form"
                        type="date"
                        name="invoiceDate"
                        value={input.invoiceDate}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>

                {/* <Col lg={3}>
                      <Row>
                        <Form.Label column sm="2" className="invoice-label">
                          Terms
                        </Form.Label>
                        &nbsp; &nbsp;
                        <Col sm="8">
                          <Select
                            className="Cinvoiceinput-form"
                            options={Customeroptions}
                            placeholder="Select Terms"
                            name="customerName"
                            value={input.customerName}
                            onChange={changeCustomerhandler}
                          />
                        </Col>
                      </Row>
                    </Col> */}

                <Col lg={6}>
                  <Row>
                    <Form.Label column sm="3" className="invoice-label">
                      Currency
                    </Form.Label>

                    <Col sm="6">
                      <Select
                        className="Cinvoiceinput-form"
                        options={Currencyoptions}
                        placeholder="Select Currency"
                        name="currency"
                        value={input.currency}
                        onChange={changeCurrencyhandler}
                      />
                    </Col>
                  </Row>
                </Col>
              </Form.Group>

              <hr />
              {/* <Form.Group
                    as={Row}
                    className="mb-3 mt-3"
                    controlId="formPlaintext"
                  >
                    <Form.Label
                      column
                      sm="2"
                      className="invoice-label"
                      style={{ color: "#53B9EA" }}
                    >
                      Warehouse Name*
                    </Form.Label>
                    <Col sm="4">
                      <Select
                        className="Cinvoiceinput-form"
                        options={Customeroptions}
                        placeholder="Select Warehouse"
                      />
                    </Col>
                  </Form.Group> */}

              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Col lg={6}>
                  <Row>
                    <Form.Label
                      column
                      sm="4"
                      className="invoice-label"
                      style={{ color: "#53B9EA" }}
                    >
                      Payment Terms
                    </Form.Label>
                    <Col sm="8">
                      {/* <Form.Control
                            className="Cinvoiceinput-form"
                            type="text"
                            name="paymentTerms"
                            value={input.paymentTerms}
                            onChange={handleChange}
                          /> */}
                      <Select
                        className="Cinvoiceinput-form"
                        options={Paymentoptions}
                        name="paymentTerms"
                        value={input.paymentTerms}
                        onChange={changeTermsHandler}
                        isClearable
                        placeholder="Payment Terms"
                      />
                    </Col>
                  </Row>
                </Col>

                <Col lg={6}>
                  <Row>
                    <Form.Label column sm="3" className="invoice-label">
                      Payment Due
                    </Form.Label>

                    <Col sm="6">
                      <Form.Control
                        className="Cinvoiceinput-form"
                        disabled
                        type="date"
                        name="paymentDue"
                        value={input.paymentDue}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Col lg={6}>
                  <Row>
                    <Form.Label column sm="4" className="invoice-label">
                      Delivery terms
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        className="Cinvoiceinput-form"
                        type="text"
                        name="deliveryTerms"
                        value={input.deliveryTerms}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Col lg={6}>
                  <Row>
                    <Form.Label column sm="4" className="invoice-label">
                      Billing Address
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        className="Cinvoiceinput-form"
                        type="text"
                        name="billingAddress"
                        value={input.billingAddress}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col lg={6}>
                  <Row
                    title={
                      !checkShip
                        ? "different address from billing"
                        : "same as billing address"
                    }
                  >
                    <Form.Label column sm="3" className="invoice-label">
                      <Form.Check
                        inline
                        type="checkbox"
                        value={checkShip}
                        checked={checkShip}
                        onChange={() =>
                          checkShip ? setCheck(false) : setCheck(true)
                        }
                      />
                      Shipping
                    </Form.Label>

                    <Col sm="6">
                      <Form.Control
                        disabled={checkShip ? true : false}
                        className="Cinvoiceinput-form"
                        type="text"
                        name={checkShip ? "billingAddress" : "shippingAddress"}
                        value={input.shippingAddress}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Form.Group>
              <hr />

              <Form.Group as={Row} controlId="formPlaintext">
                <Form.Label column sm="4" className="invoice-label">
                  Table Input
                </Form.Label>
                <Table
                  style={{ textAlign: "center", width: "90%" }}
                  // responsive
                  bordered
                  hover
                  size="sm"
                >
                  <thead>
                    <tr>
                      <th>Items Name</th>
                      <th>Description</th>
                      <th>Serial No</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Discount</th>
                      <th
                        style={{
                          display: user?.vatCertificateUrl ? "" : "none",
                        }}
                      >
                        Tax
                      </th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {" "}
                        <Form.Control
                          className="Cinvoiceinput-form"
                          type="text"
                          placeholder="name"
                          name="itemName"
                          value={tableinput.itemName}
                          onChange={tableHandler}
                        />
                      </td>
                      <td>
                        {/* <AiOutlineUpload size={24} />{" "}
                            <p className="invoice-label">
                              Type or Click to select an item
                            </p> */}
                        <textarea
                          className="Cinvoiceinput-form"
                          type="text"
                          placeholder="description"
                          name="description"
                          value={tableinput.description}
                          onChange={tableHandler}
                        />
                      </td>
                      <td>
                        <Form.Control
                          className="Cinvoiceinput-form"
                          type="text"
                          placeholder="no"
                          name="serialNumber"
                          value={tableinput.serialNumber}
                          onChange={tableHandler}
                        />
                      </td>
                      <td>
                        {" "}
                        <Form.Control
                          className="Cinvoiceinput-form"
                          type="number"
                          placeholder="quantity"
                          name="quantity"
                          value={tableinput.quantity}
                          onChange={tableHandler}
                        />
                      </td>
                      <td>
                        {" "}
                        <Form.Control
                          className="Cinvoiceinput-form"
                          type="number"
                          placeholder="rate"
                          name="rate"
                          value={tableinput.rate}
                          onChange={tableHandler}
                        />
                      </td>
                      <td>
                        {" "}
                        <Form.Control
                          className="Cinvoiceinput-form"
                          type="number"
                          placeholder="discount"
                          name="discount"
                          value={tableinput.discount}
                          onChange={tableHandler}
                        />
                      </td>
                      <td
                        style={{
                          width: "15%",
                          display: user?.vatCertificateUrl ? "" : "none",
                        }}
                      >
                        {/* <Form.Control
                              className="Cinvoiceinput-form"
                              type="number"
                              placeholder="tax"
                              name="tax"
                              value={tableinput.tax}
                              onChange={tableHandler}
                            /> */}
                        <Select
                          className="Cinvoiceinput-form"
                          options={Taxoptions}
                          placeholder="tax"
                          name="Mtax"
                          value={tableinput.Mtax}
                          onChange={(e) => changeTaxHandler(e)}
                        />
                      </td>
                      <td>
                        {" "}
                        <Form.Control
                          disabled
                          className="Cinvoiceinput-form"
                          type="number"
                          placeholder="amount"
                          name="amount"
                          value={tableinput.amount}
                          onChange={tableHandler}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Form.Group>

              <hr />
              <hr />
              <Form.Group
                as={Row}
                style={{ display: tableData.length > 0 ? "flex" : "none" }}
                controlId="formPlaintext"
              >
                <Form.Label column sm="4" className="invoice-label">
                  Table Data
                </Form.Label>
                <Table
                  style={{ textAlign: "center", width: "95%" }}
                  responsive
                  bordered
                  hover
                  size="sm"
                >
                  <thead>
                    <tr>
                      <th>Items Name</th>
                      <th>Description</th>
                      <th>S.No</th>
                      <th>Quantity</th>
                      <th>Rate</th>
                      <th>Discount</th>
                      <th
                        style={{
                          display: user?.vatCertificateUrl ? "" : "none",
                        }}
                      >
                        Tax
                      </th>
                      <th>Amount</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  {tableData?.map((data, id) => {
                    return (
                      <>
                        <tbody style={{ border: "1px solid #cfd0d1" }} key={id}>
                          <tr>
                            <td>
                              {" "}
                              <textarea
                                disabled
                                className="Cinvoiceinput-form"
                                type="text"
                                placeholder="name"
                                name="itemName"
                                value={data.itemName}
                              />
                            </td>
                            <td>
                              {/* <AiOutlineUpload size={24} />{" "}
                            <p className="invoice-label">
                              Type or Click to select an item
                            </p> */}
                              <textarea
                                disabled
                                className="Cinvoiceinput-form"
                                type="text"
                                placeholder="description"
                                name="description"
                                value={data.description}
                              />
                            </td>
                            <td>
                              <Form.Control
                                disabled
                                className="Cinvoiceinput-form"
                                type="text"
                                placeholder="no"
                                name="serialNumber"
                                value={data.serialNumber}
                              />
                            </td>
                            <td>
                              {" "}
                              <Form.Control
                                disabled
                                className="Cinvoiceinput-form"
                                type="number"
                                placeholder="quantity"
                                name="quantity"
                                value={data.quantity}
                              />
                            </td>
                            <td>
                              {" "}
                              <Form.Control
                                disabled
                                className="Cinvoiceinput-form"
                                type="number"
                                placeholder="rate"
                                name="rate"
                                value={data.rate}
                              />
                            </td>
                            <td>
                              {" "}
                              <Form.Control
                                disabled
                                className="Cinvoiceinput-form"
                                type="number"
                                placeholder="discount"
                                name="discount"
                                value={data.discount}
                              />
                            </td>
                            <td
                              style={{
                                display: user?.vatCertificateUrl ? "" : "none",
                                width: "15%",
                              }}
                            >
                              <Form.Control
                                disabled
                                className="Cinvoiceinput-form"
                                type="text"
                                placeholder="tax"
                                name="tax"
                                value={data.tax}
                              />
                            </td>
                            <td>
                              {" "}
                              <Form.Control
                                disabled
                                className="Cinvoiceinput-form"
                                type="number"
                                placeholder="amount"
                                name="amount"
                                value={data.amount}
                              />
                            </td>
                            <td
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "5px",
                              }}
                            >
                              <AiOutlineEdit
                                color="#53B9EA"
                                size="24"
                                title="edit data"
                                cursor="pointer"
                                onClick={() => EditTable(id)}
                              />

                              <AiOutlineDelete
                                color="Red"
                                size="24"
                                title="delete data"
                                cursor="pointer"
                                onClick={() => DeleteTable(id)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </>
                    );
                  })}
                </Table>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Col lg={7}>
                  <Form.Label column sm="4" className="invoice-label">
                    <Button className="button-submit" onClick={AddNewTable}>
                      + Add Item
                    </Button>
                  </Form.Label>
                </Col>
                <Col
                  lg={4}
                  style={{
                    backgroundColor: "#e2e2e2",
                    borderRadius: "10px",
                    display: tableData.length > 0 ? "" : "none",
                  }}
                >
                  <Row>
                    <Form.Label column sm="8" className="invoice-label">
                      Sub Total
                    </Form.Label>

                    <Form.Label column sm="2" className="invoice-label">
                      {Total.toFixed(2)}
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Label column sm="8" className="invoice-label">
                      Vat
                    </Form.Label>

                    <Form.Label column sm="2" className="invoice-label">
                      {Total.toFixed(2)}
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Label column sm="8" className="invoice-label">
                      Total {input?.currency ? input?.currency?.label : "AED"}
                    </Form.Label>

                    <Form.Label column sm="2" className="invoice-label">
                      {Total.toFixed(2)}
                    </Form.Label>
                  </Row>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Col lg={6}>
                  <Row>
                    <Form.Label column sm="4" className="invoice-label">
                      Customer Notes
                    </Form.Label>
                    <Col sm="8">
                      <textarea
                        rows="2"
                        cols="45"
                        className="Cinvoiceinput-form"
                        name="customerNotes"
                        value={input.customerNotes}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Form.Group>
              <hr />
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formPlaintext">
                    <Form.Label className="invoice-label">
                      Terms And Conditions
                    </Form.Label>

                    <Col>
                      <textarea
                        rows="4"
                        cols="60"
                        className="Cinvoiceinput-form"
                        name="termAndCondition"
                        value={input.termAndCondition}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formPlaintext">
                    <Form.Label className="invoice-label">
                      Attach a File or Invoice
                    </Form.Label>

                    <Col>
                      <div style={{ position: "relative" }}>
                        <input
                          ref={UploadInput}
                          type="file"
                          className="Cinvoice-upload"
                          accept=" .pdf, .jpeg"
                          onChange={fileUploadHandler}
                          style={{
                            display: !uplaodedFileName ? "" : "none",
                          }}
                        />
                        {!uplaodedFileName ? (
                          <Button
                            className="button-submit"
                            style={{ width: "9em" }}
                          >
                            <AiOutlineUpload size={24} /> Upload File
                          </Button>
                        ) : (
                          <Button
                            className="button-submit"
                            style={{ width: "50%" }}
                          >
                            {uplaodedFileName?.name}{" "}
                            <AiOutlineClose
                              size={20}
                              color="red"
                              title="remove"
                              cursor="pointer"
                              onClick={() => fileUploadCloseHandler()}
                            />
                          </Button>
                        )}
                      </div>
                      {/* <p className="invoice-label">
                            you can upload maximum of 10 File 5mb each
                          </p> */}
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    className="invoiceedisableBtn"
                    style={{ width: "9em", marginRight: "10px" }}
                    onClick={() => PostData(true)}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    className="button-submit"
                    style={{ width: "9em", marginRight: "10px" }}
                    onClick={() => PostData(false)}
                  >
                    Save and Send
                  </Button>
                  <Button
                    className="invoiceedisableBtn"
                    style={{ width: "9em", marginRight: "10px" }}
                    onClick={() => navigate("/sales")}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ClientEditInvoice;
