import React from 'react'
import { BiStar } from 'react-icons/bi'
import { BsStarFill } from 'react-icons/bs'
import moment from "moment"
function FeedbackCard(prop) {

  return (
    <>
         <div className="card-plan mt-3 col-3 text-center p-3 me-5" key={prop.id}>
                      <div className="d-flex justify-content-center">
                        <div className="user-img d-flex align-items-center justify-content-center" >
                        <BsStarFill color='yellowGreen' className="me-2" /> 
                         <span>{prop?.rating} Rating</span>
                        </div>
                      </div>
                      <p className="mt-3">
                       {prop?.message}
                      </p>
                      <p className="mt-3">
                       Date - {prop.date?(moment(prop.date).format('DD-MM-YYYY')):("")   }
                      </p>

            </div>
    </>
  )
}

export default FeedbackCard