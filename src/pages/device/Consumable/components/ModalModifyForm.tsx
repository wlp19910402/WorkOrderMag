/**
 * 设备列表 编辑 和 新增
 */
import React from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { saveDevice } from '../service';
import type { DeviceSaveDataType } from '../../data.d';
import { message } from 'antd'

type ModalModifyFormDataProps = {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  currentRow: DeviceSaveDataType | undefined;
}
const ModalModifyForm: React.FC<ModalModifyFormDataProps> = (props) => {
  const { createModalVisible, handleModalVisible, actionRef, currentRow } = props
  const submitForm = async (value: DeviceSaveDataType) => {
    let params = value;
    if (currentRow?.id !== undefined) {
      params = { id: currentRow.id, ...params };
    }
    const response = await saveDevice({ ...value, id: currentRow?.id })
    if (!response) return
    actionRef.current && actionRef.current.reload();
    handleModalVisible(false);
    message.success(`${currentRow?.id !== undefined ? '修改' : '添加'}成功`);
  }
  return (
    <ModalForm
      modalProps={ {
        maskClosable: false
      } }
      title={ currentRow?.id !== undefined ? "设备编辑" : "设备新增" }
      width="400px"
      visible={ createModalVisible }
      onVisibleChange={ handleModalVisible }
      onFinish={ async (value: any) => {
        await submitForm(value)
      } }
      labelCol={ { span: 6 } }
      layout="horizontal"
    >
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入品牌！"
          },
        ] }
        label="品牌"
        name="brand"
        placeholder="请输入品牌"
        initialValue={ currentRow?.brand }
      />
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
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入设备编号！"
          },
        ] }
        label="设备编号"
        name="no"
        placeholder="请输入设备编号"
        initialValue={ currentRow?.no }
      />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入规格！"
          },
        ] }
        label="规格"
        name="specification"
        placeholder="请输入规格"
        initialValue={ currentRow?.specification }
      />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入设备类型！"
          },
        ] }
        label="设备类型"
        name="type"
        placeholder="请输入设备类型"
        initialValue={ currentRow?.type }
      />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入保修周期！"
          },
        ] }
        label="保修周期"
        name="warrantyPeriod"
        placeholder="请输入保修周期"
        initialValue={ currentRow?.warrantyPeriod }
      />
      <ProFormTextArea
        name="description"
        label="设备描述"
        placeholder="请输入设备描述"
        initialValue={ currentRow?.description }
      />
      {/* //图片 */ }
    </ModalForm>
  )
}

export default ModalModifyForm;