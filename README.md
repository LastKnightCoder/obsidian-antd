## Ant Design

在 Obsidian 中使用 Ant Design 中的模块，方法如下

````
```antd
const { Button } = antd
const root = ReactDOM.createRoot(el)
root.render(<Button type="primary">Hello</Button>)
```

```antd
const { Steps } = antd
const { Step } = Steps

const stepEl = <>
  <Steps current={1}>
    <Step title={"First"} subTitle={"First"}></Step>
    <Step title={"Second"} subTitle={"Second"}></Step>
  </Steps>
</>

const root = ReactDOM.createRoot(el)
root.render(stepEl)
```

```antd
const { Select } = antd;

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onSearch(val) {
  console.log('search:', val);
}

const selectEl = (
  <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>
)

const root = ReactDOM.createRoot(el)
root.render(selectEl)
```

```antd
const { Table, Tag, Space } = antd;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const tabEl = <Table columns={columns} dataSource={data} />;
const root = ReactDOM.createRoot(el)
root.render(tabEl)
```
````

可以在 antd 的代码块中使用 antd, React, ReactDOM 以及挂载点 el，效果如下所示

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/202204201504022022-04-20-15-04-03.png" style="zoom:50%"/>

## Ant Design Charts

现在可以使用 Ant Design Charts 了，使用方法如下

````
```antd-charts
const { Line } = charts
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const config = {
  data,
  height: 400,
  xField: 'year',
  yField: 'value',
  point: {
    size: 5,
    shape: 'diamond',
  },
};

const lineEl = <Line {...config} />;
const root = ReactDOM.createRoot(el);
root.render(lineEl);
```
````

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/202204201700272022-04-20-17-00-28.png" style="zoom:50%"/>

用法请参考 [AntV](https://antv.vision/zh)

## renderMarkdown

假如你希望写一个 Tab，用来切换不同的代码块

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/动画2022-04-20-19-12-24.gif" style="zoom:50%"/>


你会使用 Antd 的 Tabs 组件和 TabPane 组件

````
```antd
const { Tabs } = antd;
const { TabPane } = Tabs;

const code1 = `\`\`\` C
#include<stdio.h>
int main()
{
    printf("Hello World");
    return 0;
}
\`\`\``

const code2 = `\`\`\` JavaScript
const a = 1
const b = 2
const c = a + b
console.log(c)
\`\`\``

const CodeTab = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="C" key="1">
      {code1}
    </TabPane>
    <TabPane tab="JavaScript" key="2">
      {code2}
    </TabPane>
  </Tabs>
);

const root = ReactDOM.createRoot(el)
root.render(<CodeTab />)
```
````

但是你会发现出来的是纯文本


<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/动画2022-04-20-19-15-54.gif" style="zoom:50%"/>


这是因为在 `antd` 代码块里面的内容不会被解析，为了在组件里面使用 Markdown 的能力，我们向全局暴露了一个方法 `renderMarkdown`，它接收 Markdown 字符，输出对应的 `html` 字符，并且这是一个异步的方法，返回的是一个 `Promise`。

所以我们可以修改写法如下，就可以得到想要的效果了

````
```antd
const { Tabs } = antd;
const { TabPane } = Tabs;

const code1 = `\`\`\` C
#include<stdio.h>
int main()
{
    printf("Hello World");
    return 0;
}
\`\`\``

const code2 = `\`\`\` JavaScript
const a = 1
const b = 2
const c = a + b
console.log(c)
\`\`\``

const html1 = await renderMarkdown(code1)
const html2 = await renderMarkdown(code2)

const CodeTab = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="C" key="1">
      <div dangerouslySetInnerHTML={{ __html: html1 }} />
    </TabPane>
    <TabPane tab="JavaScript" key="2">
      <div dangerouslySetInnerHTML={{ __html: html2 }} />
    </TabPane>
  </Tabs>
);

const root = ReactDOM.createRoot(el)
root.render(<CodeTab />)
```
````
