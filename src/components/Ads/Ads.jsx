import React, { useState, useEffect } from 'react'
import CommonHeader from '../Header/Header'
import './ads.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { DeleteCategoryads, Deletetopads, GetallCategory, GetBottom, GetCategory, Getpopups, GetTop, PostCategoryAds } from '../Axios/apis'
import { AiFillDelete } from 'react-icons/ai'
import {storage} from '../firebase/index'
import TopSingle from './Singleads/TopSingle'
import PopupSingle from './Singleads/PopupSingle'
import BottomSingle from './Singleads/BottomSingle'
import CategorySingle from './Singleads/CategorySingle'
import {getDownloadURL, ref,uploadBytes, uploadBytesResumable} from 'firebase/storage'

function Ads() { 

  const [popupads, setpopupads] = useState([])
  const [topads, settopads] = useState([])
  const [deletetopads, setdeletetopads] = useState({
    top: null,
  })

  const [bottomads, setbottomads] = useState([])
  const [categoryads, setcategoryads] = useState([])

  const fetchpopupads = async () => {
    try {
      const data = await Getpopups();
      setpopupads(data?.data?.data)
    } catch (error) {
      console.log(error);
    }
  }
  const fetchtopads = async () => {
    try {
      const data = await GetTop();
      settopads(data?.data?.data[0]?.top)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchbottomads = async () => {
    try {
      const data = await GetBottom();
      setbottomads(data?.data?.data[0]?.bottom)
    } catch (error) {
      console.log(error);
    }
  }

  const [category, setcategory] = useState([]);
  const [categoryID, setcategoryID] = useState(null)
  const [categoryAds, setcategoryAds] = useState([]);

  const fetchcategory = async () => {
    try {
      const data = await GetallCategory();
      setcategory(data.data.data)
      console.log(data)

      //  setcategoryads(data?.data?.data[0]?.category)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchcategoryAds = async () => {
    const categoryData = {
      category: categoryID
    }
    try {
      const data = await GetCategory(categoryData);
      console.log(data.data.data.length)
      if(data.data.data.length !==0){
        console.log(data)
        setcategoryAds(data.data.data[0].ad)
      }else{
        setcategoryAds([])
      }
      console.log(data.data.data[0].ad)
      //  setcategoryads(data?.data?.data[0]?.category)
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    fetchpopupads();
    fetchcategoryAds()
    fetchtopads();
    fetchbottomads()
    fetchcategory()

  }, [])

  useEffect(() => {
   
    if (categoryID != null) {
      fetchcategoryAds();
    }
  }, [categoryID])
  const handleChangeCategory = (e) => {
    setcategoryID(e.target.value)
    setCategoryAdData({...CategoryAdData,category:e.target.value})
  }



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [imagePercent, setimagePercent] = useState(0)
  const [CategoryAdData, setCategoryAdData] = useState({
    category :categoryID,
    ad:"",
  });

  const handleFileChange =(e)=>{
    e.preventDefault()
    let image=e.target.files[0]
    if (!image) return;
    const storageRef = ref(storage, `/popups/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snap) => {
        const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        setimagePercent( percentUploaded ); 
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((imgurl) => {
          setCategoryAdData({...CategoryAdData , ad:imgurl});
        });
      })

  }

  const handleAdSubmit =async(e)=>{
    e.preventDefault()
    try {
      const data = await PostCategoryAds(CategoryAdData);
      console.log(data)
      handleClose()
      fetchcategoryAds()
    } catch (error) {
        console.log(error)
    }
}


const handleDeleteCategoryAd = (pic)=>{
  console.log(pic)
  const newdata={
    category:categoryID,
    ad:pic
  }
  try {
    setcategoryAds(categoryAds.filter((item)=>item!=pic))
    const data= DeleteCategoryads(newdata);
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
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
              popupads?.map((item, index) => {
                return <PopupSingle key={index} item={item?.popup} id={index} />
              })
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
          <div className=" d-flex " style={{ overflowX: "scroll" }}>
            {
              topads?.map((item, index) => {
                return <TopSingle item={item} key={index} id={index} />
              })
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
          <div className=" d-flex" style={{ overflowX: "scroll" }}>
            {
              bottomads?.map((item, index) => {
                return <BottomSingle item={item} key={index} id={index} />
              })
            }
          </div>
        </div>

        <div className="row ads-popup my-5">
          <div className="d-flex justify-content-between my-2">
            <h5>Category</h5>
            {/* <div>
              <Link to="/ads/categoryadd">
                <button className='btn btn-primary mx-3'>Add</button>
                </Link>
              </div> */}
            <select className="form-select w-25" onChange={handleChangeCategory} aria-label="Default select example">
            <option >Please Select A Category</option>
              {
                category?.map((item, index) => {
                  return <option key={index} value={item._id}>{` ${item.type} - ${item.subtype} - ${item.name}`}</option>
                })
              }
            </select>
          </div>


          <div className=" d-flex" style={{ overflowX: "scroll" }}>
            {
              categoryAds.length != 0 ? (
                categoryAds?.map((item, index) => {
                  return <CategorySingle handleDeleteCategoryAd={handleDeleteCategoryAd} item={item} id={index} />
                })
              ) : (
                <div className='m-3'>
                  No Images
                </div>
              )

            }
            <Button type="button" className="align-self-end" onClick={handleShow} >+</Button>
          </div>
        </div>


      </div>
    </div>


    <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                <input type="file" onChange={handleFileChange} />

                <div className="progress my-4">
                  <div className="progress-bar" role="progressbar" aria-valuenow="0"
                  aria-valuemin="0" aria-valuemax="100" style={{width:(`${imagePercent}%`)}}>
                    {imagePercent}
                  </div>
                </div>
                  <Button onClick={handleAdSubmit} disabled={CategoryAdData.ad !="" ?(false):(true)}>Submit</Button>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    
                    </Modal.Footer>
                  </Modal>
  </>
  )
}

export default Ads