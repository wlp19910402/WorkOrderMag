import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, DatePicker, message } from 'antd';
import { deleteProtfolioConsumable, updateProtfolioConsumable } from '../service'
import { RecordConsumableDataType } from '../data.d'
import type { ProColumns } from '@ant-design/pro-table';
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: RecordConsumableDataType;
  index: number;
  value: string;
  children: React.ReactNode;
  render: string;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  value,
  render,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber min={ 0 } max={ 1000 } allowClear={ false } /> : <DatePicker
    picker="date"
    mode="date"
    placeholder={ `请选择${title}` }
    style={ { width: "100%" } }
  />;
  return (
    <td { ...restProps }>
      {editing ? (
        <Form.Item
          name={ dataIndex }
          style={ { margin: 0 } }
          rules={ [
            {
              required: true,
              message: `${title}不能为空!`,
            },
          ] }
        >
          {inputNode }
        </Form.Item>
      ) : (
          children
        ) }
    </td>
  );
};
interface ConsumableEditableProps {
  queryConsumableList: () => void;
  dataConsumableList: any[]
}
const EditableTable: React.FC<ConsumableEditableProps> = ({ queryConsumableList, dataConsumableList }) => {
  const [ form ] = Form.useForm();
  const [ editingKey, setEditingKey ] = useState('');
  const isEditing = (record: any) => record.id === editingKey;
  const tiggerEdit = (record: any) => {
    form.setFieldsValue({ expirationTime: '', replacementCycle: '', replacementTime: '', id: record.id });
    setEditingKey(record.id);
  };
  const tiggerCancel = () => {
    setEditingKey('');
  };
  const tiggerDelete = async (id: React.Key) => {
    let response = await deleteProtfolioConsumable(id)
    if (!response) return
    message.success("删除成功");
    queryConsumableList();
  }
  const sumbitSave = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as RecordConsumableDataType;
      const newData = [ ...dataConsumableList ];
      const index = newData.findIndex(item => key === item.id);
      if (index > -1) {
        const item: RecordConsumableDataType = newData[ index ];
        let editParams = {
          expirationTime: row.expirationTime,//到期时间
          id: item.id,
          replacementCycle: row.replacementCycle,//更换周期
          replacementTime: row.replacementTime
        }
        let response = await updateProtfolioConsumable(editParams)
        if (!response) return
        message.success("修改成功");
        setEditingKey('');
        queryConsumableList();
      } else {
      }
    } catch (errInfo) {
      console.log('异常', errInfo);
    }
  };
  const columns = [
    {
      title: '档案耗材ID',
      dataIndex: 'id',
    },
    {
      title: '耗材ID',
      dataIndex: 'consumableId',
    },
    {
      title: '耗材名称',
      dataIndex: 'baseInfo',
      render: (val: any) => {
        return val.name
      }
    },
    {
      title: '到期时间',
      dataIndex: 'expirationTime',
      editable: true,
    },
    {
      title: '更换周期',
      dataIndex: 'replacementCycle',
      editable: true,
      inputType: "number",
    },
    {
      title: '实际更换时间',
      dataIndex: 'replacementTime',
      editable: true
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: RecordConsumableDataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a href="javascript:;" onClick={ () => sumbitSave(record.id) } style={ { marginRight: 8 } }>
              保存
            </a>
            <a href="javascript:;" onClick={ tiggerCancel } >取消</a>
          </span>
        ) : (
            <>
              <Typography.Link disabled={ editingKey !== '' } onClick={ () => tiggerEdit(record) } style={ { marginRight: 8 } }>
                编辑
             </Typography.Link>
              <Popconfirm title="确认删除吗?" onConfirm={ () => tiggerDelete(record.id) }>
                <a href="javascript:;"> 删除</a>
              </Popconfirm>
            </>
          );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: RecordConsumableDataType) => ({
        record,
        inputType: col.dataIndex === 'replacementCycle' ? 'number' : 'date',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  })

  useEffect(() => {
    queryConsumableList();
  }, [])
  return (
    <Form form={ form } component={ false }>
      <Table
        components={ {
          body: {
            cell: EditableCell,
          },
        } }
        bordered
        dataSource={ dataConsumableList }
        columns={ mergedColumns }
        rowClassName="editable-row"
        pagination={ false }
        scroll={ { y: 480 } }
      />
    </Form>
  );
};

export default EditableTable