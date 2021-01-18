import React, { useState, useEffect, } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { queryConsumableList } from '@/pages/device/Consumable/service';
import type { ConsumableListDataType } from '@/pages/device/Consumable/data.d';
import { fetchDicTypeSelectObj } from '@/pages/admin/Dictionary/service'
import CODE from '@/utils/DicCode.d'
import SearchSelect from '@/components/common/SerchSelect'


const ModelConsumableAdd: React.FC<ConsumableListDataType> = () => {
  const [ selectedRowsState, setSelectedRows ] = useState<ConsumableListDataType[]>([]);
  const [ searchType, setSearchType ] = useState<any>({})//设备类型
  let dicCode = async () => {
    setSearchType(await fetchDicTypeSelectObj(CODE.CONSUMABLE_TYPE))
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
  return (
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
    />
  );
};

export default ModelConsumableAdd;