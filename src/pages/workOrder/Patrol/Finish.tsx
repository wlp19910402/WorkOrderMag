import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import WorkOrderFinish from '@/pages/workOrder/components/WorkOrderFinish'

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
            path: '/workOrder/patrol/finish',
            breadcrumbName: '结单',
          }
        ],
      }
    } } >
      <WorkOrderFinish orderType="xj" />
    </PageContainer>
  );
};

export default DictionaryList;