import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Singleuserfield from "./Singleuserfield";
import { UserDelete } from "../Axios/apis";
// import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

const DashTable = ({ user }) => {
  const navigate = useNavigate();


  const [UserData, setUserData] = useState(user)

  const handleDelete = async(id)=>{
    try {
      const yes  =window.confirm("Do you want to delete User ?")
      if(yes){
        const temp={
          userId:`${id}`
        }
        
        const newarr = UserData.filter((item)=>item._id!=id)
        console.log(newarr)
        setUserData(newarr)
        await UserDelete(temp)
        window.alert("User Deleted")
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {user?.length !== 0 ? (
        <Table className="report-table-main">
          <thead>
            <tr className="Rtable-header">
              <th>S.no</th>

              <th> Name</th>
              <th> Phone Number</th>
              <th>E-mail</th>
              <th>Firm Name</th>
              

              <th>Action</th>
            </tr>
          </thead>
          {UserData?.map((data, id) => {
            return <Singleuserfield
              id={id}
              key={id}
              userid={data._id}
              name={data.name}
              email={data.email}
              firm_name={data.firm_name}
              full_huges_number={data.full_huges_number}
              gstin_number={data.gstin_number}
              huges_number={data.huges_number}
              mob_number={data.mob_number}
              position={data.position}
              type={data.type}
              handleDelete = {handleDelete}
            />
          })}
        </Table>
      ) : (
        <h2 className="text-center">No User Data To Display</h2>
      )}
    </>
  );
};
export default DashTable;
