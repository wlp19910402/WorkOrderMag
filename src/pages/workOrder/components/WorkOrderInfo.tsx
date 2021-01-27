import { Card, Input, Row, Col, Descriptions, Image, } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { infoOrder } from '@/pages/workOrder/service';
import { OrderListType, orderStatusData, orderTypeMatchInfo } from '@/pages/workOrder/data.d';
import { match } from 'react-router';
import PortfolioConsumableList from '@/pages/workOrder/components/PortfolioConsumableList'
import UploadImage from '@/components/Upload/index'
interface WorkOrderFinishProps {
  matchRoute: match<{}>;
  orderType: string;
}
const DictionaryList: React.FC<WorkOrderFinishProps> = ({ orderType = 'wx', matchRoute }) => {
  const [ currentRow, setCurrentRow ] = useState<OrderListType>();
  const [ portfolioId, setPortfolioId ] = useState<React.Key>();
  const [ consumableUpdate, setConsumableUpdate ] = useState<any[]>([])
  const [ uploadImages, setUploadImages ] = useState<string[]>([])
  const fetchQueryCurrentOrderInfo = async () => {
    let routeParams: any = matchRoute.params
    const response = await infoOrder(routeParams.id);
    if (!response) {
      setCurrentRow(undefined)
      return
    }
    let data = response.data
    setCurrentRow(data)
    setPortfolioId(data.portfolioId)
  };
  useEffect(() => {
    fetchQueryCurrentOrderInfo();
    setUploadUrlImage();
  }, [])
  const setUploadUrlImage = async (url?: string, index?: number) => {
    let tmp = uploadImages
    if (url !== '' && !url) {
      tmp = tmp.filter((item: any) => item !== '');
      if (tmp.length < 6) {
        tmp.push("")
      }
    } else {
      tmp = tmp.map((item: any, idx: number) => {
        return idx === index ? url : item
      }).filter((item: any) => item !== '');
      if (tmp.length < 6) {
        tmp.push("")
      }
    }
    await setUploadImages([])
    setUploadImages(tmp)
  }
  return (
    <>
      <Card title="工单信息" style={ { marginBottom: "20px" } } bordered={ false }>
        <Descriptions bordered size="small"
          column={ { xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 } }
          labelStyle={ { width: "120px", padding: "8px" } }
        >
          <Descriptions.Item label="工单编号" >{ currentRow?.orderNo }</Descriptions.Item>
          <Descriptions.Item label="单位名称">{ currentRow?.company }</Descriptions.Item>
          <Descriptions.Item label="工程师姓名">{ currentRow?.engineerName }</Descriptions.Item>
          <Descriptions.Item label="支持人员">{ currentRow?.supporterNames }</Descriptions.Item>
          <Descriptions.Item label="工单状态">{ orderStatusData.find(item => item.value === currentRow?.status)?.label }</Descriptions.Item>
          <Descriptions.Item label="工单描述">{ currentRow?.workDescription }</Descriptions.Item>
          <Descriptions.Item label="工单来源">{ currentRow?.sourceType }</Descriptions.Item>
          <Descriptions.Item label="工单类型">{ orderTypeMatchInfo(currentRow?.orderType)?.label }</Descriptions.Item>
          <Descriptions.Item label="设备名称">{ currentRow?.deviceName }</Descriptions.Item>
          {/* <Descriptions.Item label="设备类型">{ currentRow?.deviceTypeName }</Descriptions.Item> */ }
          <Descriptions.Item label="是否绑定档案">{ currentRow?.portfolioId !== "" ? "已绑定" : "未绑定" }</Descriptions.Item>
          <Descriptions.Item label="工单图片">
            { currentRow?.orderImgUrls && currentRow?.orderImgUrls.length > 0 ?
              (
                <Row gutter={ [ 16, 16 ] } >
                  { currentRow?.orderImgUrls.map((url: string, index: number) =>
                    <Col key={ index }>
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
      </Card>
      { portfolioId !== undefined && portfolioId !== "" &&
        <Card title="耗材信息" style={ { marginBottom: "20px" } } bordered={ false }>
          <PortfolioConsumableList
            portfolioId={ portfolioId }
            setConsumableUpdate={ setConsumableUpdate }
            consumableUpdate={ consumableUpdate }
          />
        </Card>
      }

      <Card title="绑定档案信息信息" bordered={ false }>

      </Card>
    </>
  );
};

export default DictionaryList;
