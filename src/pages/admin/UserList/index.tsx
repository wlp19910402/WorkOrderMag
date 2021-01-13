import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Popconfirm, Switch } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions, { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { queryUserList, deleteUser, statusUser, getUserRoleId } from './service';
import { UserListDataType } from '../data.d';
import ModalModifyForm from './components/ModalModifyForm'
import { queryRoleList } from '@/pages/admin/Role/service'
import ModalAuthifyForm from './components/ModalAuthifyForm'
/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserListDataType[]) => {
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
export interface RoleCheckBoxDataType {
  label: string;
  value: number;
}

const ResumeList: React.FC<UserListDataType> = () => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<UserListDataType>();
  const [ selectedRowsState, setSelectedRows ] = useState<UserListDataType[]>([]);
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const [ modalAuthifyVisible, handleModalAuthifyVisible ] = useState<boolean>(false);
  const [ roleData, setRoleData ] = useState<RoleCheckBoxDataType[] | undefined>();
  const [ initialRoleIds, setInitialRoleIds ] = useState<number[] | undefined>(undefined)
  const columns: ProColumns<UserListDataType>[] = [
    {
      title: "id",
      dataIndex: 'id',
      sorter: true
    },
    {
      title: "部门id",
      dataIndex: 'deptId'
    },
    {
      title: "姓名",
      dataIndex: 'realname',
      tip: '规则名称是唯一的 key',
      key: 'realname',
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
      title: "用户名",
      dataIndex: 'username',
    },
    {
      title: "电子邮箱",
      dataIndex: 'email',
      valueType: 'textarea',
    },
    {
      title: "手机号",
      dataIndex: 'mobile',
      valueType: 'textarea',
    },
    {
      title: "创建时间",
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'textarea',
    },
    {
      title: "状态",
      dataIndex: 'status',
      hideInForm: true,
      render: ((val, record) => {
        return (<Switch disabled={ record.id === 1 } loading={ false } onClick={ async (checked: boolean, event: Event) => {
          record.id != undefined && switchUserStatus(record.id?.toString(), val === 1 ? true : false)
        } } checkedChildren='启用' unCheckedChildren='禁用' defaultChecked={ val === 1 } />)
      })
    },
    {
      title: "操作",
      valueType: 'option',
      render: (_, record) => [
        <Button
          type="text"
          size="small"
          disabled={ record.id === 1 }
          onClick={ async () => { fetchUserEdit(record) } }
        >
          编辑
        </Button>,
        <Popconfirm
          disabled={ record.id === 1 }
          title="是否要删除此行？"
          onConfirm={ () => { record.id != undefined && tiggerDeleteUser(record.id?.toString()); } }>
          <Button disabled={ record.id === 1 } size="small" type="text" >删除</Button>
        </Popconfirm>,
        <Button
          type="text"
          size="small"
          disabled={ record.id === 1 }
          onClick={ async () => { fetchUserRoleId(record) } }
        >
          授权
        </Button>
      ],
    },
  ];
  const switchUserStatus = async (id: string, batch: boolean) => {
    let response = await statusUser(id);
    if (response.code === 0) {
      if (actionRef.current) {
        actionRef.current.reloadAndRest?.();
      }
      message.success(`${batch ? '禁用' : '启用'}成功`)
    } else {
      message.error(response.message)
    }
  };
  const tiggerDeleteUser = async (id: string) => {
    let response = await deleteUser(id)
    if (response.code === 0) {
      if (actionRef.current) {
        actionRef.current.reloadAndRest?.();
      }
      message.success("删除成功")
    } else {
      message.error(response.message)
    }
  }
  const fetchUserRoleId = async (record: UserListDataType) => {
    setCurrentRow(record);
    record.id !== undefined && getUserRoleId(record.id?.toString()).then(
      async (res) => {
        if (res.code === 0) {
          setInitialRoleIds(res.data);
          await fetchRoleListData();
          handleModalAuthifyVisible(true);
        } else {
          message.error(res.message);
        }
      })
  }
  const fetchUserEdit = async (record: UserListDataType) => {
    setCurrentRow(record);
    record.id !== undefined && getUserRoleId(record.id?.toString()).then(
      async (res) => {
        if (res.code === 0) {
          setInitialRoleIds(res.data);
          await fetchRoleListData();
          handleModalVisible(true);
        } else {
          message.error(res.message);
        }
      })
  }
  const fetchRoleListData = async () => {
    if (roleData === undefined) {
      let response = await queryRoleList()
      if (response.code === 0) {
        await setRoleData(response.data.map((item: any) => ({
          label: item.roleName,
          value: item.id
        })))
      } else {
        message.error(response.message);
      }
    }
  }
  const fetchQueryUserList = async (params: any) => {
    let response = await queryUserList(params)
    if (response.code === 0) {
      let data = response.data;
      return ({ ...data, data: data.records })
    } else {
      message.error(response.message)
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
          <Button type="primary" onClick={ async () => { await fetchRoleListData(); await setInitialRoleIds([]); handleModalVisible(true); setCurrentRow(undefined); } }>
            <PlusOutlined />新建
          </Button>,
        ] }
        request={ async (params, sorter, filter) => await fetchQueryUserList({ ...params, sorter, filter }) }
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
          roleData={ roleData }
          initialRoleIds={ initialRoleIds }
        />
      ) }
      {modalAuthifyVisible && (
        <ModalAuthifyForm
          modalAuthifyVisible={ modalAuthifyVisible }
          handleModalAuthifyVisible={ handleModalAuthifyVisible }
          actionRef={ actionRef }
          currentRow={ currentRow }
          roleData={ roleData }
          initialRoleIds={ initialRoleIds }
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
        { currentRow?.username && (
          <ProDescriptions<UserListDataType>
            column={ 1 }
            title={ currentRow?.username }
            key={ currentRow?.id }
            request={ async () => ({
              data: currentRow || {},
            }) }
            params={ {
              id: currentRow?.id,
            } }
            columns={ columns as ProDescriptionsItemProps<UserListDataType>[] }
          />
        ) }
      </Drawer>
    </PageContainer>
  );
};

export default ResumeList;
