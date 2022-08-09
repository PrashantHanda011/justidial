import React, { useState } from "react";
import { Table } from "react-bootstrap";
import SingleCompany from "./SingleCompany";

const companyTable = ({ user }) => {
  console.log(user)
  return (
    <>
      {user?.length !== 0 ? (
      <div className="table-company border-none">
        <Table className="report-table-main">
          <thead>
            <tr className="Rtable-header">
              <th>S.no</th>
              <th> Name</th>
              <th>Huges Number</th>
              <th>Address</th>
              <th>Action</th>

            </tr>
          </thead>
          {user?.map((data, index) => {
            return (<SingleCompany data={data} ind={index} key={index} />
            );
          })}
        </Table>
</div>
      ) : (
        <h2 className="text-center">No User Data To Display</h2>
      )}

    </>
  );
};
export default companyTable;
