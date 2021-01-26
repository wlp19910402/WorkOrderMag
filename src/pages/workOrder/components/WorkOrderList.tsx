import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Popconfirm, Image, Row, Col, } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType, } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { queryList } from '@/pages/workOrder/service';
import { orderStatusEnum, OrderListType, orderTypeEnum } from '@/pages/workOrder/data.d';
import ImgNull from '@/assets/images/images-null.png';
import ModelBindProtolioAdd from '@/pages/workOrder/components/ModelBindProtolioAdd'
import ModelSendOrder from '@/pages/workOrder/components/ModelSendOrder'
import { history } from 'umi'
interface WorkOrderListProps {
  orderType: string;
}
const DictionaryList: React.FC<WorkOrderListProps> = ({ orderType = "wx" }) => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<OrderListType>();
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const [ sendModalVisible, handleSendModalVisible ] = useState<boolean>(false);
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
      dataIndex: 'orderImgUrls',
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
      width: "40px",
      render: (_, record) => [
        <Button
          key="bind"
          size="small"
          style={ { width: "62px" } }
          onClick={ () => { fetchBindPortolio(record) } }
          type={ record.portfolioId === "" ? "link" : "text" }
          disabled={ record.status === "wc" }
        >
          { record.portfolioId !== "" ? "重新绑定" : "绑定档案" }
        </Button >,
        record.portfolioId === "" ?
          <Popconfirm
            key='send'
            title="尚未绑定档案，确认去派单？"
            onConfirm={ () => { fetchSendOrder(record) } }
            disabled={ record.status === "wc" }
          >
            <Button
              type={ record.portfolioId === "" ? "link" : "text" }
              style={ { width: "62px" } }
              size="small"
            >
              { record.portfolioId !== "" ? "重新派单" : "派单" }
            </Button>
          </Popconfirm> :
          <Button
            key='send'
            type={ record.portfolioId === "" ? "link" : "text" }
            style={ { width: "62px" } }
            size="small"
            onClick={ () => { fetchSendOrder(record) } }
            disabled={ record.status === "wc" }
          >
            { record.portfolioId !== "" ? "重新派单" : "派单" }
          </Button>,
        <Button key="wancheng" size="small" type="link" disabled={ record.status === "wc" }>结单</Button>,
        record.status !== "wc" &&
        <TableDropdown
          style={ { fontWeight: "bold" } }
          key="actionGroup"
          menus={ [
            {
              key: 'cancel',
              name:
                <Popconfirm
                  key="delete"
                  title="是否要撤单？"
                  onConfirm={ () => { record.id !== undefined && tiggerDelete(record.id?.toString()); } }
                >
                  <Button size="small" type="text" >撤单</Button>
                </Popconfirm>
            },
          ] }
        />
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
    // const response = await deleteDevice(id)
    // if (!response) return
    // if (actionRef.current) {
    //   actionRef.current.reloadAndRest?.();
    // }
    // message.success("删除成功")
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
  const fetchSendOrder = async (record: OrderListType) => {
    await setCurrentRow(record);
    handleSendModalVisible(true);
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
        request={ async (params, sorter, filter) => await fetchQueryList({ ...params, ...filter, orderType: orderType }) }
        columns={ columns }
        rowSelection={ false }
      />
      { createModalVisible && (
        <ModelBindProtolioAdd
          createModalVisible={ createModalVisible }
          handleModalVisible={ handleModalVisible }
          listReloadAndRest={ listReloadAndRest }
          currentOrder={ currentRow }
        />
      ) }
      { sendModalVisible && (
        <ModelSendOrder
          createModalVisible={ sendModalVisible }
          handleModalVisible={ handleSendModalVisible }
          listReloadAndRest={ listReloadAndRest }
          currentOrder={ currentRow }
        />
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