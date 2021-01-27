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
            path: '/workOrder/patrol',
            breadcrumbName: '巡检工单',
          },
          {
            path: '/workOrder/patrol/info',
            breadcrumbName: '详情',
          }
        ],
      }
    } } >
      <WorkOrderInfo orderType="xj" />
    </PageContainer>
  );
};

export default DictionaryList;