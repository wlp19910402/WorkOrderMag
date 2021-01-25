import { ConsumableAddDataType } from '@/pages/archive/portfolio/data.d'
import { Drawer, Modal, message } from 'antd';
import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { sendOrder } from '@/pages/workOrder/service'
import { queryList } from '@/pages/archive/Engineer/service';
import type { EngineerListDataType } from "@/pages/archive/Engineer/data.d";
export type ColumnEditConsumableType = {
  consumableName: string;
  consumableNo: string;
  consumableTypeName: string;
  consumableModelName: string;
} & ConsumableAddDataType

type ModalModifyFormDataProps = {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  listReloadAndRest?: () => void;
  currentOrder?: any;
}
const ModelConsumableAdd: React.FC<ModalModifyFormDataProps> = ({ createModalVisible = false, handleModalVisible, listReloadAndRest, currentOrder }) => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<EngineerListDataType>();
  const columns: ProColumns<any>[] = [
    {
      title: "工程师姓名",
      dataIndex: 'engineerName',
      render: (val, entity) => {
        return (
          <a
            onClick={ () => {
              setCurrentRow(entity);
              setShowDetail(true);
            } }
          >
            {`${val}` }
          </a>
        );
      }
    },
    {
      title: "工程师手机号",
      dataIndex: 'engineerMobile'
    },
    {
      title: "工程师角色",
      dataIndex: 'roleName',
      // valueEnum: {
      //   role_engineer:"微信工程师"
      // }
    },
    {
      title: "操作",
      valueType: 'option',
      width: "48px",
      render: (_, record) => [
        <a key="add" onClick={ () => {
          tiggerSendOrder(record)
        } }>派单</a>
      ],
    },
  ];
  const tiggerSendOrder = async (record: any) => {
    //在工单列表中进行绑定档案
    let response = await sendOrder({
      id: currentOrder.id,
      engineerId: record.id,
      supporterIds: 0,//???
    })
    if (!response) return
    message.success("绑定成功");
    if (listReloadAndRest) listReloadAndRest();
    handleModalVisible(false);
  }

  const fetchQueryList = async (params: any) => {
    const response = await queryList(params)
    if (!response) return
    const { data } = response;
    return ({ ...data, data: data.records })
  }
  return (
    <>
      <Modal
        title="绑定档案"
        width="800px"
        visible={ createModalVisible }
        footer={ null }
        bodyStyle={ { padding: "0 " } }
        onCancel={ () => handleModalVisible(false) }
      >
        <ProTable
          headerTitle="查询表格"
          actionRef={ actionRef }
          rowKey="id"
          search={ {
            labelWidth: 120,
          } }
          pagination={ {
            pageSize: 10,
          } }
          size="small"
          request={ async (params, sorter, filter) => await fetchQueryList({ ...params, ...filter }) }
          columns={ columns }
          scroll={ { y: 300 } }
        />
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
            <ProDescriptions<EngineerListDataType>
              column={ 1 }
              title={ "工程师信息" }
              key={ currentRow?.id }
              request={ async () => ({
                data: currentRow || {},
              }) }
              params={ {
                id: currentRow?.id,
              } }
              columns={ columns as ProDescriptionsItemProps<EngineerListDataType>[] }
            />
          ) }
        </Drawer>
      </Modal>
    </>
  );
};

export default ModelConsumableAdd