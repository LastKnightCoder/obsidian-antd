import {
  ConfigProvider,
  theme,
  Table,
  Input,
  Form,
  Button,
  Drawer,
  Space,
  Empty,
} from 'antd';
import * as React from 'react';
import EditableCell from 'components/EditableCell';
import useFile from 'hooks/useFile';
const { useState, useRef } = React;
const { useForm } = Form;
const path = require('path');

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
type Column = ColumnTypes[number] & { editable?: boolean; dataIndex: string }
type Data = Record<string, unknown> & { key: string };

const EditableTable = (props: { path: string }) => {
  const { path } = props;

  const initContent = JSON.stringify({
    dataSource: [],
    columns: [],
    keyCounter: 0
  });
  const [content, setContent] = useFile(path, initContent);
  const parsedContent = JSON.parse(content);

  const [dataSource, setDataSource] = useState<Data[]>(parsedContent.dataSource || []);
  const [editableColumns, setColumns] = useState<Column[]>(parsedContent.columns || []);
  const keyCounter = useRef<number>(parsedContent.keyCounter || 0);

  const [showColumnEditor, setShowColumnEditor] = useState<boolean>(false);
  const [form] = useForm();

  const handleSave = (row: Data) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    setContent(JSON.stringify({
      dataSource: newData,
      columns: editableColumns,
      keyCounter: keyCounter.current
    }));
  }

  const columns = editableColumns.map(column => {
    if (!column.editable) {
      return column;
    }
    return {
      ...column,
      onCell: (record: Data) => ({
        record,
        editable: column.editable,
        dataIndex: column.dataIndex,
        title: column.title,
        handleSave
      })
    }
  });

  const handleAddColumn = () => {
    setShowColumnEditor(true);
  }

  const closeColumnEditor = () => {
    setShowColumnEditor(false);
  }

  const processAddColumn = async () => {
    try {
      const values = await form.validateFields();
      console.log('values', values);
      setColumns([...columns, {
        ...values,
        dataIndex: values.title,
        editable: true,
      }]);
      if (columns.length === 0) {
        setDataSource([{
          key: String(keyCounter.current++)
        }]);
      }
      setShowColumnEditor(false);
      form.resetFields();
    } catch (e) {
      console.error(e);
    }
  }

  const handleAddRow = async () => {
    setDataSource([...dataSource, {
      key: String(keyCounter.current++)
    }]);
  }

  const dark = document.body.classList.contains('theme-dark');

  return (
    <ConfigProvider theme={{
      algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm
    }}>
      <Space size={'middle'} style={{ marginLeft: 'auto', marginBottom: '20px' }}>
        <Button type='default' onClick={handleAddColumn}>添加列</Button>
        <Button type='primary' onClick={handleAddRow}>添加行</Button>
      </Space>
      <Drawer
        title="创建新的列"
        width={400}
        onClose={closeColumnEditor}
        open={showColumnEditor}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={closeColumnEditor}>取消</Button>
            <Button onClick={processAddColumn} type="primary">
              确定
            </Button>
          </Space>
        }
      >
        <Form form={form}>
          <Form.Item
            name="title"
            label="列名"
            rules={[{ required: true, message: '请输入列名' }]}>
            <Input placeholder='列的名称' />
          </Form.Item>
        </Form>
      </Drawer>
      {columns.length > 0 ? <Table
        columns={columns as ColumnTypes}
        dataSource={dataSource}
        pagination={false}
        components={{
          body: {
            cell: EditableCell<Data>
          }
        }}
        rowKey='key'
      /> : <Empty description={false} />}
    </ConfigProvider>
  );
};

const getEditableFromRoot = (root: string) => {
  return (props: { path: string }) => {
    const filePath = path.join(root, props.path);
    return <EditableTable path={filePath} />
  }
}

export default getEditableFromRoot;

