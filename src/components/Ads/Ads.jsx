import React,{useState,useEffect} from 'react'
import CommonHeader from '../Header/Header'
import './ads.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Deletetopads, GetBottom, GetCategory, Getpopups, GetTop } from '../Axios/apis'
import { AiFillDelete } from 'react-icons/ai'
import TopSingle from './Singleads/TopSingle'
import PopupSingle from './Singleads/PopupSingle'
import BottomSingle from './Singleads/BottomSingle'
import CategorySingle from './Singleads/CategorySingle'
function Ads() {

const [popupads, setpopupads] = useState([])
const [topads, settopads] = useState([])
const [deletetopads, setdeletetopads] = useState({
  top:null,
})

const [bottomads, setbottomads] = useState([])
const [categoryads, setcategoryads] = useState([])

const fetchpopupads=async()=>{
  try {
      const data =await Getpopups();
    setpopupads(data?.data?.data)
    } catch (error) {
      console.log(error);
    }
}
const fetchtopads=async()=>{
  try {
      const data =await GetTop();
    settopads(data?.data?.data[0]?.top)
    } catch (error) {
      console.log(error);
    }
}

const fetchbottomads=async()=>{
  try {
      const data =await GetBottom();
    setbottomads(data?.data?.data[0]?.bottom)
  } catch (error) {
      console.log(error);
    }
}
const fetchcategoryads=async()=>{
  try {
      const data =await GetCategory();
    setcategoryads(data?.data?.data[0]?.category)
    } catch (error) {
      console.log(error);
    }
}



useEffect(() => {
  fetchpopupads();
  fetchtopads();
  fetchbottomads()
  fetchcategoryads()
}, [])

  return (<>
  
  <div className="container">

        <CommonHeader />
  </div>
    <div className="container px-5">
      <div className="row ps-4">
      <div
                className="card-Dash text-start  h-25"
                style={{ backgroundColor: "transparent" }}
              >
                <h2 className="mt-4">Ads</h2>
              </div>
          <div className="row ads-popup my-5">
          <div className="d-flex justify-content-between my-2">
            <h5>On Popup</h5>
              <div>
              <Link to="/ads/popupadd">
                <button className='btn btn-primary mx-3'>Add</button>
              </Link>
              </div>
            </div>
            <div className=" d-flex">
            {
              popupads?.map((item,index)=>{
                return <PopupSingle item={item?.popup} id={index}/>})
              }
            
            </div>
          </div>

          <div className="row ads-popup my-5">
            <div className="d-flex justify-content-between my-2">
            <h5>Top</h5>
              <div>
              <Link to="/ads/topadd">
                <button className='btn btn-primary mx-3'>Add</button>
               </Link> 
              </div>
            </div>
            <div className=" d-flex " style={{overflowX:"scroll"}}>
             {
              topads?.map((item,index)=>{
                  return <TopSingle item={item} id={index}/>})
             }
            </div>
          </div>

          <div className="row ads-popup my-5">
          <div className="d-flex justify-content-between my-2">
            <h5>Bottom</h5>
              <div>
              <Link to="/ads/bottomadd">
                <button className='btn btn-primary mx-3'>Add</button>
                </Link>
              </div>
            </div>
            <div className=" d-flex" style={{overflowX:"scroll"}}>
            {
              bottomads?.map((item,index)=>{
                  return <BottomSingle item={item} id={index}/>
              })
             }
            </div>
          </div>

          <div className="row ads-popup my-5">
          <div className="d-flex justify-content-between my-2">
            <h5>Category</h5>
              <div>
              <Link to="/ads/categoryadd">
                <button className='btn btn-primary mx-3'>Add</button>
                </Link>
              </div>
            </div>
            <div className=" d-flex" style={{overflowX:"scroll"}}>
            {
              categoryads?.map((item,index)=>{
                  return <CategorySingle item={item} id={index}/>
              })
             }
            </div>
          </div>


      </div>
    </div>
    </>
  )
}

export default Ads