import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Switch, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import ProDescriptions, { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { queryUserList, addUser } from './service';
import { PageDataType, UserListDataType, userListDataDefault, EditUserDataType } from '../data.d';
/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: PageDataType[]) => {
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
/**
 *发布
 */
const handlePublish = async (selectedRows: UserListDataType[], batch: boolean) => {
  const hide = message.loading('正在设置');
  if (!selectedRows) return true;
  try {
    // await publishRule({
    //   publishId: selectedRows.map((row) => row.id),
    //   batch
    // });
    hide;
    message.success('成功设置，即将刷新');
    return true;
  } catch (error) {
    hide;
    message.error('设置失败，请重试');
    return false;
  }
};
const ResumeList: React.FC<UserListDataType> = () => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<UserListDataType>();
  const [ selectedRowsState, setSelectedRows ] = useState<UserListDataType[]>([]);
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const columns: ProColumns<UserListDataType>[] = [
    {
      title: "id",
      dataIndex: 'id',
      sorter: true,
      renderText: ((val) => `${val}`)
    },
    {
      title: "部门id",
      dataIndex: 'deptId',
      renderText: ((val) => `${val}`)
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
      renderText: ((val) => `${val}`)
    },
    {
      title: "电子邮箱",
      dataIndex: 'email',
      valueType: 'textarea',
      renderText: ((val) => `${val}`)
    },
    {
      title: "手机号",
      dataIndex: 'mobile',
      valueType: 'textarea',
      renderText: ((val) => `${val}`)
    },
    {
      title: "创建时间",
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'textarea',
      renderText: ((val) => `${val}`)
    },
    {
      title: "状态",
      dataIndex: 'status',
      hideInForm: true,
      valueType: 'textarea',
      valueEnum: {
        "0": {
          text: "未发布",
          status: 'Default',
        },
        "1": {
          text: "已发布",
          status: 'Success',
        },
        "2": {
          text: "已删除",
          status: 'Cancel',
        },
      },
    },
    {
      title: "状态",
      dataIndex: 'status',
      hideInForm: true,
      hideInSearch: true,
      valueType: 'textarea',
      render: ((val, record) => {
        return (<Switch loading={ false } onClick={ async (checked: boolean, event: Event) => {
          handlePublish([ record ], false)
        } } checkedChildren='发布' unCheckedChildren="关闭" defaultChecked={ val === '1' } />)
      })
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
          <Button type="primary" key="primary" onClick={ () => { handleModalVisible(true); setCurrentRow(userListDataDefault); } }>
            <PlusOutlined />新建
          </Button>,
        ] }
        request={ async (params, sorter, filter) => await queryUserList({ ...params, sorter, filter }) }
        columns={ columns }
        rowSelection={ {
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        } }
      />
      {createModalVisible && (
        <ModalForm
          title='新建用户'
          width="400px"
          visible={ createModalVisible }
          onVisibleChange={ handleModalVisible }
          onFinish={ async (value) => {
            console.log("新增", value)
            let bodyVaule: EditUserDataType = {
              username: value.username,
              email: value.email,
              mobile: value.mobile,
              realName: value.realname,
              roleIds: value.roleIds,
              password: value.password
            }
            const res = await addUser(bodyVaule)
            if (res.code === 0) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          } }
        >
          <ProFormText
            rules={ [
              {
                required: true,
                message: "请输入用户名！"
              },
            ] }
            label="用户名"
            name="username"
            placeholder="请输入用户名"
            initialValue={ currentRow?.username }
          />
          <ProFormText
            rules={ [
              {
                required: true,
                message: "请输入姓名！"
              },
            ] }
            label="姓名"
            name="realName"
            placeholder="请输入姓名"
            initialValue={ currentRow?.realname }
          />
          <ProFormText.Password rules={ [
            {
              required: true,
              message: "请输入密码！"
            },
          ] } label="密码" name="password" placeholder="请输入密码"
          />
          <ProFormText
            rules={ [
              {
                required: true,
                message: "请输入手机号！"
              },
            ] }
            label="手机号"
            name="mobile"
            placeholder="请输入手机号"
            initialValue={ currentRow?.mobile }
          />
          <ProFormText
            rules={ [
              {
                required: true,
                message: "请输入邮箱！"
              },
            ] }
            label="邮箱"
            name="email"
            placeholder="请输入邮箱"
            initialValue={ currentRow?.email }
          />
          <ProFormCheckbox.Group
            name="roleIds"
            layout="horizontal"
            label="角色id"
            options={ [
              {
                label: "管理员",
                value: 0
              },
              {
                label: "维修人员",
                value: 1
              },
              {
                label: "维修",
                value: 2
              }
            ] }
          />
        </ModalForm>
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
