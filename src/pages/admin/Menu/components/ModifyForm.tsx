/**
 * 用户列表 编辑 和 新增
 */
import React from 'react';
import { Button, Row, Col, Form, Input, Radio } from 'antd'
import { MenuDataType, TypeFormType, menuDefault } from '../data.d';
import { Dispatch } from 'umi'

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 16 },
  },
};
interface ModifyFormDataProps {
  typeFormType: TypeFormType;
  currentRow: MenuDataType;
  flatMenuData: MenuDataType[];
  setTypeFormType: React.Dispatch<React.SetStateAction<TypeFormType>>;
  dispatch: Dispatch;
  editDisable: boolean | undefined;
  setParentRow: React.Dispatch<React.SetStateAction<MenuDataType | undefined>>;
}
const ModifyForm: React.FC<ModifyFormDataProps> = (props) => {
  const { typeFormType, currentRow = menuDefault, flatMenuData, setTypeFormType, dispatch, editDisable = true, setParentRow } = props
  const [ form ] = Form.useForm();
  const onFinish = async (value: any) => {
    await dispatch({
      type: 'menu/saveMenu',
      payload: value,
      callback: (res) => {
        console.log(res)
        setParentRow(undefined)
      }
    })
  }
  return (
    <Form
      { ...formItemLayout }
      form={ form }
      layout="vertical"
      initialValues={ { typeFormType } }
      onFinish={ onFinish }
    >
      <Form.Item name="parentId" hidden initialValue={ currentRow.parentId || 0 } />
      {currentRow.id ? <Form.Item name="id" hidden initialValue={ currentRow.id } /> : "" }
      <Form.Item style={ { flexDirection: "unset" } } label="类型：" name="type" initialValue={ currentRow.type }>
        <Radio.Group onChange={ (e) => { setTypeFormType(e.target.value) } } disabled={ editDisable }>
          <Radio.Button value={ 0 }>目录</Radio.Button>
          <Radio.Button value={ 1 }>菜单</Radio.Button>
          <Radio.Button value={ 2 }>按钮</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item style={ { flexDirection: "unset" } } label="名称：" initialValue={ currentRow.name } name="name" required>
        <Input disabled={ editDisable } placeholder="请输入名称" />
      </Form.Item>
      <Form.Item style={ { flexDirection: "unset" } } label="上级菜单：">
        <Input disabled value={ flatMenuData?.find(item => item.id === currentRow.parentId)?.name } />
      </Form.Item>
      {typeFormType === 0 && <Form.Item hidden initialValue={ currentRow.url } name="url" /> }
      {
        typeFormType === 1 && <>
          <Form.Item style={ { flexDirection: "unset" } } initialValue={ currentRow.url } label="菜单地址：" name="url" >
            <Input placeholder="请输入菜单地址" disabled={ editDisable } />
          </Form.Item>
          <Form.Item style={ { flexDirection: "unset" } } label="授权标识：" initialValue={ currentRow.perms } name="perms" >
            <Input placeholder="请输入授权标识" disabled={ editDisable } />
          </Form.Item>
        </>
      }
      {
        (typeFormType === 1 || typeFormType === 0) && <>
          <Form.Item style={ { flexDirection: "unset" } } label="排序号：" initialValue={ currentRow.orderNum || 1 } name="orderNum" >
            <Input type="number" disabled={ editDisable } />
          </Form.Item>
          <Form.Item style={ { flexDirection: "unset" } } label="图标：" initialValue={ currentRow.icon } name="icon">
            <Input placeholder="请输入图标" disabled={ editDisable } />
          </Form.Item>
        </>
      }
      {
        typeFormType === 2 && <>
          <Form.Item style={ { flexDirection: "unset" } } label="授权标识：" name="perms" >
            <Input placeholder="请输入授权标识" disabled={ editDisable } />
          </Form.Item>
        </>
      }
      {!editDisable && currentRow.id !== 0 &&
        <Form.Item style={ { flexDirection: "unset" } } label=" ">
          <Row>
            <Col span={ 6 }><Button type="default" onClick={ () => form.resetFields() }>取消</Button></Col>
            <Col span={ 6 } offset={ 1 }><Button type="primary" htmlType="submit">提交</Button>
            </Col>
          </Row>
        </Form.Item>
      }
    </Form >
  )
}

export default ModifyForm;
