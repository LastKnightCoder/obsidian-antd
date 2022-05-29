import * as antd from 'antd';
const { Tabs } = antd;
const { TabPane } = Tabs;

const CodeTab = (props) => (
  <Tabs defaultActiveKey="1">
    <TabPane tab={props.tabNames[0]} key="1">
      <div dangerouslySetInnerHTML={{ __html: props.html }} />
    </TabPane>
    <TabPane tab={props.tabNames[1]} key="2">
      {props.children}
    </TabPane>
  </Tabs>
);

export default CodeTab;