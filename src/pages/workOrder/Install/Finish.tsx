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
            path: '/workOrder/install',
            breadcrumbName: '安装工单',
          },
          {
            path: '/workOrder/install/finish',
            breadcrumbName: '结单',
          }
        ],
      }
    } } >
      <WorkOrderFinish orderType="az" />
    </PageContainer>
  );
};

export default DictionaryList;