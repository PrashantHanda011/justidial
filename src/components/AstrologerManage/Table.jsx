import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TableData = ({ work, page, setPage, total, filter }) => {
  const navigate = useNavigate();
  const [pg, setPg] = useState([1, 2, 3, 4, 5]);
  const [search, setSearch] = useState([]);
  const [input, setInput] = useState({
    invoiceDate: "",
    invoiceNo: "",
    customerName: "",
    amount: "",
    invoiceStatus: "",
    type: "",
  });
  const handleChange = (e) => {
    const { name } = e.target;
    setInput({ ...input, [name]: e.target.value });
  };
  let data = (work = [
    { name: "Rohit", phone: "123456789", action: true },
    { name: "Rohit", phone: "123456789", action: true },
    { name: "Rohit", phone: "123456789", action: false },
    { name: "Rohit", phone: "123456789", action: true },
    { name: "Rohit", phone: "123456789", action: false },
    { name: "Rohit", phone: "123456789", action: true },
    { name: "Rohit", phone: "123456789", action: false },
    { name: "Rohit", phone: "123456789", action: true },
    { name: "Rohit", phone: "123456789", action: false },
 
  ]);
function details(){
 navigate("details")
}
  return (
    <>
      {work.length !== 0 ? (
        <Table size="sm">
          <thead style={{ border: "none" }}>
            <tr style={{ border: "none" }}>
              <th className="Rtable-header">S.no</th>

              <th className="Rtable-header">
                Astro Name
                <br />
                <input
                  type="text"
                  value={input.invoiceNo}
                  name="invoiceNo"
                  onChange={handleChange}
                  style={{ display: filter ? "" : "none" }}
                />
              </th>
              <th className="Rtable-header">
                Phone No
                <br />
                <input
                  type="text"
                  value={input.customerName}
                  name="customerName"
                  onChange={handleChange}
                  style={{ display: filter ? "" : "none" }}
                />
              </th>

              <th className="Rtable-header">
                Action
                <br />
                <input
                  type="text"
                  name="invoiceStatus"
                  value={input.invoiceStatus}
                  onChange={handleChange}
                  style={{ display: filter ? "" : "none", width: "7em" }}
                />
              </th>
            </tr>
          </thead>
          {data?.map((data, id) => {
            return (
              <>
                <tbody key={id} style={{ border: "none" }}>
                  <tr>
                    <td className="Rtable-data" onClick={()=>details()} style={{ cursor: "pointer" }}>
                      {id + 1}
                    </td>
                    <td className="Rtable-data" onClick={()=>details()} style={{ cursor: "pointer" }}>
                      {data?.name}
                    </td>
                    <td className="Rtable-data" onClick={()=>details()} style={{ cursor: "pointer" }}>
                      {data?.phone}
                    </td>

                    <td
                      className="Rtable-data" onClick={()=>details()}
                      style={{
                        cursor: "pointer",
                        color: data?.action ? "#E1001B" : "#29CD00",
                      }}
                    >
                      {data?.action ? "Block" : "UnBlock"}
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </Table>
      ) : (
        <div style={{ margin: "6em" }}>
          <div className="loading-main">
            <div class="loader"></div>
          </div>
          <h5>Loading...</h5>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p className="R-bottom-text">
          {work?.length !== 0 ? `Showing Page ${page} out of ${total}` : ""}
        </p>{" "}
        {work?.length !== 0 ? (
          <p className="R-bottom-pgno">
            <MdOutlineNavigateBefore
              size={21}
              title="previous page"
              cursor="pointer"
              onClick={() => (pg[0] > 1 ? setPg(pg.map((num) => num - 5)) : "")}
            />
            &nbsp;{" "}
            <span
              style={{
                color: parseInt(page) === pg[0] ? "#f20e29" : "",
                cursor: "pointer",
              }}
            >
              {pg[0]}
            </span>{" "}
            &nbsp;{" "}
            <span
              style={{
                color: parseInt(page) === pg[1] ? "#f20e29" : "",
                cursor: "pointer",
              }}
            >
              {pg[1]}
            </span>{" "}
            &nbsp;{" "}
            <span
              style={{
                color: parseInt(page) === pg[2] ? "#f20e29" : "",
                cursor: "pointer",
              }}
            >
              {pg[2]}
            </span>{" "}
            &nbsp;{" "}
            <span
              style={{
                color: parseInt(page) === pg[3] ? "#f20e29" : "",
                cursor: "pointer",
              }}
            >
              {pg[3]}
            </span>{" "}
            &nbsp;{" "}
            <span
              style={{
                color: parseInt(page) === pg[4] ? "#f20e29" : "",
                cursor: "pointer",
              }}
            >
              {pg[4]}
            </span>{" "}
            &nbsp;
            <MdOutlineNavigateNext
              title="next page"
              cursor="pointer"
              size={21}
            />
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default TableData;
