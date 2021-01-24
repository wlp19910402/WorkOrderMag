import { Card, Form, Button, Row, Radio, Col, Input, message } from 'antd';
import React, { useState, useEffect } from 'react';
import type { PortfolioSaveDataType } from '@/pages/archive/portfolio/data.d';
import { saveProtfolio } from '@/pages/archive/portfolio/service'
import UploadImage from '@/components/Upload/index'
import ModelBindProtolioAdd from '@/pages/workOrder/AddOrder/components/ModelBindProtolioAdd'
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
interface OrderTypeType {
  company: string;
  customerMobile: string;
  customerName: string;
  imgUrls: string[];
  orderType: "az" | "wx" | "xj" | "jd";
  portfolioId: number;//档案id
  workDescription: string;
}
const DictionaryList: React.FC<{}> = () => {
  const [ uploadImages, setUploadImages ] = useState<string[]>([])
  const [ form ] = Form.useForm();
  const [ createModalVisible, handleModalVisible ] = useState<boolean>(false);
  const [ protolioInfo, setProtolioInfo ] = useState<any>({})
  const onFinish = async (values: { [ key: string ]: any }) => {
    setUploadUrlImage()
    let params: OrderTypeType = {
      company: values?.company,
      customerMobile: values?.customerMobile,
      customerName: values?.customerName,
      orderType: values?.orderType,
      portfolioId: values?.portfolioId,
      workDescription: values?.workDescription,
      imgUrls: uploadImages.filter((item: any) => item !== '')
    }
    console.log(params)
    // let response = await saveProtfolio(params)
    // if (!response) { return }
    // message.success("保存成功")
    // history.replace('/archive/portfolio/list');
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
  useEffect(() => {
    setUploadUrlImage();
  }, [])
  const bindProtolioInfo = (record: any) => {
    setProtolioInfo(record);
    form.setFieldsValue({ portfolioId: record.id, company: record.companyName })
  }
  const inputChangeCompany = (event: any) => {
    if (event.data !== protolioInfo) {
      form.setFieldsValue({ portfolioId: "" })
      setProtolioInfo({})
    }
  }
  return (
    <Card bordered={ false } >
      <Form
        form={ form }
        onFinish={ onFinish }
        title="接单信息"
        { ...layout }
      >
        <div style={ { width: "480px", margin: "0 auto" } }>
          <Form.Item
            rules={ [ { required: true } ] }
            label="工单类型"
            initialValue="az"
          >
            <Radio.Group defaultValue="az">
              <Radio.Button value="az">安装工单</Radio.Button>
              <Radio.Button value="wx">维修工单</Radio.Button>
              <Radio.Button value="xj">巡检工单</Radio.Button>
              <Radio.Button value="jd">建档工单</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label='客户姓名'
            name="customerName"
            rules={ [ { required: true, message: "请输入客户姓名！" } ] }
          >
            <Input placeholder="请输入客户姓名" />
          </Form.Item>
          <Form.Item
            label='客户电话'
            name="customerMobile"
            rules={ [ { required: true, message: "请输入客户电话！" } ] }
          >
            <Input placeholder="请输入客户电话" />
          </Form.Item>
          <Form.Item
            label='报单单位'
            name="company"
            rules={ [ { required: true, message: "请输入报单单位！" } ] }

          >
            <Input onChange={ (event) => { inputChangeCompany(event.nativeEvent) } } placeholder="请输入报单单位" addonAfter={ <a onClick={ () => handleModalVisible(true) }>或去绑定档案</a> } />
          </Form.Item>
          { protolioInfo.id !== undefined && <>
            <Form.Item
              label='档案id'
              name="portfolioId"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item label='档案二维码'>
              <Input disabled value={ protolioInfo.qrCodde } />
            </Form.Item>
            <Form.Item
              label='安装位置'
            >
              <Input disabled value={ protolioInfo.installLocation } />
            </Form.Item>
          </> }
          <Form.Item
            label='工单描述'
            name="workDescription"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item extra="外观图片（最多上传六张）带“删除”按钮" name="imgUrls" label="图片上传" valuePropName="checked">
            <Row gutter={ [ 16, 16 ] } >
              { uploadImages.map((item, index) => {
                return <Col key={ index }><UploadImage uploadId={ `uploadImagesId_${index}` } value={ item } onChange={ (url) => { setUploadUrlImage(url, index) } } /></Col>
              }) }
            </Row>
          </Form.Item>
          <Form.Item wrapperCol={ { offset: 6, span: 18 } }>
            <Button type="default" onClick={ () => { form.resetFields(); setProtolioInfo({}); } }>重置</Button>
            <Button type="primary" onClick={ () => { form?.submit() } } loading={ false }>
              保存
            </Button>
          </Form.Item>
        </div>
        { createModalVisible && (
          <ModelBindProtolioAdd
            createModalVisible={ createModalVisible }
            handleModalVisible={ handleModalVisible }
            companyName={ form.getFieldValue("company") }
            bindProtolioInfo={ bindProtolioInfo }
          />
        ) }
      </Form >
    </Card >
  );
};

export default DictionaryList;