import React from 'react'
import { Form, Input, Button } from 'antd'
// import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Firebase'

function LoginFrom() {
  let history = useHistory()

  const onFinish = (userLogged) => {
    console.log('Success:', userLogged)
    signInWithEmailAndPassword(auth, userLogged.email, userLogged.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem('currentUser',JSON.stringify(userCredential.user))
        console.log(user, 'signed in')
        history.push('/Teams')
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
        wrapperCol={{
          offset: 0,
          span: 24,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <Button style={{ marginLeft: '5px' }} type="primary">
          <Link to="/Signup">Signup</Link>
        </Button>
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

export default LoginFrom
