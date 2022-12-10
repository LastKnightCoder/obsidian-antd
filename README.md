## Ant Design

在 Obsidian 中使用 Ant Design 中的模块，方法如下

````js
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

所有组件及用法参考 [Ant Design](https://ant.design/index-cn)。

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

所有图表及用法参考 [AntV](https://antv.vision/zh)。

## renderMarkdown

假如你希望写一个 Tabs，用来切换不同的代码块

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

## 状态持久化

假设你写了一个按钮，每次点击时可以进行加一

````
```antd
const { useState } = React
const { Button } = antd
const Counter = () => {
  const [counter, setCounter] = useState(0);
  const handleClick = () => {
    setCounter(counter + 1)
  }
  return (
    <Button type="primary" onClick={handleClick}>{counter}++</Button>
  )
}
const root = ReactDOM.createRoot(el)
root.render(<Counter />)
```
````

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/useState2022-04-21-14-29-40.gif" style="zoom:50%"/>

存在的一个问题时，当你离开当前页面时，然后回来时，发现之前的状态并没有被保存，这极大的限制了 React 的使用，为了保存组件的状态，我提供了两个 React Hook 来对数据进行持久化：

- useLocalStorage：将数据保存在 LocalStorage 中，需要提供键（需保证不同组件唯一）和初始值
- useFile：将数据保存在文件中，需要提供一个文件名以及初始值，并且你需要在设置中设置数据保存的路径，默认保存在笔记的根目录下。
  - 建议将文件夹设置为以 `.` 开头，它表示隐藏文件夹，不会出现在文件列表中，方便整理。
- useAliOSS：将数据保存在阿里 OSS 中，需要提供路径名和初始值，并且需要子啊设置中配置密钥等信息
  - region
  - accessKeyId
  - accessKeySecret
  - bucket

  每个配置信息的含义可参见阿里 OSS 的文档。

除此之外，还需要配置为你的 Bucket 为允许跨域，可参考文档 [跨域设置](https://www.alibabacloud.com/help/zh/object-storage-service/latest/configure-cors#concept-pbw-4df-vdb)。

我的配置如下

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/image-for-2022@master/202212032306132022-12-03-23-06-15.png" style="zoom:50%"/>

useAliOSS 的使用同上面两个类型，同样接收两个参数，文件路径和初始值，注意，这里的状态必须为字符串，你可以使用 `JSON.parse()` 进行解析，示例用法

useLocalStorage 使用示例：

```js
const { Button } = antd
const StatedCounter = () => {
  const [counter, setCounter] = useLocalStorage('counter', '0')

  const handleClick = () => {
    setCounter(String(parseInt(counter) + 1))
  }
  return (
    <Button type="primary" onClick={handleClick}>{counter}++</Button>
  )
}

const root = ReactDOM.createRoot(el)
root.render(<StatedCounter />)
```

useFile 使用示例：

```js
const { Button } = antd
const StatedCounter = () => {
  const [counter, setCounter] = useFile('counter.md', '0')
  const handleClick = () => {
    setCounter(String(parseInt(counter) + 1))
  }
  return (
    <Button type="primary" onClick={handleClick}>{counter}++</Button>
  )
}

const root = ReactDOM.createRoot(el)
root.render(<StatedCounter />)
```

useAliOSS 使用示例：

```js
const { Button } = antd;
const Counter = () => {
	const [counter, setCounter] = useAliOSS('demos/counter.txt', '0');
	const handleClick = () => {
		setCount(String(parseInt(counter) + 1));
	}
	return (
		<Button type="primary" onClick={handleClick}>{counter}++</Button>
	)
}

const root = ReactDOM.createRoot(el)
root.render(<Counter />)
```

从使用上，我推荐 useFile 和 useAliOSS，因为 useLocalStorage 不好迁移，如果迁移到新的环境，那么可能之前保存的数据就无效了，如果没有迁移需求的，useLocalStorage 更方便，也不会产生一些数据文件，但是 localStorage 可能有容量限制。

> 注意：useFile、useStorage 以及 useAliOSS 都只能保存文本内容，读取到的内容也是字符串，需要自己手动转换。

## 内置组件

### Nav

仿照博客功能，可以在文章末尾使用该组件，在上一篇与下一篇之间进行跳转

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/image-for-2022@master/dd2022-05-29-16-25-06.gif" style="zoom:50%"/>

<!-- <img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/image-for-2022@master/动画2022-05-29-16-25-40.apng" style="zoom:50%; border-radius: 8px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);"/> -->

该组件接收两个参数，当不传 `prev` 时，不显示上一篇，当不传 `next` 时，不显示下一篇。

| 参数 | 含义 |
| --- | --- |
| prev | 上一篇文章 |
| next | 下一篇文章 |

使用方法

```js
const { Nav} = components
const root = React.createRoot(el)
el.render(<Nav next="xxx" />)
```

> 参数不需加 `.md`

### NavList

该组件是受到 React 文档库 Docusaurus 的启发，使用方法如下：

```js
const { NavList } = window.components

const data = [{
	title: 'Web Component',
	desc: '介绍 Web Component'
}, {
	title: 'test',
	desc: 'test'
}, {
	title: 'render code',
	desc: 'tab'
}, {
	title: 'antd',
	desc: 'tab xxxxxxxxxxxxxxxxxxxxxxxxxx'
}]

ReactDOM.createRoot(el).render(<NavList data={data} />)
```

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/image-for-2022@master/202212061852342022-12-06-18-52-36.png" style="zoom:50%"/>

自适应布局，最小宽度为 400，尽可能多的放。

### EditableTable

这个是为了解决 Markdown 语法创建表格的问题，使用 Markdown 语法创建表格不如 Typora 中的可视化编辑表格方便，因此创建这个组件，使用这个组件可以可视化编辑表格。

表格的信息存放在其它文件中（内部使用了 useFile 进行持久化），因此使用该组件需要提供数据保存的路径，使用方法如下

```js
const { EditableTable } = components;
ReactDOM.createRoot(el).render(<EditableTable path=".antd/table.json" />);
```

然后就可以愉快的编辑表格了，演示效果如下：

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/image-for-2022@master/et52022-12-10-15-08-47.webp" style="zoom:50%"/>

目前还不支持可视化删除列和行，需要编辑内容文件（低级选手不建议），这个功能后续会抓紧补上，也会慢慢的添加更多功能。

<del>

### CodeTab

> 该组件通用性不强，即将废弃。

用于显示代码块的组件，第一个 Tab 是代码，第二个是代码对应的内容，通过 `children` 传递。

接收两个参数

| 参数 | 含义 |
| --- | --- |
| html | 代码对应的 HTML，可使用提供的 renderMarkdown 进行解析 |
| tabNames | 为一个包含两个元素数组，表示两个 Tab 的名称 |

使用方法：

```js
const { CodeTab } = components

const code = `\`\`\`html
<h1 style={{color: 'red'}}>Hello React</h1>
\`\`\``
const html = await renderMarkdown(code)

const root = ReactDOM.createRoot(el)
root.render(
  <CodeTab html={html} tabNames={['HTML', 'RESULT']}>
    <h1 style={{color: 'red'}}>Hello React</h1>
  </CodeTab>
)
```

<!-- <img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/image-for-2022@master/动画2022-05-29-16-45-45.apng" style="zoom:50%"/> -->

</del>

## 主题

升级到 Ant Design 5.0 以后，支持黑暗主题了

```js
const { theme, ConfigProvider } = antd;

const () => {
  return (
    <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm
      }}>
      // Ant Design 组件
    </ConfigProvider>
  )
}
```

本插件提供了 `ThemeProvider` 组件，它可以监听主题的变化，从而实时的改变 Antd Design 组件的配色，使用方法如下

```js
const { Tabs } = antd;
const { ThemeProvider } = components;
const ThemeTabs = ThemeProvider(Tabs);

