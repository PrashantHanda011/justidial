import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import {useNavigate} from 'react-router-dom'


function SingleCompany(prop) {
    const [show, setShow] = useState(false);
    const location = useNavigate()  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
    <>
         <tbody  style={{ border: "none" }}>
                  <tr>
                    <td className="Rtable-data">{prop?.ind + 1}</td>
                    <td className="Rtable-data">{prop?.data?.firm_name}</td>
                    <td className="Rtable-data">{prop?.data?.huges_number[0]}</td>
                    <td className="Rtable-data">{prop?.data?.address ?(prop?.data?.address):("No address")}</td>
                    <td className="Rtable-data "> <button onClick={handleShow} className="btn mx-2 btn-primary btn-sm"><BsEye fontSize={20}
                      className='my-0 '/></button>
                    <button className='btn btn-success btn-sm mx-2' onClick={()=>location(`/companymanage/${prop?.data._id}`)}><AiFillEdit fontSize={20} /></button>
                    <button className='btn btn-danger btn-sm mx-2' onClick={()=>prop?.handleDelete(prop?.data?._id)}><AiFillDelete fontSize={20}/></button>
                    </td>

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