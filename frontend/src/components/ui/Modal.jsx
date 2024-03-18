import React, { Children, useEffect, useState } from 'react'
import Button from './Button'
import { IoCloseCircleOutline } from "react-icons/io5";
import { set } from 'react-hook-form';




export const Modal = ({btnText, btnClose, children, openModal}) => {

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(openModal);
    }, [openModal]);

  return (
    <div className='z-10'>
        {btnText ? (
            <Button onClick={() => setShowModal(true)}>
                {btnText}
            </Button>
        ) : null}
        {showModal ? (
            <div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center'>
                <div className='bg-white rounded p-5 flex flex-col justify-center items-center gap-5 relative'> 
                    {btnClose ? (
                        <div className="absolute top-0 right-0 m-2 text-indigo-600 cursor-pointer"> 
                        <IoCloseCircleOutline size={32} onClick={() => setShowModal(false)} />
                    </div>
                ): null }
                {children}
                </div>
                
            </div>
        ) : null}
    </div>
  )
}
