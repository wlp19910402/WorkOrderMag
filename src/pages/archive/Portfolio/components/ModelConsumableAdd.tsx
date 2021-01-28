import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Modal, message, DatePicker, InputNumber } from 'antd';
import { ConsumableAddDataType } from '@/pages/archive/portfolio/data.d'
import { addConsumableProtfolio } from '@/pages/archive/portfolio/service'
import TableConsumableList from '@/pages/archive/portfolio/components/TableConsumableList'
import { pickerDateFormat } from '@/utils/parameter'
export type ColumnEditConsumableType = {
  consumableName: string;
  consumableNo: string;
  consumableTypeName: string;
  consumableModelName: string;
} & ConsumableAddDataType

type ModalModifyFormDataProps = {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  portfolioId: string;
  queryConsumableList: () => void;
}
const ModelConsumableAdd: React.FC<ModalModifyFormDataProps> = ({ createModalVisible = false, handleModalVisible, queryConsumableList, portfolioId }) => {
  const [ editableKeys, setEditableRowKeys ] = useState<React.Key[]>([]);
  const [ dataSource, setDataSource ] = useState<ColumnEditConsumableType[]>([]);
  const columns: ProColumns<ColumnEditConsumableType>[] = [
    {
      title: "耗材名称",
      dataIndex: 'consumableName',
      editable: false,
    },
    {
      title: "耗材编号",
      dataIndex: 'consumableNo',
      editable: false,
    },
    // {
    //   title: "耗材类型",
    //   dataIndex: 'consumableTypeName',
    //   editable: false,
    //   width: "80px"
    // },
    // {
    //   title: "耗材型号",
    //   dataIndex: 'consumableModelName',
    //   editable: false,
    //   width: "80px"
    // },

    {
      title: "安装日期",
      dataIndex: 'replacementTime',
      width: "180px",
      renderFormItem: (_, { isEditable }) => {
        return isEditable ? <DatePicker
          picker="date"
          format="YYYY-MM-DD"
          placeholder="请选择安装日期"
          style={ { width: "100%" } }
        /> : ""
      }
    },
    {
      title: "更换周期(天)",
      dataIndex: 'replacementCycle',
      width: "100px",
      renderFormItem: (_, { isEditable }) => {
        return isEditable ? <InputNumber style={ { width: "100%" } } min={ 0 } max={ 1000 } /> : ""
      }
    },
    {
      title: "到期日期",
      dataIndex: 'expirationTime',
      width: "180px",
      renderFormItem: (_, { isEditable }) => {
        return isEditable ? <DatePicker
          format="YYYY-MM-DD"
          placeholder="请选择到期日期"
          style={ { width: "100%" } }
        /> : "ddd"
      }
    },
    {
      title: "数量",
      dataIndex: 'num',
      width: "80px",
      renderFormItem: (_, { isEditable }) => {
        return isEditable ? <InputNumber style={ { width: "100%" } } min={ 1 } max={ 100 } /> : ""
      }
    },
    {
      title: '操作',
      valueType: 'option',
      width: 48,
      render: () => {
        return null;
      },
    },
  ];
  const submitConsumable = async () => {
    let data: ConsumableAddDataType[] = dataSource.map(item => ({
      consumableId: item.consumableId,
      expirationTime: pickerDateFormat(item.expirationTime),
      num: item.num,
      portfolioId: item.portfolioId,
      replacementCycle: item.replacementCycle,
      replacementTime: pickerDateFormat(item.replacementTime)
    }))
    let response = await addConsumableProtfolio(data)
    if (!response) return
    message.success("新增成功")
    handleModalVisible(false);
    queryConsumableList();
  }
  return (
    <>
      <Modal
        title="添加耗材"
        width="90%"
        visible={ createModalVisible }
        onCancel={ () => handleModalVisible(false) }
        onOk={ submitConsumable }
        okText="保存"
        bodyStyle={ { padding: "0 " } }
      >
        <TableConsumableList
          selectedRowsState={ dataSource }
          setSelectedRows={ setDataSource }
          setEditableRowKeys={ setEditableRowKeys }
          portfolioId={ portfolioId }
        />
        <EditableProTable<ColumnEditConsumableType>
          rowKey="consumableId"
          headerTitle="设置新增耗材内容"
          columns={ columns }
          value={ dataSource }
          onChange={ (data) => {
            setEditableRowKeys(data.map((item) => item.consumableId));
            setDataSource(data);
          } }
          recordCreatorProps={ false }
          editable={ {
            type: 'multiple',
            editableKeys,
            actionRender: (row: any, config: any, doms: any) => {
              return [ doms.delete ];
            },
            onValuesChange: (record: any, recordList: any) => {
              setDataSource(recordList);
            },
            onChange: setEditableRowKeys,
          } }
          scroll={ { y: 200 } }
        />
      </Modal>
    </>
  );
};

export default ModelConsumableAdd