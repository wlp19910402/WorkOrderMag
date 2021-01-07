import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions, { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { queryRoleList } from './service';
import { RoleDataType } from './data.d';
import ModalModifyForm from './components/ModalModifyForm'
/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: RoleDataType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    // await removeRule({
    //   deleteId: selectedRows.map((row) => row.id),
    // });
    hide;
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide;
    message.error('删除失败，请重试');
    return false;
  }
};
const RoleList: React.FC<RoleDataType> = () => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<RoleDataType>();
  const [ selectedRowsState, setSelectedRows ] = useState<RoleDataType[]>([]);
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const columns: ProColumns<RoleDataType>[] = [
    {
      title: "id",
      dataIndex: 'id',
      sorter: true
    },
    {
      title: "角色名称",
      dataIndex: 'roleName',
      tip: '规则名称是唯一的 key',
      key: 'roleName',
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
      title: "部门ID",
      dataIndex: 'deptId',
    },
    {
      title: "备注",
      dataIndex: 'remark',
      hideInForm: true,
      hideInTable: true
    },
    {
      title: "操作",
      valueType: 'option',
      render: (_, record) => [
        <a
          onClick={ () => { handleModalVisible(true); setCurrentRow(record); } }
        >
          编辑
        </a>,
        <Popconfirm
          title="是否要删除此行？"
          onConfirm={ () => { handleRemove([ record ]); actionRef.current?.reloadAndRest?.(); } }>
          <a>删除</a>
        </Popconfirm>
      ],
    },
  ];
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
          <Button type="primary" key="primary" onClick={ () => { handleModalVisible(true); setCurrentRow(undefined); } }>
            <PlusOutlined />新建
          </Button>,
        ] }
        request={ async (params, sorter, filter) => await queryRoleList() }
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
        { currentRow?.roleName && (
          <ProDescriptions<RoleDataType>
            column={ 1 }
            title={ currentRow?.roleName }
            request={ async () => ({
              data: currentRow || {},
            }) }
            params={ {
              id: currentRow?.id,
            } }
            columns={ columns as ProDescriptionsItemProps<RoleDataType>[] }
          />
        ) }
      </Drawer>
    </PageContainer>
  );
};

export default RoleList;