// ThemeTabs 如 Tabs 组件使用即可，并且具有跟随主题的能力
// 并且 ThemeTabs 包含的所有子组件均具有跟随主题的能力
```

例子：

```js
const { Tabs } = antd;
const { TabPane } = Tabs;
const { ThemeProvider } = components;
const ThemeTabs = ThemeProvider(Tabs);

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
  <ThemeTabs defaultActiveKey="1">
    <TabPane tab="C" key="1">
      <div dangerouslySetInnerHTML={{ __html: html1 }} />
    </TabPane>
    <TabPane tab="JavaScript" key="2">
      <div dangerouslySetInnerHTML={{ __html: html2 }} />
    </TabPane>
  </ThemeTabs>
);

const root = ReactDOM.createRoot(el)
root.render(<CodeTab />)
```

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/image-for-2022@master/ant52022-12-10-14-53-45.webp" style="zoom:50%"/>

## Web Components

有的时候需要对一段文字中的某部分进行评论，这个时候我一般会用到 `Popover` 组件，每次评论的时候我都需要将文字放到代码块中

```js
const { Popover } = antd

const Paragraph = () => {
  return (
    <p>
      the dynamic <Popover placement='bottomRight' content='在第一次调用函数时，有一个不可忽视的运行时间开销。'>
        <span className="comments">There is nontrivial run-time</span>
      </Popover>but each call thereafter costs only a single instruction and a memory reference for the indirection.
    </p>
  )
}

const root = ReactDOM.createRoot(el)
root.render(<Paragraph />)
```

十分的不方便，特别是文字中如果有行内代码，我还需要将 \`\` 的写法改为 `<code></code>`，另外还需要将 `class` 改为 `className`，十分麻烦，如果可以直接使用标签标注就好了，首先想到的就是 Web Components，我们注册好标签后就可以直接在编辑器中使用了，而不用写代码了。

目前提供了两个 Web Components，分别是 `xt-popover` 与 `xt-artnav`。

### xt-popover

`xt-popover` 的用法与 `Popover` 一样，不同的是不用放在 `antd` 的代码块里了，可以直接作为标签使用

```js
<xt-popover content="在第一次调用函数时，有一个不可忽视的运行时间开销。"><span class="comments">There is a nontrivial run-time overhead the first time the function is called,</span></xt-popover>
```

### xt-artnav

`xt-artnav` 的作用同上面的 `Nav` 组件，用以在不同的文章之间跳转，接收的参数同上

```js
<xt-artnav prev="xxx" next="yyy"></xt-artnav>
```

## CHANGELOG

### 1.2.0 

- 将 Node 接口替换为 `Obsidian` 的接口，从而支持移动端的能力。
- 支持 antd/charts，加载速度会被极大拖累。

### 1.3.0

- 支持 Web Components

### 1.4.0

- 支持阿里云OSS

### 1.5.0

- 由于 Obsidian 的文件接口访问不了隐藏文件夹，所以弃用，使用 fs 的接口，因此 useFile 不能在移动端使用
- 修复 xt-artnav 的 bug

### 1.5.2

- 添加 NavList 组件，仿照 Docusaurus

### 1.6.0

- 高级表格的支持
- Antd 升级到 5.0，支持黑暗主题以及支持 CSS In JS，不会有全局样式影响到别处了

### 1.6.3

- Bug fix
