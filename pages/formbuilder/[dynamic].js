import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { Button, Table, Form, Input, Modal, Select, Checkbox, InputNumber, Col, Row } from "antd";
import clientPromise from "../../lib/mongodb";




export default function dynamicForm(props, db_1) {
    console.log(Object.values(props)[0])
    const router = useRouter()
    // console.log(router.query.dynamic)
    const [data, setData] = useState(Object.values(props))
    const [columns, setColumns] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [modalEdit, setModalEdit] = useState()
    const [input] = Form.useForm()
    const [dataSourceData, setDataSourceData] = useState([])
    const [griddata, setGriddata] = useState();
    //  let arr = Object.values(props)
    //     arr.map((dbData) => {
    //         setData(dbData)
    //         dbData.map((item)=>{
    //             if(item._id ===router.query.dynamic ){
    //                 setData(item)
    //             }
    //         })
    //     })

    useEffect(() => {
        let arr = [];
        let arr1 = []
        let obj
        data[0].map(items => {
            if (items.fId === router.query.dynamic) {
                //    console.log(items.fields)
                obj = items
                items.fields.map((col) => {

                    arr1.push({
                        title: col.fieldName,
                        dataIndex: col.fieldName
                    })
                    // console.log(arr)

                })
                items.fieldValues.map(it => {
                    arr.push(it);
                })



            }

        })
        setData(obj)
        setColumns(arr1)
        setGriddata(arr);

    }, []);
    // console.log(griddata)
    const edit = (key) => {
        setModalEdit(true)
        setDataSource(data.fields)


    }
    const editCancel = () => {
        setModalEdit(false)
    }
    const editOk = (key) => {
        //   console.log(data)
        setModalEdit(false)
        const val = input.getFieldsValue(true)
        // const ds=[]
        // dataSource.push(...dataSourceData,val)

        //  setDataSourceData(ds)
        const retrievedData = props.db_1
        let arr = []
        // const retrievedData = JSON.parse(localStorage.getItem('Formdata'))
        retrievedData.map((s, ind) => {
            console.log(s)
            if (s.fId === router.query.dynamic) {
                s.fieldValues.push(val)
                s.fieldValues.map(it => {
                    arr.push(it)
                })
            }
            response(s)
        })
        // console.log(arr)
        setGriddata(arr)

        // localStorage.setItem('Formdata', JSON.stringify(retrievedData))

    }
    async function response(s) {
        await
            fetch("/api/posts", {
                method: "PUT",
                body: JSON.stringify(s),
                headers:
                {
                    "Content-Type":
                        "application/json",
                },
            })
    };


    // console.log(griddata)
    // console.log(columns)
    return (
        <center>
            <Button type="primary" style={{ float: "right" }} onClick={edit} >Add New</Button>
            <h1 className="font-bold text-3xl">{data.fId}</h1>
            <Table columns={columns} dataSource={griddata} />

            <Modal title="Update Form Fields" visible={modalEdit} onCancel={editCancel} onOk={editOk}>
                <Form layout="vertical" style={{ marginTop: "50px" }} form={input}>
                    <Form.Item name="fId"  >
                        <h1>{data.fId}</h1>
                    </Form.Item>

                    {/* {console.log(data.fields)}       */}
                    {

                        dataSource.map(
                            (fValues) => {
                                // console.log(fValues)
                                return (
                                    fValues.type === "String" ?


                                        <Form.Item label={fValues.fieldName} name={fValues.fieldName}  >
                                            <Input type="text" />
                                        </Form.Item>

                                        :
                                        fValues.type === "Number" ?


                                            <Form.Item label={fValues.fieldName} name={fValues.fieldName}  >
                                                <Input type="number" />
                                            </Form.Item>

                                            : ""
                                )
                            }
                        )
                    }

                </Form>

            </Modal>

        </center>
    )
}
// export async function getStaticPaths() {
//     console.log("Called")
//     const client = await clientPromise;
//     const db = client.db("my_db");
//     const db_1 = await db
//         .collection("db_1")
//         .find({})
//         .sort({ metacritic: -1 })
//         .limit(1000)
//         .toArray();
//     const data = JSON.parse(JSON.stringify(db_1))

//     const paths = data.map(item => ({
//         params: {
//             dynamic: item.fId
//         }
//     }))

//     return {
//         paths,
//         fallback: false
//     }
// };


export async function getServerSideProps(context) {
    const { params } = context
    try {
        const client = await clientPromise;
        const db = client.db("my_db");

        const db_1 = await db
            .collection("db_1")
            .find()
            .toArray();

        return {
            props: { db_1: JSON.parse(JSON.stringify(db_1)) },
        };
    } catch (e) {
        console.error(e);
    }
}