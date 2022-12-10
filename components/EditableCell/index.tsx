import * as React from "react";
import { Input, Form } from 'antd';
const { useState, useRef, useEffect } = React;
const { useForm } = Form;

import type { InputRef } from 'antd';

interface EditableCellProps<Data> {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Data & string;
  record: Data;
  handleSave: (record: Data) => void;
}

const EditableCell = <T,>({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}: EditableCellProps<T>) => {

  const inputRef = useRef<InputRef>(null);
  const [form] = useForm();

  const save = async () => {
    try {
      const values = await form.validateFields();
      form.setFieldsValue({
        [dataIndex]: values[dataIndex],
      });
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let initialValues: Record<string, unknown> = {};
  if (record && typeof record === 'object' && dataIndex && record[dataIndex]) {
    initialValues[dataIndex] = record[dataIndex];
  }

  return <td {...restProps} style={{ padding: 0 }}>
    <Form form={form} initialValues={initialValues}>
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} style={{
            maxWidth: '80%',
            minWidth: '80%',
            padding: '8px 16px',
            height: '48px',
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
            background: 'transparent'
          }} />
        </Form.Item>
      </Form>
  </td>;
};

export default EditableCell;
