import React,{ useState,useEffect } from "react";
import { Table } from "react-bootstrap";
import { DeleteCompany } from "../Axios/apis";
import SingleCompany from "./SingleCompany";

const CompanyTable = ({ user }) => {
  const [company, setcompany] = useState([])

  
  const handleDelete = async(id)=>{
    try {
      const yes  =window.confirm("Do you want to delete Company ?")
      if(yes){
        const temp={
          id:`${id}`
        }
        
        const newarr = company.filter((item)=>item._id!=id)
        setcompany(newarr)
       await DeleteCompany(temp)
        window.alert("Company Deleted")
    }  } catch (error) {
      window.alert("Company didn't got Delete")
      console.log(error)
    }
  }

  useEffect(() => {
   setcompany(user)
  }, [user])
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
          {company?.map((data, index) => {
            return (<SingleCompany data={data} ind={index} key={index} 

              handleDelete = {handleDelete}
            />
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
export default CompanyTable;
