import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Popconfirm, Image, Row, Col, } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { queryList } from '@/pages/workOrder/service';
import { orderStatusEnum, OrderListType, orderTypeEnum } from '@/pages/workOrder/data.d';
import ImgNull from '@/assets/images/images-null.png';
import ModelBindProtolioAdd from '@/pages/workOrder/components/ModelBindProtolioAdd'
import { history } from 'umi'

const DictionaryList: React.FC<OrderListType> = () => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<OrderListType>();
  const [ selectedRowsState, setSelectedRows ] = useState<OrderListType[]>([]);
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const columns: ProColumns<any>[] = [
    {
      title: "工单编号",
      dataIndex: 'orderNo',
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
      title: "报单单位",
      dataIndex: 'company'
    },
    {
      title: "工单类型",
      dataIndex: 'orderType',
      hideInSearch: true,
      hideInTable: true,
      valueEnum: {
        ...orderTypeEnum
      },
    },
    {
      title: "工单来源",
      dataIndex: 'sourceType',
    },
    {
      title: "图片",
      dataIndex: 'imgUrls',
      hideInSearch: true,
      render: (val: any) => {
        return val && val.length > 0 ?
          (
            <Image
              width="60px" height="60px"
              src={ `${val[ 0 ]}?x-oss-process=image/resize,h_100,w_100,m_lfit` }
              preview={ { src: val[ 0 ] } }
            />
          ) : (
            <Image
              width="60px"
              height="60px"
              src={ ImgNull }
              preview={ false }
            ></Image >
          )
      }
    },

    {
      title: "客户姓名",
      dataIndex: 'customerName',
    },
    {
      title: "客户电话",
      dataIndex: 'customerMobile'
    },
    {
      title: "工程师姓名",
      dataIndex: 'engineerName'
    },
    {
      title: "工单状态",
      dataIndex: 'status',
      valueEnum: {
        ...orderStatusEnum
      },
    },
    {
      title: "设备名称",
      dataIndex: 'deviceName',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: "设备类型",
      dataIndex: ' deviceType',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: "创建人",
      dataIndex: 'createUsername',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: "创建时间",
      dataIndex: 'createTime',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: "接单时间",
      dataIndex: 'receivingTime',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: "工单描述",
      dataIndex: 'workDescription',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: "操作",
      valueType: 'option',
      width: "140px",
      render: (_, record) => [
        <Button
          key="edit"
          type="text"
          size="small"
          onClick={ () => { fetchBindPortolio(record) } }
          disabled={ record.portfolioId }
        >
          绑定档案
        </Button >
        ,
        <Button
          key="edit"
          type="text"
          size="small"
          onClick={ () => { fetchUserEdit(record) } }
        >
          派单
        </Button>,
        <Popconfirm
          key="delete"
          title="是否要删除此行？"
          onConfirm={ () => { record.id !== undefined && tiggerDelete(record.id?.toString()); } }>
          <Button size="small" type="text" >删除</Button>
        </Popconfirm>
      ],
    },
  ];
  const columnsDrawer = [
    ...columns.filter(item => item.dataIndex !== 'imgUrls'),
    {
      title: "图片",
      dataIndex: 'imgUrls',
      hideInSearch: true,
      render: (val: any) => {
        return val && val.length > 0 ?
          (
            <Row gutter={ [ 16, 16 ] } >
              { val.map((url: string, index: number) =>
                <Col key={ index }>
                  <Image
                    width="60px" height="60px"
                    src={ `${url}?x-oss-process=image/resize,h_100,w_100,m_lfit` }
                    preview={ { src: url } }
                  />
                </Col>
              ) }</Row>
          ) : "暂无图片"
      }
    } ]
  const tiggerDelete = async (id: string) => {
    const response = await deleteDevice(id)
    if (!response) return
    if (actionRef.current) {
      actionRef.current.reloadAndRest?.();
    }
    message.success("删除成功")
  }
  const listReloadAndRest = () => {
    if (actionRef.current) {
      actionRef.current.reloadAndRest?.();
    }
  }
  const fetchBindPortolio = async (record: any) => {
    await setCurrentRow(record);
    handleModalVisible(true);
  }
  const fetchUserEdit = async (record: OrderListType) => {
    await setCurrentRow(record);
    handleModalVisible(true);
  }
  const fetchQueryList = async (params: any) => {
    const response = await queryList(params)
    if (!response) return
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
          labelWidth: 80,
        } }
        pagination={ {
          pageSize: 10,
        } }
        toolBarRender={ () => [
          <Button type="primary" onClick={ async () => { history.push('/workOrder/addOrder') } }>
            <PlusOutlined />新建
          </Button>,
        ] }
        request={ async (params, sorter, filter) => await fetchQueryList({ ...params, ...filter, orderType: "wx" }) }
        columns={ columns }
        rowSelection={ {
          onChange: (_, selectedRows: any) => setSelectedRows(selectedRows),
        } }
      />
      { createModalVisible && (
        <ModelBindProtolioAdd
          createModalVisible={ createModalVisible }
          handleModalVisible={ handleModalVisible }
          listReloadAndRest={ listReloadAndRest }
          currentOrder={ currentRow }
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
          <ProDescriptions<OrderListType>
            column={ 1 }
            title={ "设备信息" }
            key={ currentRow?.id }
            request={ async () => ({
              data: currentRow || {},
            }) }
            params={ {
              id: currentRow?.id,
            } }
            columns={ columnsDrawer as ProDescriptionsItemProps<OrderListType>[] }
          />
        ) }
      </Drawer>
    </PageContainer>
  );
};

export default DictionaryList;
