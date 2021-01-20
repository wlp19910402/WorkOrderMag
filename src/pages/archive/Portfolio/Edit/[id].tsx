import React, { useState, useEffect } from 'react';
import BasicModifyForm from '../components/BasicModifyForm'
import { infoProtfolio } from '../service'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { match } from 'react-router'
interface PortfolioEditProps {
  match: match
}
const DictionaryList: React.FC<PortfolioEditProps> = ({ match }) => {
  const [ currentRow, setCurrentRow ] = useState<any>()
  useEffect(() => {
    infoProtfolio(match.params.id).then(res => {
      if (!res) return;
      setCurrentRow(res.data)
    })
  }, [])
  return (
    <PageContainer
      header={ {
        title: "",
        breadcrumb: {
          routes: [
            {
              path: '/',
              breadcrumbName: '首页',
            },
            {
              path: '/archive/portfolio/list',
              breadcrumbName: '设备档案管理',
            },
            {
              path: '/archive/portfolio/edit',
              breadcrumbName: '编辑',
            }
          ],
        }
      } }
    >
      { currentRow && <BasicModifyForm currentRow={ currentRow } /> }
    </PageContainer>
  );
};

export default DictionaryList;
