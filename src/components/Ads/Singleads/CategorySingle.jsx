import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { DeleteCategoryads, Deletepopups } from '../../Axios/apis'

function CategorySingle(prop) {
  
  return (
    <>
         <div  key={prop?.id} className='d-flex flex-column'> 
                    <img src={prop?.item} className='border p-2 me-2' width={200} alt="popup img" />
                      <AiFillDelete onClick={async()=>{
                               const deletedata={
                                    category:prop.item
                                    }
                            const yes = window.confirm(
                                "Do you want delete ?"
                            );
                            if (yes) {
                                try{
                                    const data = await DeleteCategoryads(deletedata);
                                    console.log(data);
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

export default CategorySingle