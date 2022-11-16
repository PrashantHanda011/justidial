import React,{useState} from 'react'
import CommonHeader from '../Header/Header'
import {storage} from '../firebase/index'
import {getDownloadURL, ref,uploadBytes, uploadBytesResumable} from 'firebase/storage'
import axios from 'axios'
import {   Topads } from '../Axios/apis'
import { useNavigate } from 'react-router-dom'
function Category() {
  const Navigate =useNavigate()
    const [url, seturl] = useState({
    category:null
    })
    const [imgupload, setimgupload] = useState(0)
    

    const handleChange= async(e)=>{
        e.preventDefault();
        let image=e.target.files[0]
        if (!image) return;
        const storageRef = ref(storage, `/category/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          'state_changed',
          (snap) => {
            const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            setimgupload( percentUploaded ); 

          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((imgurl) => {
              seturl({...url,category:imgurl});
            });
          })
    }
    const handlesubmit=async()=>{
      try {
       //   const data = await Categoryads(url);
          //console.log(data);
        //  Navigate('/ads')
      } catch (error) {
        console.log(error);
      }
    }
      
  return (
    <>
        
  <div className="container">
    <CommonHeader />
        <div className="row ms-4">
            <h3>Add Category Ads</h3>

            <div className='mt-5'>
                <input type="file" onChange={handleChange} />
                <div className="progress my-4">
                  <div className="progress-bar" role="progressbar" aria-valuenow="0"
                  aria-valuemin="0" aria-valuemax="100" style={{width:(`${imgupload}%`)}}>
                    {imgupload}
                  </div>
                </div>
            </div>
            <div className='mt-3'>
                <button className='btn btn-primary' onClick={handlesubmit}>
                    Submit
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Category