import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import WorkOrderInfo from '@/pages/workOrder/components/WorkOrderInfo'

const DictionaryList: React.FC<{}> = () => {
  return (
    <PageContainer header={ {
      title: "",
      breadcrumb: {
        routes: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '/workOrder/install',
            breadcrumbName: '安装工单',
          },
          {
            path: '/workOrder/install/info',
            breadcrumbName: '详情',
          }
        ],
      }
    } } >
      <WorkOrderInfo orderType="az" />
    </PageContainer>
  );
};

export default DictionaryList;