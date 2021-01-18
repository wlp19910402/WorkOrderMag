
import { Image, Modal, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect, } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { queryConsumableList } from '@/pages/device/Consumable/service';
import type { ConsumableListDataType } from '@/pages/device/Consumable/data.d';
import { fetchDicTypeSelectObj } from '@/pages/admin/Dictionary/service'
import CODE from '@/utils/DicCode.d'
import { Link } from 'umi'
import SearchSelect from '@/components/common/SerchSelect'
type ModalModifyFormDataProps = {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  // actionRef: React.MutableRefObject<ActionType | undefined>;
  // currentRow: ConsumableSaveDataType | undefined;
  // searchType: any
}
const ModelConsumableAdd: React.FC<ModalModifyFormDataProps> = ({ createModalVisible = false, handleModalVisible }) => {
  const actionRef = useRef<ActionType>();
  const [ selectedRowsState, setSelectedRows ] = useState<ConsumableListDataType[]>([]);
  const [ searchType, setSearchType ] = useState<any>({})//设备类型
  let dicCode = async () => {
    setSearchType(await fetchDicTypeSelectObj(CODE.CONSUMABLE_TYPE))
  }
  useEffect(() => {
    dicCode()
  }, [])
  const tiggerModelDelete = (id: number | string) => {
    console.log(id)
  }
  const columns: ProColumns<any>[] = [
    {
      title: "id",
      dataIndex: 'id',
      hideInSearch: true
    },
    {
      title: "耗材名称",
      dataIndex: 'name',
    },
    // {
    //   title: "图片",
    //   dataIndex: 'imgUrls',
    //   hideInSearch: true,
    //   render: (val: any) => {
    //     return val && val.length > 0 ?
    //       (
    //         <Image
    //           width="60px" height="60px"
    //           src={ `${val[ 0 ]}?x-oss-process=image/resize,h_100,w_100,m_lfit` }
    //           preview={ { src: val[ 0 ] } }
    //         />
    //       ) : (
    //         <Image
    //           width="60px"
    //           height="60px"
    //           src={ ImgNull }
    //           preview={ false }
    //         ></Image >
    //       )
    //   }
    // },
    {
      title: "耗材编号",
      dataIndex: 'no',
      hideInSearch: true
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
      filters: true,
      onFilter: true,
      valueEnum: {
        ...searchType
      },
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
      title: "操作",
      valueType: 'option',
      width: "120px",
      render: (_, record) => [
        <a onClick={ () => {
          selectRecord(record)
        } }>添加</a>
      ],
    },
  ];

  const columnsForm: ProColumns<any>[] = [
    {
      title: "档案ID",
      dataIndex: 'portfolioId',
      hideInSearch: true
    },
    {
      title: "耗材ID",
      dataIndex: 'consumableId',
      hideInSearch: true
    },
    {
      title: "耗材名称",
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: "到期时间",
      dataIndex: 'expirationTime',
      hideInSearch: true
    },
    {
      title: "更换周期",
      dataIndex: 'replacementCycle',
      hideInSearch: true
    },
    {
      title: "实际更换时间",
      dataIndex: 'replacementTime',
      hideInSearch: true
    },
    {
      title: "数量",
      dataIndex: 'num',
      hideInSearch: true
    },
    {
      title: "操作",
      valueType: 'option',
      width: "120px",
      render: (_, record) => [
        <Popconfirm
          title="是否要删除此行？"
          onConfirm={ () => { record.id !== undefined && tiggerModelDelete(record.id?.toString()); } }>
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];
  const selectRecord = (record: any) => {
    let data = selectedRowsState;
    data.push(record);
    setSelectedRows(data);
  }
  const fetchQueryList = async (params: any) => {
    const response = await queryConsumableList(params)
    if (!response) return
    const { data } = response;
    return ({ ...data, data: data.records })
  }
  const handleOk = () => {
    // setIsModalVisible(false);
  };
  return (
    <Modal title="添加耗材"
      width="800px"
      visible={ createModalVisible }
      onCancel={ () => handleModalVisible(false) }
      onOk={ handleOk }>
      {JSON.stringify(selectedRowsState) }
      <ProTable
        tableStyle={ { maxHeight: "200px", overflow: "auto" } }
        headerTitle="查询表格"
        rowKey="id"
        search={ {
          labelWidth: 80,
        } }
        pagination={ {
          pageSize: 10
        } }
        request={ async (params, sorter, filter) => await fetchQueryList({ ...params, ...filter }) }
        columns={ columns }
      // rowSelection={ {
      //   onChange: (_, selectedRows: any) => setSelectedRows(selectedRows),
      // } }
      />

    </Modal>
  );
};

export default ModelConsumableAdd;