import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Select, Form, Input, Row, Col, message, DatePicker, Upload } from 'antd';
import React, { FC, useState } from 'react';
import { BaseInfoDataType } from './API.d'
interface TableFormProps {
  value?: BaseInfoDataType[];
  onChange?: (value: BaseInfoDataType[]) => void;
}
function beforeUpload (file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
const colProps = { xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 8 };
function getBase64 (img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const BasicInfoForm: FC<TableFormProps> = ({ value, onChange }) => {
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ imageUrl, setImageUrl ] = useState('');
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined /> }
      <div style={ { marginTop: 8 } }>上传头像</div>
    </div>
  );
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl)
        setLoading(false)
        return
      })
    }
  };
  return (
    <Row gutter={ 10 }>
      <Col { ...colProps }>
        <Form.Item
          label='名称'
          name="name"
          rules={ [ { required: true, message: '请输入名称' } ] }
        >
          <Input placeholder="请输入名称" />
        </Form.Item>
      </Col>
      <Col { ...colProps }>
        <Form.Item
          label='性别'
          name="sex"
          rules={ [ { required: true, message: '请选择性别' } ] }
        >
          <Select placeholder="请选择管理员">
            <Select.Option value="男">男</Select.Option>
            <Select.Option value="女">女</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col { ...colProps }>
        <Form.Item
          label='籍贯'
          name="nativePlace"
          rules={ [ { required: true, message: '请输入籍贯' } ] }
        >
          <Input placeholder="请输入籍贯" />
        </Form.Item>
      </Col>
      <Col { ...colProps }>
        <Form.Item
          label='民族'
          name="ethnic"
          rules={ [ { required: true, message: '请输入民族' } ] }
        >
          <Input placeholder="请输入民族" />
        </Form.Item>
      </Col>
      <Col { ...colProps }>
        <Form.Item
          label='电子邮箱'
          name="email"
          rules={ [ { required: true, message: '请输入电子邮箱' } ] }
        >
          <Input placeholder="请输入电子邮箱" />
        </Form.Item>
      </Col>
      <Col { ...colProps }>
        <Form.Item
          label='联系方式'
          name="phone"
          rules={ [ { required: true, message: '请输入联系方式' } ] }
        >
          <Input placeholder="请输入联系方式" />
        </Form.Item>
      </Col>
      <Col { ...colProps }>
        <Form.Item
          label='出生日期'
          name="dateBirth"
          rules={ [ { required: true, message: '请选择出生日期' } ] }
        >
          <DatePicker placeholder='请选择出生日期' style={ { width: '100%' } } />
        </Form.Item>
      </Col>
      <Col { ...colProps }>
        <Form.Item
          label='学历'
          name="education"
          rules={ [ { required: true, message: '请选择出生日期' } ] }
        >
          <DatePicker placeholder='请选择出生日期' style={ { width: '100%' } } />
        </Form.Item>
      </Col>
      <Col { ...colProps }>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={ false }
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={ beforeUpload }
          onChange={ handleChange }
        >
          { imageUrl ? <img src={ imageUrl } alt="avatar" style={ { width: '100%' } } /> : uploadButton }
        </Upload>
      </Col>
    </Row>
  );
};

export default BasicInfoForm;
