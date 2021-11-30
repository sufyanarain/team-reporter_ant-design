import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../Firebase'

function SignupFrom() {
  let history = useHistory()

  const onFinish = (userSignup) => {
    console.log('Success:', userSignup)

    createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password)
      .then((userCredential) => {
        let user = userCredential.user
        // Signed in
        setDoc(doc(db, 'users', user.uid), {
          name: userSignup.name,
          email: userSignup.email,
          userUid: user.uid,
        })
        // console.log('Document written with ID: ', docRef.id)

        // const user = userCredential.user
        history.push('/')
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      style={{
        paddingTop: '20px',
        margin: '20px auto',
        border: `1px solid #ededed`,
        width: '600px',
        borderRadius: '20px',
      }}
      breakpoint="xl"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your Name!',
          },
        ]}
      >
        <Input placeholder="Please input your Name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input placeholder="Please input your Email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password placeholder="Please input your Password" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="cPassword"
        rules={[
          {
            required: true,
            message: 'Please Confirm your password!',
          },
        ]}
      >
        <Input.Password placeholder="Please input your Confirm your password" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 24,
        }}
      >
        <Button type="primary" htmlType="submit">
          Signup
        </Button>
        <Button style={{ marginLeft: '5px' }} type="primary">
          <Link to="/">Login</Link>
        </Button>
        {/* <Button style={{marginLeft:'5px'}} type="primary">Login</Button> */}
      </Form.Item>
      {/* <Form.Item
        wrapperCol={{
          //   offset: 8,
          span: 24,
        }}
      >
      </Form.Item> */}
    </Form>
  )
}

export default SignupFrom
