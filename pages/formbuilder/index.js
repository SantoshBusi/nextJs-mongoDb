import React, { useState, useEffect } from "react";
import { Button, Table, Form, Input, Modal, Select, Col, Row, Dropdown, Radio, Popconfirm, InputNumber } from "antd";
// import { useNavigate } from "react-router-dom";
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import clientPromise from "../../lib/mongodb";
import Router from 'next/router'


const Grid = (props, db_1) => {
    console.log(props)
    const { Option } = Select;
    // let navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [input] = Form.useForm()
    const [selected, setSelected] = useState([]);
    const [formData, setFormData] = useState();
    const [modalEdit, setModalEdit] = useState()
    const [data, setData] = useState(Object.values(props));
    const [ind, setInd] = useState();
    const [tableData, setTableData] = useState([])





    useEffect(() => {
        // console.log(props)
        let arr = Object.values(props)
        arr.map((dbData) => {
            setTableData(dbData)
        })
    }, []);


    const showModal = () => {
        setIsModalVisible(true);

    };

    const handleOk = () => {

        // console.log("handleOk")
        setIsModalVisible(false);
        const val = input.getFieldsValue(true)
        val.fieldValues = []
        // console.log(val)
        // setFormData(val)

        const initiaLData = [...tableData]
        initiaLData.push({
            fId: val.fId,
            fields: val.fields,
            fieldValues: []

        })
        // console.log(initiaLData)
        setTableData(initiaLData)

        response(val)
    };
    async function response(val) {
        await
            fetch("/api/posts", {
                method: "POST",
                body: JSON.stringify(val),
                headers:
                {
                    "Content-Type":
                        "application/json",
                },
            })

    };
    async function editRecords(mainData) {
        await
            fetch("/api/posts", {
                method: "PUT",
                body: JSON.stringify(mainData),
                headers:
                {
                    "Content-Type":
                        "application/json",
                },
            })
    };


    const handleCancel = () => {
        setIsModalVisible(false);


    };

    const handleDelete = (record) => {
        console.log(record)
        console.log(tableData)
        //    const client = await clientPromise;
        // fetch(`https://data.mongodb-api.com/app/data-pqcux/endpoint/data/v1/action/find`, {
        //     method: "GET",
        //     // body: JSON.stringify(req.body),
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Access-Control-Request-Headers": "*",
        //         "api-key": `2tovjSn3G4uiVKGeVHUbPeNqtA9RMi9q2ZJ2WPD6EaREWvE9s9FVH1MyE0e2z99M`
        //     }
        // }).then(response => {
        //     console.log(response)
        //     //   res.status(200).json(response)
        // })
        //     .catch(error => {
        //         //   res.status(201).json(error)
        //     });
        // console.log(data2)

        // const d = record.fId
        let arr = []
        // let arr2 = Object.values(props)
        // let obj
        // console.log(arr2[0])
       tableData.map((val) => {
            // console.log(val)
            if (val.fId !== record.fId) {
                arr.push(val)
            }
        })
        deleteRecord(record)
        setTableData(arr)
    }
    async function deleteRecord(record) {
        console.log(record)
        // let obj
        // tableData.map((mData) => {
        //     if (mData.fId === record.fId) {
        //         obj = mData
        //     }
        // })
        // console.log(obj)
        await
            fetch("/api/posts", {
                method: "DELETE",
                body: JSON.stringify(record),
                headers:
                {
                    "Content-Type":
                        "application/json",
                },
            })
    };

    const edit = (record) => {
        // console.log(record)
        setModalEdit(true)
        let arr = Object.values(props)
        arr.map((dbData) => {
            dbData.map((item) => {
                if (item._id === record._id) {
                    input.setFieldsValue({
                        fId: item.fId,
                        fields: item.fields,
                        _id: item._id
                    })
                }
            })
        })

    }

    const editOk = () => {
        // console.log(tableData)
        setModalEdit(false)

        const editValues = input.getFieldsValue(true)
        // console.log(editValues)

        //const updatedData = JSON.parse(localStorage.getItem("Formdata"))

        // localStorage.setItem('Formdata', JSON.stringify(retrievedData))
        // setData(editValues)

        const mainData = [...tableData]
        mainData.map((res, i) => {
            // console.log(res,i)
            if (res.fId === editValues.fId) {

                res.fields = editValues.fields
                // console.log(res)

            }

            editRecords(res)

            // setTableData(res)
        })

        // localStorage.setItem('Formdata', JSON.stringify(mainData))


    }

    const editCancel = () => {
        setModalEdit(false)
    }

    const columns = [
        {
            title: 'Form Id',
            dataIndex: 'fId',
            ellipsis: true,


        },
        {
            title: 'Modify',
            dataIndex: 'modify',
            render: (_, record) => {

                return (
                    <a onClick={(event) => { event.stopPropagation(); edit(record) }}>Edit</a>
                )
            },
        },
        {
            title: 'Delete',
            dataIndex: 'operation',
            //width: 180,
            render: (_, record, event) =>

                tableData.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={(event) => { event.stopPropagation(); handleDelete(record) }}
                        onClick={(event) => event.stopPropagation()} onCancel={(event) => event.stopPropagation()}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,


        },
    ]
    // const retrievedData = JSON.parse(localStorage.getItem('Formdata'))
    // console.log(retrievedData)



    return (
        <center>
            <h1 className="font-bold text-3xl">Form Builder</h1>
            <Button style={{ float: "right" }} type="primary" onClick={showModal} >New Form</Button>

            <Table columns={columns} dataSource={tableData}
                onRow={(row) => ({
                    onClick: () => {
                        //    console.log(row)
                        Router.push(`/formbuilder/${row.fId}`)
                    }
                })} />

            <Modal title="Form Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={input} layout="vertical" >

                    <Form.Item label="Form Id" name="fId"  >
                        <Input />
                    </Form.Item>
                    <Form.List name="fields" autoComplete="off">
                        {(fields, { add, remove }) => (
                            <>
                                <span style={{ float: "right" }}>
                                    <PlusCircleOutlined onClick={() => add()} />
                                </span>
                                {fields.map(({ key, name, ...restField }) => (
                                    <>
                                        <Row>
                                            <Row>
                                                <Col span={23}>
                                                    <Row gutter={16}>
                                                        <Col span={9} className='gutter-row'>
                                                            <Form.Item name={[name, 'type']} label='Type' {...restField} style={{ marginBottom: '8px' }}>
                                                                <Select >
                                                                    <Option key="String">String</Option>
                                                                    <Option key="Number">Number</Option>
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={9} className='gutter-row'>
                                                            <Form.Item name={[name, "fieldName"]} required={false} label="Field Name"  {...restField} style={{ marginBottom: "8px" }}>
                                                                <Input />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={1} className='gutter-row'>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Col>
                                            </Row>
                                        </Row>
                                    </>
                                )
                                )}
                            </>
                        )}
                    </Form.List>

                </Form>
            </Modal>

            <Modal title="Update Details" visible={modalEdit} onOk={(record) => editOk(record.key)} onCancel={editCancel}>
                <Form form={input} layout="vertical">

                    <Form.Item label="Form Id" name="fId"  >
                        <Input readOnly />
                    </Form.Item>
                    <Form.List name="fields" autoComplete="off">
                        {(fields, { add, remove }) => (
                            <>
                                <span style={{ float: "right" }}>
                                    <PlusCircleOutlined onClick={() => add()} />
                                </span>
                                {fields.map(({ key, name, ...restField }) => (
                                    <>
                                        <Row>
                                            <Row>
                                                <Col span={23}>
                                                    <Row gutter={16}>
                                                        <Col span={9} className='gutter-row'>
                                                            <Form.Item name={[name, 'type']} label='Type' {...restField} style={{ marginBottom: '8px' }}>
                                                                <Select >
                                                                    <Option key="String">String</Option>
                                                                    <Option key="Number">Number</Option>
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={9} className='gutter-row'>
                                                            <Form.Item name={[name, "fieldName"]} required={false} label="Field Name"  {...restField} style={{ marginBottom: "8px" }}>
                                                                <Input />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={1} className='gutter-row'>
                                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                                </Col>
                                            </Row>
                                        </Row>
                                    </>
                                )
                                )}
                            </>
                        )}
                    </Form.List>

                </Form>
            </Modal>
        </center>
    )

}
export default Grid;

export async function getServerSideProps() {
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