import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Popconfirm, Image, Row, Col, } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { queryDeviceList, deleteDevice } from './service';
import type { DeviceListDataType } from './data.d';
import ModalModifyForm from './components/ModalModifyForm'
import ImgNull from '@/assets/images/images-null.png';
import { fetchDicTypeSelectObj } from '@/pages/admin/Dictionary/service'
import CODE from '@/utils/DicCode.d'
import SearchSelect from '@/components/common/SerchSelect'
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
const DictionaryList: React.FC<DeviceListDataType> = () => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<DeviceListDataType>();
  const [ selectedRowsState, setSelectedRows ] = useState<DeviceListDataType[]>([]);
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const [ searchType, setSearchType ] = useState<any>({})//设备类型
  let dicCode = async () => {
    setSearchType(await fetchDicTypeSelectObj(CODE.DEVICE_TYPE))
  }
  useEffect(() => {
    dicCode()
  }, [])
  const columns: ProColumns<any>[] = [
    // {
    //   dataIndex: 'index',
    //   valueType: 'indexBorder',
    //   width: "40px"
    // },
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
      }
    },
    {
      title: "设备品牌",
      dataIndex: 'brandName',
      hideInSearch: true,
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
      title: "设备编号",
      dataIndex: 'no'
    },
    {
      title: "设备类型",
      dataIndex: 'typeName',
      hideInSearch: true
    },
    {
      title: "设备类型",
      dataIndex: 'type',
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        ...searchType
      },
    },
    {
      title: "设备品牌",
      dataIndex: 'brand',
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'select',
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        const stateType = form.getFieldValue('type');
        return (
          < SearchSelect
            { ...rest }
            state={ {
              type: stateType,
            } }
          />
        );
      },
    },
    {
      title: "设备品牌",
      dataIndex: 'modelName',
      hideInSearch: true,
    },
    {
      title: "设备型号",
      dataIndex: 'model',
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'select',
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        const stateType = form.getFieldValue('brand');
        return (
          <SearchSelect
            { ...rest }
            state={ {
              type: stateType,
            } }
          />
        );
      },
    },
    {
      title: "创建人",
      dataIndex: 'createUsername',
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: "创建时间",
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
          key="edit"
          type="link"
          size="small"
          onClick={ () => { fetchUserEdit(record) } }
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="是否要删除此行？"
          onConfirm={ () => { record.id !== undefined && tiggerDelete(record.id?.toString()); } }>
          <Button size="small" type="link" >删除</Button>
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
  const fetchUserEdit = async (record: DeviceListDataType) => {
    await setCurrentRow(record);
    handleModalVisible(true);
  }
  const fetchQueryList = async (params: any) => {
    const response = await queryDeviceList(params)
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
          searchType={ searchType }
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
            title={ "设备信息" }
            key={ currentRow?.id }
            request={ async () => ({
              data: currentRow || {},
            }) }
            params={ {
              id: currentRow?.id,
            } }
            columns={ columnsDrawer as ProDescriptionsItemProps<DeviceListDataType>[] }
          />
        ) }
      </Drawer>
    </PageContainer>
  );
};

export default DictionaryList;
