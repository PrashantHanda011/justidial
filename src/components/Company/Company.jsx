import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import "./company.css";
import { company, GetallCategory, GetallCategoryByID } from "../Axios/apis";
import { Row, Form, InputGroup, Button } from "react-bootstrap";
import CommonHeader from "../Header/Header";
import { BsSearch, BsFillCalendarDateFill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Select from 'react-select'
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import CompanyTable from "./companyTable";
function Company() {

  const { show } = useContext(UserContext);
  const [filter, setFilter] = useState(false);
  const [companies, setcompanies] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setsearchInput] = useState('');
  const [filterData, setfilterData] = useState([])
  const [loder, setloder] = useState(true)
  const [category, setcategory] = useState()
 


  const FetchCompany = async () => {
    try {
      
      const { data } = await company();
      console.log(data)
      setcompanies(data.data);
      setloder(true)
    } catch (error) {
      console.log(error);
      setloder(false)
    }
  };
  

  const FetchAllCategory = async () => {
    try {
      
      const { data } = await GetallCategory();
      setcategory(data.data)
      console.log(data?.data);
      setloder(true)
    } catch (error) {
      console.log(error);
      setloder(true)
    }
  };

useEffect(() => {
  FetchCompany()
  FetchAllCategory()
}, [])

  const searchItems = (searchValue) => {
    setsearchInput(searchValue)
    if(searchInput !== ''){
      let filteredData =  companies?.filter((item) => {  
      return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
      })
      setfilterData(filteredData)
    }else{
      setfilterData(companies)
    }
  }
  const handleChangeCategory=async(e)=>{
    const categoryID={
      categoryId:e.target.value
    }
    console.log(categoryID)
    try {
        const data= await GetallCategoryByID(categoryID)
        console.log(data.data?.data?.company);
        setcompanies(data?.data?.data?.company)
    } catch (error) {
        console.log(error)
    }
  }


// modal
  return (
    <>
        <div className="main-div ps-3">
        <div
          className="clientsales-main"
          style={{ marginLeft: show ? "1px" : "2.3em" }}
        >
            <CommonHeader />
{
  companies.length>0 ? (
    <Row>
            {(loder) ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
           <div
                className="card-Dash text-start ms-3"
                style={{ backgroundColor: "transparent", height: "0" }}
              >
                <h2 className="mt-4 mb-3">Company </h2>
                <Link to={'/companymanage/addcompany'}>
                  <Button variant="primary" >
                    Add Company
                  </Button>
                </Link>
              </div>



                  <Form className="search-main">
 
          <select class="form-select" onChange={handleChangeCategory} aria-label="Default select example">
            {
              category?.map((item,index)=>{
                return  <option key={index} value={item._id}>{` ${item.type} - ${item.subtype} - ${item.name}`}</option>
              })
            }
           
          </select> 

                    <InputGroup className="mb-3 mt-2">
                                   <InputGroup.Text className="rsearch-button-icon">
                        <BsSearch size={20} />
                      </InputGroup.Text>
                      <Form.Control
                        className="rsearch-bar"
                        type="text"
                        placeholder="Search"
                        value={searchInput}
                onChange={(e)=>searchItems(e.target.value)}
                      />
                    </InputGroup>
                  </Form>
                </div>
                <div className="d-flex justify-content-end ">
                  <h2
                    className="filterDate"
                    onClick={() =>
                      filter ? setFilter(false) : setFilter(true)
                    }
                  >
                    {/* Filter Users{" "}
                    <BsFillCalendarDateFill size="24" color="#000" />{" "} */}
                  </h2>
                </div>
                
                <Row style={{ marginTop: "20px" }}>
                   <CompanyTable user={(searchInput.length > 1) ?(filterData):(companies)} /> 
                </Row>
              </>
            ) : (
              <div className="d-flex justify-content-center mt-5">
                <div className="loading-main ">
                  <div className="loader" />
                </div>
              </div>
            )}
          </Row>
    
  ):(
    <div className="d-flex justify-content-center mt-5">
                <div className="loading-main ">
                  <div className="loader" />
                </div>
              </div>

  )
}
 
        </div>
      </div>

    </>
  )
}

export default Company