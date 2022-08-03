import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { Deletepopups } from '../../Axios/apis'

function PopupSingle(prop) {
  
  return (
    <>
         <div  key={prop?.id} className='d-flex flex-column'> 
                    <img src={prop?.item} className='border p-2 me-2' width={200} alt="popup img" />
                      <AiFillDelete onClick={async()=>{
                               const deletedata={
                                    popup:prop.item
                                    }
                            const yes = window.confirm(
                                "Do you want delete ?"
                            );
                            if (yes) {
                                try{
                                    const data = await Deletepopups(deletedata);
                                    window.location.reload();
                            }catch(err){
                            console.log(err)
                            }
                        }
                      }}  fontSize="2.2rem" color='red'  cursor="pointer"/>  
                   </div> 
    </>
  )
}

export default PopupSingle