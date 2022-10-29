import React, { useState, useContext, useEffect } from "react";
import { Form } from 'react-bootstrap'
import CommonHeader from '../Header/Header'
import { useParams } from 'react-router-dom'
import { UserContext } from "../../App";
import { UpdateUsers, UsersById } from "../Axios/apis";
import { useNavigate } from 'react-router-dom'
function UserEdit() {
  const { show } = useContext(UserContext);
  const [User, setUser] = useState([]);
  const history = useNavigate()
  const param = useParams();
  const [UpdateUser, setUpdateUser] = useState({
    userId: `${param.id}`,
    name: "",
    firm_name: "",
    email: "",
    gstin_number: "",
    position: "",
    type: "",
    address: "",
    city: "",
    state: "",
    huges_number: [],
    mob_number: [],
    pincode: ""
  })
  const [loading, setloading] = useState(true)

  const temp = {
    userId: `${param.id}`,
    ...UpdateUser
  }
  console.log(temp)
  const getdata = async () => {
    try {
      const data = await UsersById(temp)
      setUser(data?.data?.data)
      setUpdateUser(data?.data?.data)
      setloading(false)
    } catch (err) {
      console.log(err)
      setloading(false)
    }
  }



  useEffect(() => {
    getdata()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({ ...UpdateUser, [name]: value })
  }

  const handlehugeChange = (e) => {

  }

  const handleSubmit = async () => {
    try {
      const data = await UpdateUsers(temp);

      history('/usermanage')
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }


  // mobile numbers

  const addMobile = (e) => {
    let newfield = e.target.value;
    setUpdateUser({
      ...UpdateUser,
      mob_number: [...UpdateUser?.mob_number, newfield],
    });
  };

  const removeMobile = (index) => {
    let data = [...UpdateUser?.mob_number];
    data.splice(index, 1);
    setUpdateUser({ ...UpdateUser, mob_number: data });
  };

  const handleMobile = (index, event) => {
    let data = [...UpdateUser?.mob_number];
    data[index] = event.target.value;
    setUpdateUser({ ...UpdateUser, mob_number: data });
  };


  //huges
  const addHuges = (e) => {
    let newfield = e.target.value;
    setUpdateUser({
      ...UpdateUser,
      huges_number: [...UpdateUser?.huges_number, newfield],
    });
  };
  const removeHuges = (index) => {
    let data = [...UpdateUser?.huges_number];
    data.splice(index, 1);
    setUpdateUser({ ...UpdateUser, huges_number: data });
  };

  const handleHuges = (index, event) => {
    let data = [...UpdateUser?.huges_number];
    data[index] = event.target.value;
    setUpdateUser({ ...UpdateUser, huges_number: data });
  };



  return (
    <>
      <div className="main-div ps-3">
        <div className="clientsales-main" style={{ marginLeft: show ? "1px" : "2.3em" }}>
          <CommonHeader />
          {
            loading ? (
              <div className="d-flex justify-content-center mt-5">
                <div className="loading-main ">
                  <div className="loader" />
                </div>
              </div>) : (
              <>
                <div
                  className=" text-start "
                  style={{ backgroundColor: "transparent", color: "orange" }}
                >
                  <h2 className="mt-4 ms-4 mb-5"> Update User </h2>

                </div>
                <div className="mt-5 ms-4 col-8">

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={User?.name} onChange={handleChange} type="text" name="name" placeholder=" Name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Firm Name</Form.Label>
                    <Form.Control defaultValue={User?.firm_name} type="text" onChange={handleChange} name="firm_name" placeholder="Firm Name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control defaultValue={User?.email} type="email" name="email" onChange={handleChange} placeholder="Email" />
                  </Form.Group>


                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>GSTIN Number</Form.Label>
                    <Form.Control defaultValue={User?.gstin_number} type="text" name="gstin_number" onChange={handleChange} placeholder="GSTIN Number" />
                  </Form.Group>

                  {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Huges Number</Form.Label>
                    {
                      User?.huges_number?.map((item, index) => {
                        return <Form.Control onChange={handlehugeChange} defaultValue={item} type="number" />
                      })
                    }
                  </Form.Group> */}

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Position</Form.Label>
                    <select className="form-select" onChange={handleChange} name="position" aria-label="Default select example">
                      <option style={{ color: "yellowgreen" }} > ~ {User?.position} ~</option>
                      <option value="Owner">Owner</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </Form.Group>

                  <hr />
                  <Form.Group className="mb-5" controlId="formBasicEmail">
                    <Form.Group
                      className="mb-3 mt-4  d-flex justify-content-between align-items-center"
                      controlId="formBasicPassword"
                    >
                      <h4>Add Mobile number</h4>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={addMobile}
                      >
                        Add Mobile number
                      </button>
                    </Form.Group>
                    {UpdateUser?.mob_number?.map((item, index) => {
                      return (
                        <>
                          <Form.Group className="mb-3 mt-3 d-flex justify-content-between align-items-center">
                            <h5> Mobile No {index + 1}</h5>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => removeMobile(index)}
                            >
                              Remove  {index + 1}
                            </button>
                          </Form.Group>
                          <Form.Control type="tel" onChange={(e) => handleMobile(index, e)} defaultValue={item} name="mob_number" placeholder="Enter Mobile No." />
                        </>
                      )
                    })
                    }

                  </Form.Group>
                  <hr />

                  <hr />

                  <Form.Group className="mb-5" controlId="formBasicEmail">
                    <Form.Group
                      className="mb-3 mt-4  d-flex justify-content-between align-items-center"
                      controlId="formBasicPassword"
                    >
                      <h4>Add Huges number</h4>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={addHuges}
                      >
                        Add Huges number
                      </button>
                    </Form.Group>
                    {UpdateUser?.huges_number?.map((item, index) => {
                      return (
                        <>
                          <Form.Group className="mb-3 mt-3 d-flex justify-content-between align-items-center">
                            <h5> Huges No {index + 1}</h5>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => removeHuges(index)}
                            >
                              Remove  {index + 1}
                            </button>
                          </Form.Group>
                          <Form.Control type="text" onChange={(e) => handleHuges(index, e)} defaultValue={item} name="huges_number" placeholder="Enter Huges No." />
                        </>
                      )
                    })
                    }

                  </Form.Group>

                  <hr />


                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Type</Form.Label>
                    <select className="form-select" onChange={handleChange} name="type" aria-label="Default select example">
                      <option style={{ color: "yellowgreen" }} > ~ {User?.type} ~</option>
                      <option value="Stockist">Stockist</option>
                      <option value="Supplier">Supplier</option>
                    </select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control defaultValue={User?.address} type="text" onChange={handleChange} name="address" placeholder="Address" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Control defaultValue={User?.city} type="text" name="city" onChange={handleChange} placeholder="City" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>State</Form.Label>
                    <Form.Control defaultValue={User?.state} type="text" name="state" onChange={handleChange} placeholder="State" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control defaultValue={User?.pincode} type="number" name="pincode" onChange={handleChange} placeholder="Pincode" />
                  </Form.Group>
                  <button className="btn btn-primary mb-5 my-3" onClick={handleSubmit}>Update</button>
                </div>


              </>
            )}
        </div>

      </div>
    </>
  )
}

export default UserEdit;