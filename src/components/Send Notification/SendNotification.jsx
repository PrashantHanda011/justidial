import React,{useContext,useState} from 'react'
import CommonHeader from '../Header/Header'
import { UserContext } from '../../App';
import { Form } from 'react-bootstrap';
import { NotificationSend } from '../Axios/apis';

function SendNotification() {
  const { show } = useContext(UserContext);
  const [Notification, setNotification] = useState({
        title:"",
        description:""
  })
  const handleNotification=(e)=>{
    const {name}=e.target
    setNotification({...Notification,[name]:e.target.value})
  }

  const handleSubmit=async()=>{
    try {
        await NotificationSend(Notification)
        alert("Notification Sent")
        setNotification({...Notification,title:"",description:""})

    } catch (error) {
      console.log(error)
    }
  }
  console.log(Notification);
  
  return (
    <>
         <div className="main-div ps-3">
          <div className="clientsales-main" style={{ marginLeft: show ? "1px" : "2.3em" }}>
            <CommonHeader />
            <div
                className=" text-start "
                style={{ backgroundColor: "transparent",color:"orange" }}
              >
                <h2 className="mt-4 mb-5"> Send Notification </h2>
                <div className="mt-5 col-8">
               
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" onChange={handleNotification} name="title"  placeholder="Enter Title" />
                  </Form.Group>
               
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" onChange={handleNotification} name="description"  placeholder="Enter Description" />
                  </Form.Group>

                  <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
               
                </div>
                
              </div>
 
          </div>
        </div>

    </>
  )
}

export default SendNotification