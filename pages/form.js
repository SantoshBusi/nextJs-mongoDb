import { useEffect, useState } from "react"
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { BiPlus } from 'react-icons/bi'
import clientPromise from "../lib/mongodb";
import Modal from "./Modal";


export default function FormHandling(db_1) {


    const [formData, setFormData] = useState({})
    const [tabData, setTabData] = useState([])
    const [visible, setVisible] = useState(false)
    const [modalData, setModalData] = useState([])



    // console.log(tabData);

    useEffect(() => {
        let arr = Object.values(db_1)
        arr.map((dbData) => {
            setTabData(dbData)
        })
    }, []);

    // console.log(tabData)
    // const getFormData = (e) => {
    //     e.preventDefault()
    //     console.log(formData)
    // }
    async function getFormData(e) {
        e.preventDefault()
        console.log(JSON.stringify(formData))
        const response = await
            fetch("/api/posts", {
                method: "POST",
                body: JSON.stringify(formData),
                headers:
                {
                    "Content-Type":
                        "application/json",
                },
            });
        const data = await response.json();
        // let arr = Object.values(db_1)
        // arr.map((dbData) => {
        //     dbData.push(formData)
        //     setTabData(dbData)
        //     console.log(dbData)

        // })
        // setTabData(arr)
        // console.log(arr)

    }
    console.log(tabData)
    // const getTabData =()=>{
    //     let arr = Object.values(db_1)
    //     arr.map((dbData)=>{
    //        setTabData(dbData)
    //     })
    // }
    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    async function handleDelete(d) {
        console.log(d)
        let arr = []
        tabData.map((val) => {
            if (val._id !== d) {
                arr.push(val)   
            }
            else {
                console.log(val)
                response(val)
            }
        })

        setTabData(arr)
    }
    async function response(val) {
        await
            fetch("/api/posts", {
                method: "DELETE",
                body: JSON.stringify(val),
                headers:
                {
                    "Content-Type":
                        "application/json",
                },
            })
    };
     function handleEdit(d) {
        setVisible(true)
        console.log(d)
        
        // let arr = []
        tabData.map((val) => {
            if (val._id === d) {
                console.log(val)
                handleUpdate(val)
                setModalData(val)
                // arr.push(val)
            }
        })

    }
    async function handleUpdate(val) {
        console.log(JSON.stringify(formData))
        await
            fetch("/api/posts", {
                method: "PUT",
                body: JSON.stringify(val),
                headers:
                {
                    "Content-Type":
                        "application/json",
                },
            })
    };
    return (
       <>
        <section>
            {/* <Head>
                <title>Next with Mongodb</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head> */}

            <main className='py-5'>
                <h1 className='text-xl md:text-5xl text-center font-bold py-10'>Employee Form</h1>

                <div className=''>
                    <form className="grid lg:grid-cols-6 w-full gap-4" >
                        <div className="input-type">
                            <input value={formData.firstname} type="text" onChange={handleInput} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
                        </div>
                        <div className="input-type">
                            <input type="text" value={formData.lastname} onChange={handleInput} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
                        </div>
                        <div className="input-type">
                            <input type="text" value={formData.email} onChange={handleInput} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
                        </div>
                        <div className="input-type">
                            <input type="text" value={formData.salary} onChange={handleInput} name="salary" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Salary" />
                        </div>
                        <div className="input-type">
                            <input type="date" value={formData.date} onChange={handleInput} name="date" className="border px-5 py-3 focus:outline-none rounded-md" placeholder="Date" />
                        </div>


                        {/* <div className="flex gap-10 items-center">
                            <div className="form-check">
                                <input type="radio" value={formData.status} onChange={handleInput}  id="radioDefault1" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                                <label htmlFor="radioDefault1" className="inline-block tet-gray-800">
                                    Active
                                </label>
                            </div>
                            <div className="form-check">
                                <input type="radio" value={formData.status:} onChange={handleInput}  id="radioDefault2" name="status" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                                <label htmlFor="radioDefault2" className="inline-block tet-gray-800">
                                    Inactive
                                </label>
                            </div>
                        </div> */}

                        <button onClick={getFormData} type="submit" className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
                            Add <span className="px-1"><BiPlus size={24}></BiPlus></span>
                        </button>

                    </form>
                </div>

                <div className='py-10'>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-16 py-2">
                                    <span className="text-gray-200">Name</span>
                                </th>
                                <th className="px-16 py-2">
                                    <span className="text-gray-200">Email</span>
                                </th>
                                <th className="px-16 py-2">
                                    <span className="text-gray-200">Salary</span>
                                </th>
                                <th className="px-16 py-2">
                                    <span className="text-gray-200">Birthday</span>
                                </th>
                                {/* <th className="px-16 py-2">
                                    <span className="text-gray-200">Status</span>
                                </th> */}
                                <th className="px-16 py-2">
                                    <span className="text-gray-200">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-200">
                            {
                                tabData.map((collection) => {
                                    console.log(collection)
                                    return (
                                        <tr className="bg-gray-50 text-center">
                                            {/* <td className="px-16 py-2 flex flex-row items-center">
                                    <img src="#" alt="" />
                                    <span className="text-center ml-2 font-semibold"></span>
                                </td> */}
                                            <td className="px-16 py-2 text-black">
                                                <span>{collection.firstname}</span>
                                            </td>
                                            <td className="px-16 py-2">
                                                <span>{collection.email}</span>
                                            </td>
                                            <td className="px-16 py-2">
                                                <span>{collection.salary}</span>
                                            </td>
                                            <td className="px-16 py-2">
                                                <span>{collection.date}</span>
                                            </td>
                                            <td className="px-16 py-2 flex justify-around gap-5">
                                                <button className="cursor" ><BiEdit size={25} color={"rgb(34,197,94)"} onClick={() => handleEdit(collection._id)}></BiEdit></button>
                                                <button className="cursor"  ><BiTrashAlt size={25} color={"rgb(244,63,94)"} onClick={() => handleDelete(collection._id)}></BiTrashAlt></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </main>
          
            
        </section>
         <Modal isVisible={visible} modalData={modalData} setModalData={setModalData} onClose={()=>{
             setVisible(false)
         }} >
             
         </Modal>

       </>
        
    )
}

export async function getStaticProps() {
    try {
        const client = await clientPromise;
        const db = client.db("my_db");

        const db_1 = await db
            .collection("db_1")
            .find({})
            .sort({ metacritic: -1 })
            .limit(1000)
            .toArray();

        return {
            props: { db_1: JSON.parse(JSON.stringify(db_1)) },
        };
    } catch (e) {
        console.error(e);
    }
}