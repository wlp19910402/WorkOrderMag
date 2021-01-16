/**
 * 字典列表 编辑 和 新增
 */
import React, { useRef, useState, useEffect } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect, ProFormRadio } from '@ant-design/pro-form';
import { saveDictionary } from '../service';
import type { DictionaryDataType } from '../../data.d';
import { message } from 'antd'
import { dicTypeData } from '@/utils/DicCode.d'
import { fetchDicTypeSelect } from '@/pages/admin/Dictionary/service'
import CODE, { matchDicClass } from '@/utils/DicCode.d'
import AddSelect from './AddSelect'
export interface OptionProps {
  label: React.ReactNode;
  value: any;
}
type ModalModifyFormDataProps = {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  currentRow: DictionaryDataType | undefined;
}
const ModalModifyForm: React.FC<ModalModifyFormDataProps> = (props) => {
  const { createModalVisible, handleModalVisible, actionRef, currentRow } = props
  const [ setList, handleSetList ] = useState<any>(matchDicClass(CODE.DEVICE_TYPE))
  const [ addSelect, handleAddSelect ] = useState<any[]>([])
  const submitForm = async (value: DictionaryDataType) => {
    let params = currentRow?.id !== undefined ? { ...value, id: currentRow.id } : value;
    const response = await saveDictionary({ ...params })
    if (!response) return
    if (actionRef.current) {
      actionRef.current.reload();
    }
    handleModalVisible(false);
    message.success(`${currentRow?.id !== undefined ? '修改' : '添加'}成功`);
  }
  const formRef = useRef<any | null>(null)
  useEffect(() => {
    handleNewCode(CODE.DEVICE_TYPE)
  }, [])
  const handleNewCode = async (val: any) => {
    await handleSetList(matchDicClass(val))
    setList.length > 0 && formRef.current.setFieldsValue({ "newCode": setList[ 0 ].value })
    dicTypeData.forEach(item => {
      if (item.value === val) {
        formRef.current.setFieldsValue({ "type": item.value, "name": item.label });
      }
    })
  }
  const handleTypeCode = async (val: any) => {
    if (val === 0) {
      let parentType = formRef.current.getFieldValue("parentType")
      dicTypeData.forEach(item => {
        if (item.value === parentType) {
          formRef.current.setFieldsValue({ "type": item.value, "name": item.label });
        }
      })
      handleAddSelect([])
    } else {
      let arr = [];
      let parentType = formRef.current.getFieldValue("parentType");
      let response = await fetchDicTypeSelect(parentType)
      let label = dicTypeData.find(item => item.value === parentType)?.label
      arr.push({
        name: "addSelect-0",
        label: label,
        value: response[ 0 ].value,
        option: response,
        isControlType: val === 1
      })
      let typeObj = { type: response[ 0 ].value, name: response[ 0 ].label }
      if (val === 2) {
        let labelNewCode = matchDicClass(parentType)[ val - 1 ].label
        let res = await fetchDicTypeSelect(response[ 0 ].value);
        arr.push({
          name: `addSelect-1`,
          label: labelNewCode,
          option: res,
          value: res[ 0 ].value,
          isControlType: val === 2
        })
        typeObj = { type: res[ 0 ].value, name: res[ 0 ].label }
      }
      formRef.current.setFieldsValue(typeObj);
      handleAddSelect(arr)
    }
  }
  return (
    <ModalForm
      modalProps={ {
        maskClosable: false,
        okText: "保存"
      } }
      title={ currentRow?.id !== undefined ? "字典编辑" : "字典新增" }
      width="600px"
      visible={ createModalVisible }
      onVisibleChange={ handleModalVisible }
      onFinish={ async (value: any) => {
        await submitForm(value)
      } }
      labelCol={ { span: 6 } }
      layout="horizontal"
      formRef={ formRef }
    >
      {currentRow?.id === undefined && (
        <>
          <ProFormRadio.Group
            name="parentType"
            label="选择字典"
            radioType="button"
            options={ [
              ...dicTypeData
            ] }
            initialValue={ CODE.DEVICE_TYPE }

            normalize={ (val, prevValue, all) => {
              handleNewCode(val)
              return val
            } }
          />
          <ProFormRadio.Group
            name="newCode"
            label="选择类型"
            radioType="button"
            options={ [
              ...setList
            ] }
            initialValue={ CODE.DEVICE_TYPE }
            normalize={ (val, prevValue, all) => {
              handleTypeCode(val)
              return val
            } }
          />
          {addSelect.length > 0 && addSelect.map((item: any, index: number) => {
            return <AddSelect
              name={ item.name }
              label={ item.label }
              value={ item.value }
              option={ item.option }
              formRefCurrent={ formRef.current }
              isControlType={ item.isControlType }
              addSelect={ addSelect }
              handleAddSelect={ handleAddSelect }
            />
          }) }
        </>
      ) }
      <ProFormText
        label="字典类型"
        name="type"
        placeholder="请输入字典类型"
        initialValue={ currentRow?.type }
        disabled
      />
      <ProFormText
        label="字典名称"
        name={ "name" }
        placeholder="请输入字典名称"
        initialValue={ currentRow?.name }
        disabled
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
        disabled={ currentRow?.id !== undefined }
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
    </ModalForm >
  )
}

export default ModalModifyForm;