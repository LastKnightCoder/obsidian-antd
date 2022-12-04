import * as antd from 'antd';
import * as React from 'react';

interface ICodeTabProps {
  html: string;
  tabNames: [string, string];
  children: React.ReactChild
}

const { Tabs } = antd;
const { TabPane } = Tabs;

const CodeTab = (props: ICodeTabProps) => (
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