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
            path: '/workOrder/maintain',
            breadcrumbName: '维修工单',
          },
          {
            path: '/workOrder/maintain/info',
            breadcrumbName: '详情',
          }
        ],
      }
    } } >
      <WorkOrderInfo orderType="wx" />
    </PageContainer>
  );
};

export default DictionaryList;