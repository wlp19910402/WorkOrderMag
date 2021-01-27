import { Button, Form, Card, Input, Row, Col, Descriptions, message, Image, } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { queryList } from '@/pages/workOrder/service';
import { OrderListType, orderStatusData, orderTypeMatchInfo } from '@/pages/workOrder/data.d';
import { IRouteComponentProps, history } from 'umi';
import { match } from 'react-router';
import PortfolioConsumableList from '@/pages/workOrder/components/PortfolioConsumableList'
import UploadImage from '@/components/Upload/index'
import { submitOrder } from '@/pages/workOrder/service'
interface WorkOrderFinishProps {
  matchRoute: match<{}>;
  orderType: string;
  routeProp: IRouteComponentProps,
}
const DictionaryList: React.FC<WorkOrderFinishProps> = ({ orderType = 'wx', matchRoute, routeProp }) => {
  const [ currentRow, setCurrentRow ] = useState<OrderListType>();
  const [ portfolioId, setPortfolioId ] = useState<React.Key>();
  const [ consumableUpdate, setConsumableUpdate ] = useState<any[]>([])
  const [ uploadImages, setUploadImages ] = useState<string[]>([])
  const fetchQueryCurrentOrderInfo = async () => {
    const response = await queryList({ current: 1, pageSize: 1, orderNo: matchRoute.params.no });
    if (!response) {
      setCurrentRow(undefined)
      return
    }
    if (response.data.records.length === 0) {
      setCurrentRow(undefined)
      message.error("当前工单不存在")
      return
    }
    let data = response.data.records[ 0 ]
    setCurrentRow(data)
    setPortfolioId(data.portfolioId)
  };
  useEffect(() => {
    fetchQueryCurrentOrderInfo();
    setUploadUrlImage();
  }, [])
  const [ form ] = Form.useForm();
  const onFinish = async (values: { [ key: string ]: any }) => {
    console.log(values)
    let params = {
      "consumables": consumableUpdate,
      "orderId": currentRow?.id,
      "subImgUrls": uploadImages.filter((item: any) => item !== ''),
      "subRemark": values.subRemark
    }
    let response = await submitOrder(params)
    if (!response) return
    let orderTypeInfo = orderTypeMatchInfo(orderType)
    message.success(`结单成功,即将跳转 "${orderTypeInfo?.label}列表" 页面`, 4)
    setTimeout(() => {
      if (orderTypeInfo) history.push(orderTypeInfo.listPath);
    }, 1000);
  }
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
    <PageContainer header={ { title: '' } }>
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
      <Form
        form={ form }
        onFinish={ onFinish }
      >
        <Card title="绑定档案信息信息" bordered={ false }>
          <Form.Item
            label='结单说明'
            name="subRemark"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item extra="外观图片（最多上传六张）带“删除”按钮" label="结单图片" valuePropName="checked">
            <Row gutter={ [ 16, 16 ] } >
              { uploadImages.map((item, index) => {
                return <Col key={ index }><UploadImage uploadId={ `uploadImagesId_${index}` } value={ item } onChange={ (url) => { setUploadUrlImage(url, index) } } /></Col>
              }) }
            </Row>
          </Form.Item>
        </Card>
        <FooterToolbar>
          <Button type="primary" onClick={ () => { form?.submit() } } loading={ false }>
            保存
        </Button>
        </FooterToolbar>
      </Form>
    </PageContainer>
  );
};

export default DictionaryList;
