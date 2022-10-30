import React, { useContext, useState, useEffect } from 'react'
import CommonHeader from '../Header/Header'
import { Form } from 'react-bootstrap';
import {storage} from '../firebase/index'
import { UserContext } from '../../App';
import { GetallCategory, PostCompany } from '../Axios/apis';
import { useNavigate } from 'react-router-dom';
import {getDownloadURL, ref,uploadBytes, uploadBytesResumable} from 'firebase/storage'


function AddCompany() {
  const { show } = useContext(UserContext);
  const [category, setcategory] = useState()
  const [profilePercent, setprofilePercent] = useState(0);
  const [ImagePercent, setImagePercent] = useState(0);
  const [addCompany, setaddCompany] = useState({
    firm_name: "",
    huges_number: [],
    category: "",
    profile: "",
    person_name: "",
    images: [],
    email: "",
    mob_number: [],
    whatsapp_number: [],
    gstin_number: "",
    address: "",
    city: "",
    pincode: "",
    state: ""
  })
  const location = useNavigate()

  const handleCompany = (e) => {
    const { name } = e.target
    setaddCompany({ ...addCompany, [name]: e.target.value })
  }
  console.log(addCompany)

  const FetchAllCategory = async () => {
    try {

      const { data } = await GetallCategory();
      setcategory(data.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchAllCategory()
  }, [])


  // huges

  const addHuges = (e) => {
    let newfield = e.target.value;
    setaddCompany({
      ...addCompany,
      huges_number: [...addCompany?.huges_number, newfield],
    });
  };
  const removeHuges = (index) => {
    let data = [...addCompany?.huges_number];
    data.splice(index, 1);
    setaddCompany({ ...addCompany, huges_number: data });
  };

  const handleHuges = (index, event) => {
    let data = [...addCompany?.huges_number];
    data[index] = event.target.value;
    setaddCompany({ ...addCompany, huges_number: data });
  };


  //images

  const addImages = (e) => {
    let newfield = e.target.value;
    setaddCompany({
      ...addCompany,
      images: [...addCompany?.images, newfield],
    });
  };


  const removeImage = (index) => {
    let data = [...addCompany?.images];
    data.splice(index, 1);
    setaddCompany({ ...addCompany, images: data });
  };

  const handleImage = (index,e ) => {
   e.preventDefault()
   let data = [...addCompany?.images];

    let image=e.target.files[0]
   if (!image) return;
   const storageRef = ref(storage, `/Images/${image.name}`);
   const uploadTask = uploadBytesResumable(storageRef, image);
   uploadTask.on(
     'state_changed',
     (snap) => {
       const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
       setImagePercent( percentUploaded ); 

     },
     (error) => {
       alert(error);
     },
     () => {
       getDownloadURL(uploadTask.snapshot.ref).then((imgurl) => {
        data[index] = imgurl;
        setaddCompany({ ...addCompany, images: data });
       });
     })
  };

  const handleProfileChange = (e) => {
    e.preventDefault();
    let image=e.target.files[0]
    if (!image) return;
    const storageRef = ref(storage, `/Profile/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snap) => {
        const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        setprofilePercent( percentUploaded ); 

      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((imgurl) => {
          setaddCompany({...addCompany , profile :imgurl })
        });
      })
  }


  // mobile numbers
  const addMobile = (e) => {
    let newfield = e.target.value;
    setaddCompany({
      ...addCompany,
      mob_number: [...addCompany?.mob_number, newfield],
    });
  };

  const removeMobile = (index) => {
    let data = [...addCompany?.mob_number];
    data.splice(index, 1);
    setaddCompany({ ...addCompany, mob_number: data });
  };

  const handleMobile = (index, event) => {
    let data = [...addCompany?.mob_number];
    data[index] = event.target.value;
    setaddCompany({ ...addCompany, mob_number: data });
  };


  // whatsapp_number

  const addWhatsapp = (e) => {
    let newfield = e.target.value;
    setaddCompany({
      ...addCompany,
      whatsapp_number: [...addCompany?.whatsapp_number, newfield],
    });
  };


  const removeWhatsapp = (index) => {
    let data = [...addCompany?.whatsapp_number];
    data.splice(index, 1);
    setaddCompany({ ...addCompany, whatsapp_number: data });
  };

  const handleWhatsapp = (index, event) => {
    let data = [...addCompany?.whatsapp_number];
    data[index] = event.target.value;
    setaddCompany({ ...addCompany, whatsapp_number: data });
  };


  // handlesubmit


  const handleSubmit = async () => {
    try {
      await PostCompany(addCompany);
      location('/companymanage')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="main-div ps-5">
        <div className="clientsales-main" style={{ marginLeft: show ? "1px" : "2.3em" }}>
          <CommonHeader />
          <div
            className=" text-start "
            style={{ backgroundColor: "transparent", color: "orange" }}
          >
            <h2 className="mt-4 mb-5"> Add Company </h2>

          </div>
          <div className="mt-5 col-8">

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Firm Name {' '} <span style={{color:"red"}}>*</span> </Form.Label>
              <Form.Control type="text" onChange={handleCompany} name="firm_name" placeholder="Enter Firm Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" onChange={handleCompany} name="person_name" placeholder="Enter Your Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={handleCompany} name="email" placeholder="Enter Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" onChange={handleCompany} name="address" placeholder="Enter address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" onChange={handleCompany} name="city" placeholder="Enter City" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" onChange={handleCompany} name="state" placeholder="Enter State" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Pincode</Form.Label>
              <Form.Control type="number" onChange={handleCompany} name="pincode" placeholder="Enter Pincode" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>GSTIN Number</Form.Label>
              <Form.Control type="text" onChange={handleCompany} name="gstin_number" placeholder="Enter GST no." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category {' '} <span style={{color:"red"}}>*</span></Form.Label>
              <select class="form-select" onChange={handleCompany} name="category" aria-label="Default select example">
                {
                  category?.map((item, index) => {
                    return <option key={index} value={item._id}>{` ${item.type} - ${item.subtype} - ${item.name}`}</option>
                  })
                }
              </select>
            </Form.Group>


            {/* images */}

            <hr />

            <Form.Group className="mb-3 my-4 d-flex flex-column" controlId="formBasicEmail">
              <Form.Label>Profile Pic</Form.Label>
              <Form.Control type="file" onChange={handleProfileChange} name="profile" placeholder="Enter GST no." />
              <div className="progress-bar my-3" role="progressbar" aria-valuenow="0"
                  aria-valuemin="0" aria-valuemax="100" style={{width:(`${profilePercent}%`)}}>
                    {profilePercent}
                  </div>
            </Form.Group>

            <hr />

            <Form.Group className="mb-5" controlId="formBasicEmail">
              <Form.Group
                className="mb-3 mt-4  d-flex justify-content-between align-items-center"
                controlId="formBasicPassword"
              >
                <h4>Add Images</h4>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={addImages}
                >
                  Add Images
                </button>
              </Form.Group>
              {addCompany?.images?.map((item, index) => {
                return (
                  <>
                    <Form.Group className="mb-3 mt-3 d-flex justify-content-between align-items-center">
                      <h5> Image {index + 1}</h5>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeImage(index)}
                      >
                        Remove  {index + 1}
                      </button>
                    </Form.Group>
                    <Form.Control type="file" onChange={(e) => handleImage(index, e)} name="" placeholder="Choose Image" />
                  </>
                )
              })
              }
            </Form.Group>

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
              {addCompany?.huges_number?.map((item, index) => {
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
                    <Form.Control type="text" onChange={(e) => handleHuges(index, e)} name="huges_number" placeholder="Enter Huges No." />
                  </>
                )
              })
              }

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
              {addCompany?.mob_number?.map((item, index) => {
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
                    <Form.Control type="tel" onChange={(e) => handleMobile(index, e)} name="mob_number" placeholder="Enter Mobile No." />
                  </>
                )
              })
              }

            </Form.Group>

     <hr />
            <Form.Group className="mb-5" controlId="formBasicEmail">
              <Form.Group
                className="mb-3 mt-4  d-flex justify-content-between align-items-center"
                controlId="formBasicPassword"
              >
                <h4>Add Whatsapp number</h4>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={addWhatsapp}
                >
                  Add Whatsapp number
                </button>
              </Form.Group>
              {addCompany?.whatsapp_number?.map((item, index) => {
                return (
                  <>
                    <Form.Group className="mb-3 mt-3 d-flex justify-content-between align-items-center">
                      <h5> Whatsapp No {index + 1}</h5>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeWhatsapp(index)}
                      >
                        Remove  {index + 1}
                      </button>
                    </Form.Group>
                    <Form.Control type="tel" onChange={(e) => handleWhatsapp(index, e)} name="whatsapp_number" placeholder="Enter Whatsapp No." />
                  </>
                )
              })
              }

            </Form.Group>


            <button className="btn btn-primary mb-5" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCompany
