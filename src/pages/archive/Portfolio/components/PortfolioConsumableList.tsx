import React, { useState, useEffect } from 'react';
import { Table, InputNumber, Popconfirm, Drawer, Form, Typography, DatePicker, message, Descriptions, Row, Col, Image } from 'antd';
import { deleteProtfolioConsumable, updateProtfolioConsumable } from '../service'
import { RecordConsumableDataType } from '../data'
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: RecordConsumableDataType;
  index: number;
  value: string;
  children: React.ReactNode;
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
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber min={ 0 } max={ 1000 } /> : <DatePicker
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
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const [ currentRow, setCurrentRow ] = useState<any>();
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
      render: (val: any, entity: any) => {
        return (
          <a
            onClick={ () => {
              setCurrentRow(entity);
              setShowDetail(true);
            } }
          >
            {`${val.name}` }
          </a>
        );
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
      hideInDescriptions: true,
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
  let descriptionsColums = [ ...columns, {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '创建人',
    dataIndex: 'createUsername',
  },
  {
    title: '耗材信息',
    dataIndex: 'baseInfo',
    hideInForm: true,
    hideInTable: false,
    hideInSearch: true,
    hide: true,
    render: (val: any, entity: any) => {
      return (
        <Descriptions bordered size="small"
          column={ 1 }
          labelStyle={ { width: "110px", padding: "8px" } }
          style={ { width: "100%" } }
        >
          <Descriptions.Item label="耗材ID" >{ val?.id }</Descriptions.Item>
          <Descriptions.Item label="耗材编号" >{ val?.no }</Descriptions.Item>
          <Descriptions.Item label="耗材名称">{ val?.name }</Descriptions.Item>
          <Descriptions.Item label="耗材类型">{ val?.typeName }</Descriptions.Item>
          <Descriptions.Item label="耗材型号">{ val?.modelName }</Descriptions.Item>
          <Descriptions.Item label="耗材描述">{ val?.description }</Descriptions.Item>
          <Descriptions.Item label="耗材图片">
            { val?.imgUrls.length > 0 ?
              (
                <Row gutter={ [ 16, 16 ] } >
                  { val?.imgUrls.map((url: string) =>
                    <Col>
                      <Image
                        width="60px" height="60px"
                        src={ `${url}?x-oss-process=image/resize,h_100,w_100,m_lfit` }
                        preview={ { src: url } }
                      />
                    </Col>
                  ) }</Row>
              ) : "暂无图片"
            }
          </Descriptions.Item>
          <Descriptions.Item label="耗材创建时间">{ val?.createTime }</Descriptions.Item>
          <Descriptions.Item label="耗材创建人">{ val?.createUsername }</Descriptions.Item>
          <Descriptions.Item label="耗材修改时间">{ val?.updateTime }</Descriptions.Item>
          <Descriptions.Item label="耗材修改人">{ val?.updateUsername }</Descriptions.Item>
        </Descriptions>
      );
    }
  } ]
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
    <>
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
      <Drawer
        width={ 600 }
        visible={ showDetail }
        onClose={ () => {
          setCurrentRow(undefined);
          setShowDetail(false);
        } }
        closable={ false }
      >
        { currentRow?.id && (
          <ProDescriptions<RecordConsumableDataType>
            column={ 1 }
            title={ currentRow?.name }
            key={ currentRow?.id }
            request={ async () => ({
              data: currentRow || {},
            }) }
            params={ {
              id: currentRow?.id,
            } }
            columns={ descriptionsColums as ProDescriptionsItemProps<RecordConsumableDataType>[] }
          />
        ) }
      </Drawer>
    </>
  );
};

export default EditableTable