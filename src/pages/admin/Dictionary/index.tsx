import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { queryDictionaryList, deleteDictionary } from './service';
import type { DictionaryDataType } from '../data.d';
import ModalModifyForm from './components/ModalModifyForm'

export type RoleCheckBoxDataType = {
  label: string;
  value: number;
}
// const handleRemove = async (selectedRows: DictionaryDataType[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     // await removeRule({
//     //   deleteId: selectedRows.map((row) => row.id),
//     // });
//     hide;
//     message.success('删除成功，即将刷新');
//     return true;
//   } catch (error) {
//     hide;
//     message.error('删除失败，请重试');
//     return false;
//   }
// };
const DictionaryList: React.FC<DictionaryDataType> = () => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<DictionaryDataType>();
  const [ selectedRowsState, setSelectedRows ] = useState<DictionaryDataType[]>([]);
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const columns: ProColumns<any>[] = [
    {
      title: "字典名称",
      dataIndex: 'name',
      tip: 'id是唯一的key',
      key: 'id',
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
      title: "字典类型",
      dataIndex: 'type',
    },
    {
      title: "字典码",
      dataIndex: 'code',
    },
    {
      title: "字典值",
      dataIndex: 'value'
    },
    {
      title: "备注",
      dataIndex: 'remark',
    },
    {
      title: "操作",
      valueType: 'option',
      width: "140px",
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          size="small"
          disabled={ record.type === "0" }
          onClick={ () => { fetchUserEdit(record) } }
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          disabled={ record.type === "0" }
          title="是否要删除此行？"
          onConfirm={ () => { record.type !== undefined && tiggerDeleteDictionary(record.id?.toString()); } }>
          <Button disabled={ record.type === "0" } size="small" type="link">删除</Button>
        </Popconfirm>
      ],
    },
  ];
  const tiggerDeleteDictionary = async (id: string) => {
    const response = await deleteDictionary(id)
    if (!response) return
    if (actionRef.current) {
      actionRef.current.reloadAndRest?.();
    }
    message.success("删除成功")
  }
  const fetchUserEdit = async (record: DictionaryDataType) => {
    await setCurrentRow(record);
    handleModalVisible(true);
  }
  const fetchQueryList = async (params: any) => {
    const response = await queryDictionaryList(params)
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
        // search={ {
        //   labelWidth: 80,
        // } }
        search={ false }
        pagination={ {
          pageSize: 10,
        } }
        toolBarRender={ () => [
          <Button type="primary" onClick={ async () => { await setCurrentRow(undefined); handleModalVisible(true); } }>
            <PlusOutlined />新建
          </Button>,
        ] }
        request={ async (params, sorter, filter) => await fetchQueryList({ ...params, sorter, filter }) }
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
          <ProDescriptions<DictionaryDataType>
            column={ 1 }
            title={ currentRow?.name }
            key={ currentRow?.id }
            request={ async () => ({
              data: currentRow || {},
            }) }
            params={ {
              id: currentRow?.id,
            } }
            columns={ columns as ProDescriptionsItemProps<DictionaryDataType>[] }
          />
        ) }
      </Drawer>
    </PageContainer>
  );
};

export default DictionaryList;
