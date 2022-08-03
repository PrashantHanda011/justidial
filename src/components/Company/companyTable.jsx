import React, { useState } from "react";
import { Table } from "react-bootstrap";

const companyTable = ({ user }) => {
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
          {user?.map((data, id) => {
            return (
              <>
                <tbody key={id} style={{ border: "none" }}>
                  <tr>
                    <td className="Rtable-data">{id + 1}</td>
                    <td className="Rtable-data">{data?.firm_name}</td>
                    <td className="Rtable-data">{data?.huges_number[0]}</td>
                    <td className="Rtable-data">{data?.address ?(data?.address):("No address")}</td>
                    <td className="Rtable-data"><button className="btn btn-primary ">View</button></td>
                    
                  </tr>
                </tbody>
              </>
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
