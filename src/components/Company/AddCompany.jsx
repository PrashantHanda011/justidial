import React,{useContext,useState,useEffect} from 'react'
import CommonHeader from '../Header/Header'
import { Form } from 'react-bootstrap';
import { UserContext } from '../../App';
import { GetallCategory, PostCompany } from '../Axios/apis';
import { useNavigate } from 'react-router-dom';
function AddCompany() {
    const { show } = useContext(UserContext);
    const [category, setcategory] = useState()   
    const [addCompany, setaddCompany] = useState({
        firm_name:"",
        huges_number:[],
        category:""
  
    })
    const location =useNavigate()
 
    const handleCompany=(e)=>{
    const {name}=e.target
    setaddCompany({...addCompany,[name]:e.target.value})
}

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



  const handleSubmit = async()=>{
    try {
        await PostCompany(addCompany);
        location('/companymanage')
    } catch (error) {
            console.log(error);
    }
  }
  return (
    <>
        <div className="main-div ps-3">
        <div className="clientsales-main" style={{ marginLeft: show ? "1px" : "2.3em" }}>
            <CommonHeader />
                <div
                className=" text-start "
                style={{ backgroundColor: "transparent",color:"orange" }}
              >
                <h2 className="mt-4 mb-5"> Add Company </h2>
                
              </div>
                <div className="mt-5 col-8">
                    
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Firm Name</Form.Label>
            <Form.Control type="text" onChange={handleCompany} name="firm_name"  placeholder="Enter Firm Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <select class="form-select" onChange={handleCompany} name="category" aria-label="Default select example">
            {
              category?.map((item,index)=>{
                return  <option key={index} value={item._id}>{` ${item.type} - ${item.subtype} - ${item.name}`}</option>
              })
            }
          </select>      
          </Form.Group>

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
                            <Form.Control type="text" onChange={(e)=>handleHuges(index,e)}  name="huges_number"  placeholder="Enter Huges No." />
                        </>
            )})
            }
            
            </Form.Group>

                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
        </div>
        </div>
    </>
  )
}

export default AddCompany