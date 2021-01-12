/**
 * 字典列表 编辑 和 新增
 */
import React from 'react';
import { ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { saveDictionary } from '../service';
import { DictionaryDataType } from '../../data.d';
import { message } from 'antd'
interface ModalModifyFormDataProps {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  currentRow: DictionaryDataType | undefined;
}
const ModalModifyForm: React.FC<ModalModifyFormDataProps> = (props) => {
  const { createModalVisible, handleModalVisible, actionRef, currentRow } = props
  const submitForm = async (value: DictionaryDataType) => {
    let params = value;
    if (currentRow?.id !== undefined) {
      params = { id: currentRow.id, ...params };
    }
    let res = await saveDictionary({ ...value, id: currentRow?.id })
    if (res.code === 0) {
      if (actionRef.current) {
        actionRef.current.reload();
      }
      message.success(`${currentRow?.id != undefined ? '修改' : '添加'}成功`);
    } else {
      message.error(res.message)
    }
    handleModalVisible(false);
  }
  return (
    <ModalForm
      title={ currentRow?.id !== undefined ? "字典编辑" : "字典新增" }
      width="400px"
      visible={ createModalVisible }
      onVisibleChange={ handleModalVisible }
      onFinish={ async (value) => {
        await submitForm(value)
      } }
    >
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入字典名称！"
          },
        ] }
        label="字典名称"
        name={ "name" }
        placeholder="请输入字典名称"
        initialValue={ currentRow?.name }
      />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入字典码！"
          },
        ] }
        label="字典码"
        name="code"
        placeholder="请输入字典码"
        initialValue={ currentRow?.code }
      />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入字典类型！"
          },
        ] }
        label="字典类型"
        name="type"
        placeholder="请输入字典类型"
        initialValue={ currentRow?.type }
      />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入字典值！"
          },
        ] }
        label="字典值"
        name="value"
        placeholder="请输入字典值"
        initialValue={ currentRow?.value }
      />
      <ProFormTextArea
        name="remark"
        label="备注"
        placeholder="请输入备注"
        initialValue={ currentRow?.remark }
      />
    </ModalForm>
  )
}

export default ModalModifyForm;