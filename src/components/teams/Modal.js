import { Modal, Button, Input, Form, Select } from 'antd'
import React, { useSate } from 'react'
import { PlusOutlined } from '@ant-design/icons'
//Firebase database
import { db } from '../../Firebase'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
const { Option } = Select

const children = []
async function getData() {
  //Firebase
  const querySnapshot = await getDocs(collection(db, 'users'))
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data().email)
    // console.log(children)
    children.push(<Option key={doc.data().email}>{doc.data().email}</Option>)
  })
}
getData()

function ModalTeam(props) {
  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const [modalText, setModalText] = React.useState('Content of the modal')

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    // setConfirmLoading(true)
    setVisible(false)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }

  //Form Functions
  const onFinish = (teamData) => {
    let currentUser = localStorage.getItem('currentUser')
    currentUser = JSON.parse(currentUser)
    // console.log(currentUser)
    console.log('Success:', teamData)

    let teamKey = new Date().getTime()
    let setDataDb = async () => {
      await setDoc(doc(db, 'teams', teamKey.toString()), {
        teamName: teamData.teamName,
        category: teamData.selectCategory,
        members: teamData.addMembers,
        admin: currentUser.uid,
        teamUid: teamKey,
        adminEmail: currentUser.email
        // teamUid:docRef.uid
      })
    }
    setDataDb()
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // for (let i = 10; i < 36; i++) {
  //   children.push(
  //     <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>,
  //   )
  // }

  function handleChange(value) {
    console.log(`selected ${value}`)
  }

  return (
    <>
      <Button
        className={props.ClassName}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          height: '50px',
          width: '50px',
          borderRadius: '50%',
        }}
        type="primary"
        onClick={showModal}
      >
        <PlusOutlined />
      </Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Team Name"
            name="teamName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="selectCategory"
            label="Select Category"
            rules={[{ required: true, message: 'Please select category!' }]}
          >
            <Select
              defaultValue="lucy"
              style={{ width: '100%' }}
              onChange={handleChange}
            >
              <Option value="WebDevelopment">WebDevelopment</Option>
              <Option value="Testing Team">Testing Team</Option>
              <Option value="Markeeting Team">Markeeting Team</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="addMembers"
            label="Add Members"
            rules={[{ required: true, message: 'Please select Members!' }]}
          >
            <Select mode="multiple">{children}</Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ModalTeam
