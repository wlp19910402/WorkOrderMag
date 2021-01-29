import React, { useState, useEffect } from 'react';
import BasicModifyForm from '../components/BasicModifyForm'
import { infoProtfolio } from '../service'
import { PageContainer } from '@ant-design/pro-layout';
import { match } from 'react-router'
import { Spin } from 'antd'
import NullInfo from '@/components/common/NullInfo'
interface PortfolioEditProps {
  match: match
}
const DictionaryList: React.FC<PortfolioEditProps> = ({ match }) => {
  const [ currentRow, setCurrentRow ] = useState<any>()
  const [ loading, setLoading ] = useState<boolean>(true)
  const routeParams: any = match.params
  useEffect(() => {
    infoProtfolio(routeParams.id).then(res => {
      setLoading(false)
      if (!res) {
        setCurrentRow(undefined)
        return
      };
      setCurrentRow(res.data)
    }).catch(err => {
      setLoading(false)
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
      <Spin spinning={ loading }>
        { currentRow && <BasicModifyForm currentRow={ currentRow } /> }
        { !currentRow && <NullInfo /> }
      </Spin>
    </PageContainer>
  );
};

export default DictionaryList;
