import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { WorkFilter } from "../../Axios/apis";
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
  function RouteHandler(e) {
    navigate(`/workstatus/details/${e}`);
  }

  const SetFilter = async () => {
    try {
      const { data } = await WorkFilter(input);
      setSearch(data.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let Scheck =
    input.invoiceDate !== "" ||
    input.invoiceNo !== "" ||
    input.customerName !== "" ||
    input.amount !== "" ||
    input.invoiceStatus !== "" ||
    input.type !== "";
  useEffect(() => {
    if (Scheck) SetFilter();
  }, [input]);

  function checkpg(check) {
    return check === total;
  }
  let data = search.length === 0 || Scheck === false ? work : search;

  return (
    <>
      {work.length !== 0 ? (
        <Table size="sm">
          <thead style={{ border: "none" }}>
            <tr style={{ border: "none" }}>
              <th className="Rtable-header">S.no</th>
              <th className="Rtable-header">
                Date
                <br />
                <input
                  type="date"
                  value={input.invoiceDate}
                  name="invoiceDate"
                  onChange={handleChange}
                  style={{ display: filter ? "" : "none" }}
                />
              </th>
              <th className="Rtable-header">
                Invoice No.
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
                Customer name
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
                Amount
                <br />
                <input
                  type="number"
                  name="amount"
                  value={input.amount}
                  onChange={(e) =>
                    setInput({ ...input, amount: parseInt(e.target.value) })
                  }
                  style={{ display: filter ? "" : "none", width: "4em" }}
                />
              </th>
              <th className="Rtable-header">
                Type
                <br />
                <input
                  type="text"
                  value={input.type}
                  name="type"
                  onChange={handleChange}
                  style={{ display: filter ? "" : "none", width: "7em" }}
                />
              </th>
              <th className="Rtable-header">
                Status
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
          {data?.slice(0, 8)?.map((data, id) => {
            return (
              <>
                <tbody key={id} style={{ border: "none" }}>
                  <tr>
                    <td
                      className="Rtable-data"
                      onClick={() =>
                        RouteHandler(`${data?._id}&invoiceType=${data?.type}`)
                      }
                    >
                      {page > 1 ? id + 1 + 8 * (page - 1) : id + 1}
                    </td>
                    <td
                      className="Rtable-data"
                      onClick={() =>
                        RouteHandler(`${data?._id}&invoiceType=${data?.type}`)
                      }
                    >
                      {data?.invoiceDate?.slice(0, 10)}
                    </td>
                    <td
                      className="Rtable-data"
                      onClick={() =>
                        RouteHandler(`${data?._id}&invoiceType=${data?.type}`)
                      }
                    >
                      {data?.invoiceNo}
                    </td>
                    <td
                      className="Rtable-data"
                      onClick={() =>
                        RouteHandler(`${data?._id}&invoiceType=${data?.type}`)
                      }
                    >
                      {data?.customerName}
                    </td>
                    <td
                      className="Rtable-data"
                      onClick={() =>
                        RouteHandler(`${data?._id}&invoiceType=${data?.type}`)
                      }
                    >
                      {data?.amount}
                    </td>
                    <td
                      className="Rtable-data"
                      onClick={() =>
                        RouteHandler(`${data?._id}&invoiceType=${data?.type}`)
                      }
                    >
                      {data?.type}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{
                        color:
                          data?.invoiceStatus === "Issue Raised"
                            ? "#E1001B"
                            : data?.invoiceStatus === "To be Reviewed"
                            ? "#E9D749"
                            : data?.invoiceStatus === "Duplicate"
                            ? "#FF813F"
                            : data?.invoiceStatus === "Reviewed"
                            ? "#29CD00"
                            : "#16a0e0",
                      }}
                    >
                      {data?.invoiceStatus}
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
            <div className="loader"></div>
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
              onClick={(e) => setPage(e.target.innerHTML)}
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
              onClick={(e) => setPage(e.target.innerHTML)}
            >
              {pg[1]}
            </span>{" "}
            &nbsp;{" "}
            <span
              style={{
                color: parseInt(page) === pg[2] ? "#f20e29" : "",
                cursor: "pointer",
              }}
              onClick={(e) => setPage(e.target.innerHTML)}
            >
              {pg[2]}
            </span>{" "}
            &nbsp;{" "}
            <span
              style={{
                color: parseInt(page) === pg[3] ? "#f20e29" : "",
                cursor: "pointer",
              }}
              onClick={(e) => setPage(e.target.innerHTML)}
            >
              {pg[3]}
            </span>{" "}
            &nbsp;{" "}
            <span
              style={{
                color: parseInt(page) === pg[4] ? "#f20e29" : "",
                cursor: "pointer",
              }}
              onClick={(e) => setPage(e.target.innerHTML)}
            >
              {pg[4]}
            </span>{" "}
            &nbsp;
            <MdOutlineNavigateNext
              title="next page"
              cursor="pointer"
              size={21}
              onClick={() =>
                pg?.find(checkpg)
                  ? alert("End of pages")
                  : setPg(pg.map((num) => num + 5))
              }
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
