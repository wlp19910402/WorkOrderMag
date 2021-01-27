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
            path: '/workOrder/maintain',
            breadcrumbName: '维修工单',
          },
          {
            path: '/workOrder/maintain/finish',
            breadcrumbName: '结单',
          }
        ],
      }
    } } >
      <WorkOrderFinish orderType="wx" />
    </PageContainer>
  );
};

export default DictionaryList;