import React, { useState } from "react";
import Image from "next/image";

const Modal = ({ isVisible, onClose,modalData,setModalData }) => {
    const [data,setData]= useState()
    console.log(modalData)
   

    const handleInput = (e) => {
    //    setModalData(e.target.value)
       const { name, value } = e.target
       setModalData((prevState) => ({
           ...prevState,
           _id:modalData._id,
           [name]: value
       }))
    }
    async function updateRecord() {
        onClose()
        console.log( JSON.stringify(modalData))
        await
            fetch("/api/posts", {
                method: "PUT",
                body: JSON.stringify(modalData),
                headers:
                {
                    "Content-Type":
                        "application/json",
                },
            })
    };

    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose();

    }

    console.log(modalData)
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25
      backdrop-blur-sm flex justify-center items-center" id="wrapper"
            onClick={handleClose}>
            <div className="w-96 h-auto">
                <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <div class="w-full flex justify-start text-gray-600 mb-3">
                        <img src="/images/modalsvg.svg" alt="" />
                    </div>
                    <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Employee Form</h1>
                    <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Name</label>
                    <input onChange={handleInput} id="name" name="firstname" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="" value={modalData.firstname} />
                    <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                    <input onChange={handleInput} id="email" name="email" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="" value={modalData.email} />
                    <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Salary</label>
                    <input onChange={handleInput} id="salary" name="salary" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="" value={modalData.salary} />
                    <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Date</label>
                    <input onChange={handleInput} id="date" name="date" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="" value={modalData.date} />




                    <button onClick={updateRecord} type="submit" className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Modal;