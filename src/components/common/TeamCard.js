import { useState } from 'react'
import { Skeleton, Switch, Card, Avatar } from 'antd'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const Meta = Card.Meta

// function TeamCard() {
//   let [loading, setLoading] = useState(true)
//   // state = {
//   //     loading: true,
//   //   };

//   let onChange = (checked) => {
//     setLoading(!checked)
//   }

//   return (

//   )
// }

function TeamCard(props) {
  console.log(props)
  let [loading, setLoading] = useState(false)
  // state = {
  //     loading: true,
  //   };

  // console.log(props)
  let onChange = (checked) => {
    setLoading(!checked)
  }

  return (
    <div>
      <Card
        breakpoint="md"
        style={{ margin: 'auto', width: '800px', marginTop: 16 }}
        actions={[
          <SettingOutlined key="setting" onClick={props.settingFunc} />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={props.teamName}
            description={props.members}
          /> 
        </Skeleton>
      </Card>
    </div>
  )
}

export default TeamCard
