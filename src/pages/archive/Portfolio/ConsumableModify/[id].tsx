import React, { useState, useEffect } from 'react';
import BasicModifyForm from '../components/BasicModifyForm'
import { PageContainer } from '@ant-design/pro-layout';
import { infoProtfolio } from '../service'
import { match } from 'react-router'
import { Descriptions, Row, Col, Image, Card, Button } from 'antd'
import { PortfolioInfoDataType } from '../data.d'
import ConsumableList from '@/pages/device/Consumable/index'
import ModelConsumableAdd from '../components/ModelConsumableAdd'
import ModelConsumableList from '../components/ModelConsumableList'
import { queryProtfolioConsumableList } from '../service'
interface PortfolioEditProps {
  match: match
}
const DictionaryList: React.FC<PortfolioEditProps> = ({ match }) => {
  const [ currentRow, setCurrentRow ] = useState<PortfolioInfoDataType>()
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const [ dataConsumableList, setData ] = useState<any[]>([]);
  const portfolioId = match.params.id
  useEffect(() => {
    infoProtfolio(portfolioId).then(res => {
      if (!res) return;
      setCurrentRow(res.data)
    })
    queryConsumableList()
  }, [])

  const queryConsumableList = () => {
    queryProtfolioConsumableList(portfolioId).then(res => {
      if (!res) return
      setData(res.data)
    })
  }
  return (
    <PageContainer>
      <>
        <Card style={ { marginBottom: "20px" } } bordered={ false }>
          <Descriptions bordered size="small" title="档案信息"
            column={ { xs: 2, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 } }
            labelStyle={ { width: "80px", padding: "8px", } }
            style={ { marginBottom: "20px" } }
          >
            <Descriptions.Item label="档案ID" >{ currentRow?.id }</Descriptions.Item>
            <Descriptions.Item label="档案编号">{ currentRow?.no }</Descriptions.Item>
            <Descriptions.Item label="安装位置">{ currentRow?.installLocation }</Descriptions.Item>
            <Descriptions.Item label="安装时间">{ currentRow?.installTime }</Descriptions.Item>
            <Descriptions.Item label="保修周期">{ currentRow?.warrantyPeriod }</Descriptions.Item>
            <Descriptions.Item label="二维码code">{ currentRow?.qrCodde }</Descriptions.Item>
            <Descriptions.Item label="创建人">{ currentRow?.createUsername }</Descriptions.Item>
            <Descriptions.Item label="创建时间">{ currentRow?.createTime }</Descriptions.Item>
            <Descriptions.Item label="修改人">{ currentRow?.updateUsername }</Descriptions.Item>
          </Descriptions>
          <Descriptions bordered size="small" title="设备信息"
            column={ { xs: 2, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 } }
            labelStyle={ { width: "80px", padding: "8px" } }
            style={ { marginBottom: "20px" } }
          >
            <Descriptions.Item label="设备ID" >{ currentRow?.deviceId }</Descriptions.Item>
            <Descriptions.Item label="设备编号" >{ currentRow?.deviceNo }</Descriptions.Item>
            <Descriptions.Item label="设备名称">{ currentRow?.deviceName }</Descriptions.Item>
            <Descriptions.Item label="设备类型">{ currentRow?.typeName }</Descriptions.Item>
            <Descriptions.Item label="设备品牌">{ currentRow?.brandName }</Descriptions.Item>
            <Descriptions.Item label="设备型号">{ currentRow?.modelName }</Descriptions.Item>
            <Descriptions.Item label="设备图片">
              { currentRow?.imgUrls.length > 0 ?
                (
                  <Row gutter={ [ 16, 16 ] } >
                    { currentRow?.imgUrls.map((url: string) =>
                      <Col>
                        <Image
                          width="60px" height="60px"
                          src={ `${url}?x-oss-process=image/resize,h_100,w_100,m_lfit` }
                          preview={ { src: url } }
                        />
                      </Col>
                    ) }</Row>
                ) : "暂无图片"
              }
            </Descriptions.Item>
          </Descriptions>
          <Descriptions bordered size="small" title="公司信息"
            column={ { xs: 2, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 } }
            labelStyle={ { width: "80px", padding: "8px" } }
          >
            <Descriptions.Item label="单位ID" >{ currentRow?.companyId }</Descriptions.Item>
            <Descriptions.Item label="单位编号">{ currentRow?.companyNo }</Descriptions.Item>
            <Descriptions.Item label="单位名称">{ currentRow?.companyName }</Descriptions.Item>
          </Descriptions>
        </Card>
        {createModalVisible && (
          <ModelConsumableAdd
            createModalVisible={ createModalVisible }
            handleModalVisible={ handleModalVisible }
            portfolioId={ portfolioId }
          />
        ) }
        <Card title="耗材信息" extra={ <Button type="primary" onClick={ () => handleModalVisible(true) }>新增</Button> }>
          <ModelConsumableList
            queryConsumableList={ queryConsumableList }
            dataConsumableList={ dataConsumableList }
          />
        </Card>
      </>
    </PageContainer>
  );
};

export default DictionaryList;
