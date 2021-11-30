import { Tabs } from 'antd'
import Settings from '../settings/Settings'

const { TabPane } = Tabs

const Tabs1 = () => (
  <Tabs defaultActiveKey="1" centered>
    <TabPane tab="Settings" key="1">
    <Settings/>
    </TabPane>
    <TabPane tab="Report" key="2">
      Content of Tab Pane 2
    </TabPane>
  </Tabs>
)

export default Tabs1
