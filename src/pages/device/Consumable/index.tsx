import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Popconfirm, Image, Row, Col, } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { queryConsumableList, deleteConsumable } from './service';
import type { ConsumableListDataType } from './data.d';
import ModalModifyForm from './components/ModalModifyForm'
import ImgNull from '@/assets/images/images-null.png';
import { fetchDicTypeSelectObj } from '@/pages/admin/Dictionary/service'
import CODE from '@/utils/DicCode.d'
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
const DictionaryList: React.FC<ConsumableListDataType> = () => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<ConsumableListDataType>();
  const [ selectedRowsState, setSelectedRows ] = useState<ConsumableListDataType[]>([]);
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const [ searchType, setSearchType ] = useState<any>({})//设备类型
  const [ searchModel, setSearchModel ] = useState<any>({})//品牌
  let dicCode = async () => {
    setSearchType(await fetchDicTypeSelectObj(CODE.CONSUMABLE_TYPE))
    setSearchModel(await fetchDicTypeSelectObj(CODE.CONSUMABLE_MODEL))
  }
  useEffect(() => {
    dicCode()
  }, [])
  const columns: ProColumns<any>[] = [
    {
      title: "id",
      dataIndex: 'id',
      hideInSearch: true
    },
    {
      title: "耗材名称",
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
      }
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
      title: "耗材编号",
      dataIndex: 'no',
      hideInSearch: true
    },
    {
      title: "耗材型号",
      dataIndex: 'modelName',
      hideInSearch: true
    },
    {
      title: "耗材型号",
      dataIndex: 'model',
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        ...searchModel
      },
      // getValueFromEvent={ (arg) => {
      //     fetchDicTypeSelectObj(arg).then(res => {
      //       setSearchModel(res);
      //     });
      //     return arg
      //   } }
    },
    {
      title: "耗材类型",
      dataIndex: 'typeName',
      hideInSearch: true
    },
    {
      title: "耗材类型",
      dataIndex: 'type',
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        ...searchType
      },
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
      title: "耗材描述",
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
  const columnsDrawer = columns.map(item => {
    if (item.dataIndex === 'imgUrls') {
      return ({
        title: "图片",
        dataIndex: 'imgUrls',
        hideInSearch: true,
        render: (val: any) => {
          return val && val.length > 0 ?
            (
              <Row gutter={ [ 16, 16 ] } >
                { val.map((url: string) =>
                  <Col>
                    <Image
                      width="60px" height="60px"
                      src={ `${url}?x-oss-process=image/resize,h_100,w_100,m_lfit` }
                      preview={ { src: url } }
                    />
                  </Col>
                ) }</Row>
            ) : "暂无图片"
        }
      })
    }
    return item
  })
  const tiggerDelete = async (id: string) => {
    const response = await deleteConsumable(id)
    if (!response) return
    if (actionRef.current) {
      actionRef.current.reloadAndRest?.();
    }
    message.success("删除成功")
  }
  const fetchUserEdit = async (record: ConsumableListDataType) => {
    await setCurrentRow(record);
    handleModalVisible(true);
  }
  const fetchQueryList = async (params: any) => {
    const response = await queryConsumableList(params)
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
          dicCodeData={ {
            searchType
          } }
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
          <ProDescriptions<ConsumableListDataType>
            column={ 1 }
            title={ currentRow?.name }
            key={ currentRow?.id }
            request={ async () => ({
              data: currentRow || {},
            }) }
            params={ {
              id: currentRow?.id,
            } }
            columns={ columnsDrawer as ProDescriptionsItemProps<ConsumableListDataType>[] }
          />
        ) }
      </Drawer>
    </PageContainer>
  );
};

export default DictionaryList;