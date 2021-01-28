import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { queryList } from '@/pages/archive/Engineer/service';
import { EngineerListDataType, engineerStatusEnum } from "@/pages/archive/Engineer/data.d";
import ModalModifyForm from './components/ModalModifyForm'
// const handleRemove = async (selectedRows: DeviceListDataType[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     hide;
//     message.success('删除成功，即将刷新');
//     return true;
//   } catch (error) {
//     hide;
//     message.error('删除失败，请重试');
//     return false;
//   }
// };
const DictionaryList: React.FC<{}> = () => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<EngineerListDataType>();
  const [ selectedRowsState, setSelectedRows ] = useState<EngineerListDataType[]>([]);
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
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
      title: "状态",
      dataIndex: 'status',
      valueEnum: {
        ...engineerStatusEnum
      },
      hideInDescriptions: true,
      hideInTable: true
    },
    // {
    //   title: "操作",
    //   valueType: 'option',
    //   width: "140px",
    //   render: (_, record) => [
    //     <Button
    //       key="edit"
    //       type="text"
    //       size="small"
    //       onClick={ () => { fetchUserEdit(record) } }
    //     >
    //       编辑
    //     </Button>,
    //     <Popconfirm
    //       key="delete"
    //       title="是否要删除此行？"
    //       onConfirm={ () => { record.id !== undefined && tiggerDelete(record.id?.toString()); } }>
    //       <Button size="small" type="text" >删除</Button>
    //     </Popconfirm>
    //   ],
    // },
  ];

  const tiggerDelete = async (id: string) => {
    // const response = await deleteCompany(id)
    // if (!response) return
    // if (actionRef.current) {
    //   actionRef.current.reloadAndRest?.();
    // }
    // message.success("删除成功")
  }
  const fetchUserEdit = async (record: EngineerListDataType) => {
    await setCurrentRow(record);
    handleModalVisible(true);
  }
  const fetchQueryList = async (params: any) => {
    const response = await queryList(params)
    if (!response) return { data: [] }
    const { data } = response;
    return ({ ...data, data: data.records })
  }
  return (
    <PageContainer header={ { title: "" } }>
      <ProTable
        size="small"
        headerTitle="查询表格"
        actionRef={ actionRef }
        rowKey="id"
        search={ {
          labelWidth: 120,
        } }
        pagination={ {
          pageSize: 10,
        } }
        // toolBarRender={ () => [
        //   <Button type="primary" onClick={ async () => { await setCurrentRow(undefined); handleModalVisible(true); } }>
        //     <PlusOutlined />新建
        //   </Button>,
        // ] }
        request={ async (params, sorter, filter) => await fetchQueryList({ ...params, ...filter }) }
        columns={ columns }
        // rowSelection={ {
        //   onChange: (_, selectedRows: any) => setSelectedRows(selectedRows),
        // } }
        rowSelection={ false }
      />

      {/* {createModalVisible && (
        <ModalModifyForm
          createModalVisible={ createModalVisible }
          handleModalVisible={ handleModalVisible }
          actionRef={ actionRef }
          currentRow={ currentRow }
        />
      ) } */}

      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{ ' ' }<a style={ { fontWeight: 600 } }>{ selectedRowsState.length }</a>{ ' ' }
              项
            </div>
          }
        >
          <Popconfirm
            title={ `是否要批量删除 ${selectedRowsState.length} 项` }
            onConfirm={ async () => {
              // await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            } }>
            <Button
            >
              批量删除
          </Button>
          </Popconfirm>
        </FooterToolbar>
      ) }
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
    </PageContainer>
  );
};

export default DictionaryList;