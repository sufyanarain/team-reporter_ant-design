import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Form, Input, Select } from 'antd';
import { db } from '../../../Firebase'
import { setDoc, doc, updateDoc } from 'firebase/firestore'

export const AddQuestionModal = () => {
    let currentTeamUid = localStorage.getItem('currentTeamUid')
    currentTeamUid = JSON.parse(currentTeamUid)

    const onFinish = (values) => {
        setDoc(doc(db, 'questions', `${currentTeamUid}`), {
            q2: values.AddQuestion,
        })
        console.log('Success:', values);
        // setIsModalVisible(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Button style={{ marginTop: 10 }} type="primary" onClick={showModal}>
                Add Question
            </Button>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Add Question"
                        name="AddQuestion"
                        rules={[{ required: true, message: 'Please Add question!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
