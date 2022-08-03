import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Singleuserfield(data) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                      <li>Type - {data?.position}</li>
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