import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Singlefield from "./Singlefield";
// import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

const DashTable = ({ user }) => {
console.log(user)
  return (

    <>
      {user?.length !== 0 ? (
        <Table className="report-table-main">
          <thead>
            <tr className="Rtable-header">
              <th>S.no</th>

              <th> Name</th>
              <th>E-mail</th>
              <th>Firm Name</th>
              <th>Action</th>

            </tr>
          </thead>
          {user?.map((data, id) => {
            return <Singlefield
              id={id}
              name={data?.name}
              address={data?.address}
              city={data?.city}
              email={data?.email}
              firm_name={data?.firm_name}
              pincode={data?.pincode}
              type={data?.type}
              position={data?.position}
              mob_number={data?.mob_number}
              huges_number={data?.huges_number}
              gstin_number={data?.gstin_number}
              full_huges_number={data?.full_huges_number}
            />
          })}
        </Table>
      ) : (
        <h2 className="text-center">No User Data To Display</h2>
      )}


      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
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
      </div> */}
    </>
  );
};
export default DashTable;
