import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function SingleCompany(prop) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
    <>
         <tbody key={prop.id} style={{ border: "none" }}>
                  <tr>
                    <td className="Rtable-data">{prop?.id + 1}</td>
                    <td className="Rtable-data">{prop?.data?.firm_name}</td>
                    <td className="Rtable-data">{prop?.data?.huges_number[0]}</td>
                    <td className="Rtable-data">{prop?.data?.address ?(prop?.data?.address):("No address")}</td>
                    <td className="Rtable-data"> <button onClick={handleShow} className="btn btn-primary">View</button></td>
                
                </tr>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Company Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <ul>
                      <li>Address - {prop?.data?.address}</li>
                      <li>City - {prop?.data?.city}</li>
                      <li>Email - {prop?.data?.email}</li>
                      <li>Firm Name - {prop?.data?.firm_name}</li>
                      <li>Full Huges No. - {prop?.data?.full_huges_number}</li>
                      <li>Gstin No. - {prop?.data?.gstin_number}</li>
                      <li>Huges No. - {prop?.data?.huges_number}</li>
                      <li>Mobile No. - {prop?.data?.mob_number}</li>
                      <li>Person Name - {prop?.data?.person_name}</li>
                      <li>Pincode - {prop?.data?.pincode}</li>
                      <li>Profile - {prop?.data?.profile}</li>
                      <li>State - {prop?.data?.state}</li>
                      <li>Whatsapp Link - {prop?.data?.whatsapp_link}</li>
                      <li>Whatsapp number - {prop?.data?.whatsapp_number}</li>
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

export default SingleCompany