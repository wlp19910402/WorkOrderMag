/**
 * 设备列表 编辑 和 新增
 */
import React, { useState, useEffect } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import { saveDevice } from '../service';
import type { DeviceSaveDataType } from '../data.d';
import { message, Form, Row, Col } from 'antd'
import UploadImage from '@/components/Upload/index'

type ModalModifyFormDataProps = {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  currentRow: DeviceSaveDataType | undefined;
  dicCodeData: {
    searchType: any,
    searchBrand: any
  };
}
const ModalModifyForm: React.FC<ModalModifyFormDataProps> = (props) => {
  const { createModalVisible, handleModalVisible, actionRef, currentRow, dicCodeData } = props
  const [ uploadImages, setUploadImages ] = useState<string[]>(currentRow?.imgUrls ? currentRow?.imgUrls : [])
  const submitForm = async (value: DeviceSaveDataType) => {
    let params = currentRow?.id !== undefined ? { ...value, id: currentRow.id } : value;
    const response = await saveDevice({
      ...params,
      imgUrls: uploadImages.filter((item: any) => item !== '')
    })
    if (!response) return
    actionRef.current && actionRef.current.reload();
    handleModalVisible(false);
    message.success(`${currentRow?.id !== undefined ? '修改' : '添加'}成功`);
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
    setUploadUrlImage()
  }, [])
  return (
    <ModalForm
      modalProps={ {
        maskClosable: false
      } }
      title={ currentRow?.id !== undefined ? "设备编辑" : "设备新增" }
      width="600px"
      visible={ createModalVisible }
      onVisibleChange={ handleModalVisible }
      onFinish={ async (value: any) => {
        await submitForm(value)
      } }
      labelCol={ { span: 4 } }
      layout="horizontal"
    >
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入设备名称！"
          },
        ] }
        label="设备名称"
        name="name"
        placeholder="请输入设备名称"
        initialValue={ currentRow?.name }
      />
      <ProFormSelect
        name="type"
        rules={ [
          {
            required: true,
            message: "请选择设备类型！"
          },
        ] }
        label="设备类型"
        valueEnum={ { ...dicCodeData.searchType } }
        placeholder="请选择设备类型"
        initialValue={ currentRow?.type }
      />
      <ProFormSelect
        name="brand"
        label="品牌"
        rules={ [
          {
            required: true,
            message: "请选择品牌！"
          },
        ] }
        valueEnum={ { ...dicCodeData.searchBrand } }
        placeholder="请选择品牌"
        initialValue={ currentRow?.brand }
      />
      <ProFormSelect
        name="model"
        label="设备型号"
        rules={ [
          {
            required: true,
            message: "请选择设备型号！"
          },
        ] }
        valueEnum={ {
          // ...dicCodeData.searchSpecification
        } }
        placeholder="请选择设备型号"
        initialValue={ currentRow?.model }
      />
      <ProFormTextArea
        name="description"
        label="设备描述"
        placeholder="请输入设备描述"
        initialValue={ currentRow?.description }
      />
      {/* //图片 */ }
      <Form.Item extra="外观图片（最多上传六张）带“删除”按钮" name="imgUrls" label="图片上传" valuePropName="checked">
        <Row gutter={ [ 16, 16 ] } >
          { uploadImages.map((item, index) => {
            return <Col><UploadImage uploadId={ `uploadImagesId_${index}` } value={ item } onChange={ (url) => { setUploadUrlImage(url, index) } } /></Col>
          }) }
        </Row>
      </Form.Item>
    </ModalForm >
  )
}

export default ModalModifyForm;