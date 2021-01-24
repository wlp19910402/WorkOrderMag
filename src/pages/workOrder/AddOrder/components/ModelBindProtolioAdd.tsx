import { ConsumableAddDataType } from '@/pages/archive/portfolio/data.d'
import { Drawer, message, Image, Row, Col, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { queryProtfolioList } from '@/pages/archive/portfolio/service';
import type { PortfolioListDataType } from '@/pages/archive/portfolio/data';
import ImgNull from '@/assets/images/images-null.png';
import { fetchDicTypeSelectObj } from '@/pages/admin/Dictionary/service'
import CODE from '@/utils/DicCode.d'
import SearchSelect from '@/components/common/SerchSelect'
import { pickerDateFormat } from '@/utils/parameter'
export type ColumnEditConsumableType = {
  consumableName: string;
  consumableNo: string;
  consumableTypeName: string;
  consumableModelName: string;
} & ConsumableAddDataType

type ModalModifyFormDataProps = {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  companyName: string;
  bindProtolioInfo: (val: any) => void
}
const ModelConsumableAdd: React.FC<ModalModifyFormDataProps> = ({ createModalVisible = false, handleModalVisible, companyName, bindProtolioInfo }) => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<PortfolioListDataType>();
  const [ searchType, setSearchType ] = useState<any>({})//设备类型
  let dicCode = async () => {
    setSearchType(await fetchDicTypeSelectObj(CODE.DEVICE_TYPE))
  }
  useEffect(() => {
    dicCode()
  }, [])
  const columns: ProColumns<any>[] = [
    {
      title: "档案编号",
      dataIndex: 'no',
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
      title: "单位名称",
      dataIndex: 'companyName',
      ellipsis: true
    },
    {
      title: "单位编号",
      dataIndex: 'companyNo',
      hideInSearch: true,
    },
    {
      title: "单位联系人",
      dataIndex: 'contactUser',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: "单位联系电话",
      dataIndex: 'contactMobile',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: "二维码code",
      dataIndex: 'qrCodde',
      ellipsis: true
    },
    {
      title: "设备名称",
      dataIndex: 'deviceName',
    },
    {
      title: "设备编号",
      dataIndex: 'deviceNo',
      hideInSearch: true
    },
    {
      title: "设备图片",
      dataIndex: 'imgUrls',
      hideInSearch: true,
      hideInTable: true,
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
      title: "设备品牌",
      dataIndex: 'brandName',
      hideInSearch: true,
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
      title: "设备型号",
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
      title: "安装位置",
      dataIndex: 'installLocation',
      hideInSearch: true,
      hideInTable: true,
      ellipsis: true
    },
    {
      title: "安装日期",
      dataIndex: 'installTime',
      hideInSearch: true,
      hideInTable: true,
      render: (val: any) => pickerDateFormat(val)
    },
    {
      title: "设备描述",
      dataIndex: 'description',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: "创建人",
      dataIndex: 'createUsername',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true
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
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: "修改时间",
      dataIndex: 'updateTime',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: "操作",
      valueType: 'option',
      width: "48px",
      render: (_, record) => [
        <a key="add" onClick={ () => { bindProtolioInfo(record); handleModalVisible(false); } }>添加</a>
      ],
    },
  ];
  const columnsDrawer = [
    ...columns.filter(item => item.dataIndex !== 'imgUrls'),
    {
      title: "设备图片",
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
    } ]
  const fetchQueryList = async (params: any) => {
    const response = await queryProtfolioList(params)
    if (!response) return
    const { data } = response;
    return ({ ...data, data: data.records })
  }
  return (
    <>
      <Modal
        title="绑定档案"
        width="800px"
        visible={ createModalVisible }
        footer={ null }
        bodyStyle={ { padding: "0 " } }
        onCancel={ () => handleModalVisible(false) }
      >
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
          size="small"
          request={ async (params, sorter, filter) => await fetchQueryList({ ...params, ...filter }) }
          columns={ columns }
          scroll={ { y: 300 } }
        />
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
            <ProDescriptions<PortfolioListDataType>
              column={ 1 }
              title={ currentRow?.name }
              key={ currentRow?.id }
              request={ async () => ({
                data: currentRow || {},
              }) }
              params={ {
                id: currentRow?.id,
              } }
              columns={ columnsDrawer as ProDescriptionsItemProps<PortfolioListDataType>[] }
            />
          ) }
        </Drawer>
      </Modal>
    </>
  );
};

export default ModelConsumableAdd