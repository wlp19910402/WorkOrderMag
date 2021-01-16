import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { queryCompanyList, deleteCompany } from './service';
import type { CompanyListDataType } from './data';
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
const DictionaryList: React.FC<CompanyListDataType> = () => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<CompanyListDataType>();
  const [ selectedRowsState, setSelectedRows ] = useState<CompanyListDataType[]>([]);
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const columns: ProColumns<any>[] = [
    {
      title: "id",
      dataIndex: 'id',
      hideInSearch: true
    },
    {
      title: "单位名称",
      dataIndex: 'company',
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
      title: "单位编号",
      dataIndex: 'no'
    },
    {
      title: "联系电话",
      dataIndex: 'contactMobile',
    },
    {
      title: "联系人",
      dataIndex: 'contactUser',
    },
    {
      title: "创建人",
      dataIndex: 'createUsername',
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
      dataIndex: 'updateUsername',
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
      title: "备注",
      dataIndex: 'remark',
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
          onClick={ () => { fetchUserEdit(record) } }
        >
          编辑
        </Button>,
        <Popconfirm
          title="是否要删除此行？"
          onConfirm={ () => { record.id !== undefined && tiggerDelete(record.id?.toString()); } }>
          <Button size="small" type="text" >删除</Button>
        </Popconfirm>
      ],
    },
  ];

  const tiggerDelete = async (id: string) => {
    const response = await deleteCompany(id)
    if (!response) return
    if (actionRef.current) {
      actionRef.current.reloadAndRest?.();
    }
    message.success("删除成功")
  }
  const fetchUserEdit = async (record: CompanyListDataType) => {
    await setCurrentRow(record);
    handleModalVisible(true);
  }
  const fetchQueryList = async (params: any) => {
    const response = await queryCompanyList(params)
    if (!response) return
    const { data } = response;
    return ({ ...data, data: data.records })
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
          onChange: (_, selectedRows: any) => setSelectedRows(selectedRows),
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
          <ProDescriptions<CompanyListDataType>
            column={ 1 }
            title={ currentRow?.company }
            key={ currentRow?.id }
            request={ async () => ({
              data: currentRow || {},
            }) }
            params={ {
              id: currentRow?.id,
            } }
            columns={ columns as ProDescriptionsItemProps<CompanyListDataType>[] }
          />
        ) }
      </Drawer>
    </PageContainer>
  );
};

export default DictionaryList;