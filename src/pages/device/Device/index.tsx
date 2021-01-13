import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions, { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { queryDeviceList, deleteDevice } from './service';
import { DeviceListDataType } from '../data.d';
import ModalModifyForm from './components/ModalModifyForm'
export interface RoleCheckBoxDataType {
  label: string;
  value: number;
}
const handleRemove = async (selectedRows: DeviceListDataType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    hide;
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide;
    message.error('删除失败，请重试');
    return false;
  }
};
const DictionaryList: React.FC<DeviceListDataType> = () => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<DeviceListDataType>();
  const [ selectedRowsState, setSelectedRows ] = useState<DeviceListDataType[]>([]);
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const columns: ProColumns<DeviceListDataType>[] = [
    {
      title: "id",
      dataIndex: 'id',
      hideInSearch: true
    },
    {
      title: "品牌",
      dataIndex: 'brand',
      hideInSearch: true,
    },
    {
      title: "设备名称",
      dataIndex: 'name',
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
      },
    },
    {
      title: "图片",
      dataIndex: 'imgUrls',
      hideInSearch: true
    },
    {
      title: "设备编号",
      dataIndex: 'no'
    },
    {
      title: "规格",
      dataIndex: 'specification'
    },
    {
      title: "设备类型",
      dataIndex: 'type'
    },
    {
      title: "保修周期",
      dataIndex: 'warrantyPeriod',
      hideInSearch: true
    },
    {
      title: "创建人",
      dataIndex: 'createUser',
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: "创建日期",
      dataIndex: 'createTime',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: "修改人",
      dataIndex: 'updateUser',
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: "修改时间",
      dataIndex: 'updateTime',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: "设备描述",
      dataIndex: 'description',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: "操作",
      valueType: 'option',
      width: "140px",
      render: (_, record) => [
        <Button
          type="text"
          size="small"
          onClick={ async () => { fetchUserEdit(record) } }
        >
          编辑
        </Button>,
        <Popconfirm
          title="是否要删除此行？"
          onConfirm={ () => { record.id != undefined && tiggerDelete(record.id?.toString()); } }>
          <Button size="small" type="text" >删除</Button>
        </Popconfirm>
      ],
    },
  ];
  const tiggerDelete = async (id: string) => {
    let response = await deleteDevice(id)
    if (response.code === 0) {
      if (actionRef.current) {
        actionRef.current.reloadAndRest?.();
      }
      message.success("删除成功")
    } else {
      message.error(response.message)
    }
  }
  const fetchUserEdit = async (record: DeviceListDataType) => {
    await setCurrentRow(record);
    handleModalVisible(true);
  }
  const fetchQueryList = async (params: any) => {
    let response = await queryDeviceList(params)
    if (response.code === 0) {
      let data = response.data;
      return ({ ...data, data: data.records })
    } else {
      message.error(response.message);
    }
  }
  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={ actionRef }
        rowKey="id"
        search={ {
          labelWidth: 80,
        } }
        pagination={ {
          pageSize: 10,
        } }
        toolBarRender={ () => [
          <Button type="primary" onClick={ async () => { await setCurrentRow(undefined); handleModalVisible(true); } }>
            <PlusOutlined />新建
          </Button>,
        ] }
        request={ async (params, sorter, filter) => await fetchQueryList({ ...params, ...filter }) }
        columns={ columns }
        rowSelection={ {
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        } }
      />

      {createModalVisible && (
        <ModalModifyForm
          createModalVisible={ createModalVisible }
          handleModalVisible={ handleModalVisible }
          actionRef={ actionRef }
          currentRow={ currentRow }
        />
      ) }

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
          <ProDescriptions<DeviceListDataType>
            column={ 1 }
            title={ currentRow?.name }
            key={ currentRow?.id }
            request={ async () => ({
              data: currentRow || {},
            }) }
            params={ {
              id: currentRow?.id,
            } }
            columns={ columns as ProDescriptionsItemProps<DeviceListDataType>[] }
          />
        ) }
      </Drawer>
    </PageContainer>
  );
};

export default DictionaryList;
