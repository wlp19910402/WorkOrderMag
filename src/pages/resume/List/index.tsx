import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Avatar, Switch } from 'antd';
import React, { useState, useRef } from 'react';
import { Link, history } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions, { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { queryRule } from './service';
import { ResumeDataType } from '../API.d';
import DetailSkillMaster from '../components/detail/DetailSkillMaster'
import DetailWorkExp from '../components/detail/DetailWorkExp'
import DetailProjectExp from '../components/detail/DetailProjectExp'

/**
 *  删除节点
 * @param selectedRows
 */
// const handleRemove = async (selectedRows: ResumeDataType[]) => {
//   const hide = message.loading('正在删除');
//   if (!selectedRows) return true;
//   try {
//     await removeRule({
//       key: selectedRows.map((row) => row.key),
//     });
//     hide;
//     message.success('删除成功，即将刷新');
//     return true;
//   } catch (error) {
//     hide;
//     message.error('删除失败，请重试');
//     return false;
//   }
// };

const hideTable = {
  dataIndex: 'baseInfo',
  hideInSearch: true,
  hideInTable: true,
  hideInForm: true,
}
const ResumeList: React.FC<{}> = () => {
  const [ showDetail, setShowDetail ] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [ currentRow, setCurrentRow ] = useState<ResumeDataType>();
  const [ selectedRowsState, setSelectedRows ] = useState<ResumeDataType[]>([]);
  const columns: ProColumns<ResumeDataType>[] = [
    {
      title: "头像",
      dataIndex: 'baseInfo',
      hideInSearch: true,
      hideInTable: false,
      render: (dom) => {
        return (
          <Avatar shape="square" size="large" src={ dom.headerImgUrl } />
        )
      }
    },
    {
      title: "id",
      dataIndex: 'id',
      sorter: true,
      valueType: 'textarea',
      renderText: ((val) => `${val}`)
    },
    {
      title: "姓名",
      dataIndex: 'baseInfo',
      tip: '规则名称是唯一的 key',
      render: (val, entity) => {
        return (
          <a
            onClick={ () => {
              setCurrentRow(entity);
              setShowDetail(true);
            } }
          >
            {`${val.name}` }
          </a>
        );
      },
    },
    {
      title: "求职意向",
      dataIndex: 'baseInfo',
      valueType: 'textarea',
      renderText: ((val) => `${val.jobIntention}`)
    },
    {
      title: "期望薪资",
      dataIndex: 'baseInfo',
      valueType: 'textarea',
      renderText: ((val) => `${val.salaryExpectation}`)
    },
    {
      title: "工作年限",
      dataIndex: 'baseInfo',
      valueType: 'textarea',
      renderText: ((val) => `${val.yearsWork}`)
    },
    {
      title: "学历",
      dataIndex: 'baseInfo',
      hideInForm: true,
      renderText: ((val) => `${val.education}`)
    },

    {
      title: "性别",
      ...hideTable,
      renderText: ((val) => `${val.sex}`)
    },
    {
      title: "籍贯",
      ...hideTable,
      renderText: ((val) => `${val.nativePlace}`)
    },
    {
      title: "现居住地",
      ...hideTable,
      renderText: ((val) => `${val.residencePlace}`)
    },
    {
      title: "民族",
      ...hideTable,
      renderText: ((val) => `${val.ethnic}`)
    },
    {
      title: "电子邮箱",
      ...hideTable,
      renderText: ((val) => `${val.email}`)
    },
    {
      title: "手机号",
      ...hideTable,
      renderText: ((val) => `${val.phone}`)
    },
    {
      title: "出生日期",
      ...hideTable,
      renderText: ((val) => `${val.dateBirth}`)
    },
    {
      title: "状态",
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: "未发布",
          status: 'Default',
        },
        1: {
          text: "已发布",
          status: 'Success',
        },
        2: {
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
      render: (val => { return (<Switch checkedChildren='发布' unCheckedChildren="关闭" defaultChecked={ val === '1' } />) })
    },
    {
      title: "技能掌握",
      dataIndex: 'skillMaster',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
      render: (dom) => {
        return (<DetailSkillMaster value={ dom } />)
      }
    },
    {
      title: "工作经验",
      dataIndex: 'workExperience',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
      render: (dom) => {
        return <DetailWorkExp value={ dom } />
      }
    },
    {
      title: "项目经验",
      dataIndex: 'workExperience',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
      render: (dom) => {
        return <DetailProjectExp value={ dom } />
      }
    },

    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Link
          to={ `/resume/edit/1` }
        >
          编辑
        </Link>,
        <Link to={ `/resume/detail/1` }>
          详情
        </Link>,
        <a onClick={ () => { console.log(record.id) } }>删除</a>
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<ResumeDataType>
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
          <Button type="primary" key="primary" onClick={ () => history.push('/resume/create') }>
            <PlusOutlined />新建
          </Button>,
        ] }
        request={ (params, sorter, filter) => { console.log("params", params); return queryRule({ ...params, sorter, filter }) } }
        columns={ columns }
        rowSelection={ {
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        } }
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{ ' ' }<a style={ { fontWeight: 600 } }>{ selectedRowsState.length }</a>{ ' ' }
              项
            </div>
          }
        >
          {/* <Button
            onClick={ async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            } }
          >
            批量删除
          </Button> */}
          <Button type="primary">
            批量审批
          </Button>
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
        { currentRow?.baseInfo.name && (
          <ProDescriptions<ResumeDataType>
            column={ 1 }
            title={ currentRow?.baseInfo.name }
            request={ async () => ({
              data: currentRow || {},
            }) }
            params={ {
              id: currentRow?.id,
            } }
            columns={ columns as ProDescriptionsItemProps<ResumeDataType>[] }
          />
        ) }
      </Drawer>
    </PageContainer>
  );
};

export default ResumeList;
