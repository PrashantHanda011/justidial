import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UpdateUsers } from '../Axios/apis';
function Singleuserfield(data) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [update, setupdate] = useState(false);
    const [positionData, setpositionData] = useState({
      userId:data.userid,
      position:""
    })

    const handleChange = (e)=>{
      let name = e.target.name
      setpositionData({...positionData,[name]:e.target.value})
    }
    const handleSubmit=async()=>{
      try {        
        const data=await UpdateUsers(positionData)
        window.location.reload()
        setupdate(false)
      } catch (error) {
        console.log(error);
      }
    }


  return (
    <>
                        <tbody key={data.id} style={{ border: "none" }}>
                  <tr>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                    >
                      {data.id + 1}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                    >
                      {data?.name}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                    >
                      {data?.mob_number}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                    >
                      {data?.email}
                    </td>
                    <td
                      className="Rtable-data"
                      style={{ cursor: "pointer" }}
                    >
                      {data?.firm_name}
                    </td>
                    <td className="Rtable-data "> <button onClick={handleShow} className="btn btn-primary">View</button></td>

                  </tr>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <ul>
                      <li>Address - {data?.adress}</li>
                      <li>City - {data?.city}</li>
                      <li>Email - {data?.email}</li>
                      <li>Firm Name - {data?.firm_name}</li>
                      <li>Name - {data?.name}</li>
                      <li>Mobile - {data?.mob_number}</li>
                      <li>Gstin No. - {data?.gstin_number}</li>
                      <li>Pincode. - {data?.pincode}</li>
                      <li>Type - {data?.type}</li>
                      <li>Position - {data?.position}  { update?(<button className="btn btn-danger btn-sm ms-5" onClick={()=> setupdate(false)}>Close</button> ):(<button onClick={()=>setupdate(true)} className="btn btn-success btn-sm ms-5">Update</button>) } </li>

                      {
                        update ?(<>
                          <div className="form-check my-1">
                          <input className="form-check-input" type="radio" name="position" defaultValue={data?.position} onChange={handleChange} value="Owner" id="flexRadioDefault"/>
                          <label className="form-check-label" for="flexRadioDefault1">
                            Owner
                          </label>
                        </div>
                        <div className="form-check my-1">
                          <input className="form-check-input" type="radio" name="position" defaultValue={data?.position} value="Employee" onChange={handleChange} id="flexRadioDefaul" />
                          <label className="form-check-label" for="flexRadioDefault2">
                            Employee
                          </label>
                        </div>
                        <button onClick={handleSubmit} className="btn btn-secondary my-3"> Save</button>

                        </>):("")

                      }
                     
                      <li>State - {data?.state}</li>
                      <li>Full Huges No. - {data?.full_huges_number}</li>
                    </ul>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    
                    </Modal.Footer>
                  </Modal>
                </tbody>
    </>
  )
}

export default Singleuserfield