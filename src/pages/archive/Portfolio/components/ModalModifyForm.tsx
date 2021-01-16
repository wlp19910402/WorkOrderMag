/**
 * 设备列表 编辑 和 新增
 */
import React, { useState, useEffect, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect, ProFormDateTimePicker } from '@ant-design/pro-form';
import { saveProtfolio } from '../service';
import type { PortfolioSaveDataType } from '../data.d';
import { message, Form, Row, Col, Spin } from 'antd'
import UploadImage from '@/components/Upload/index'
import { fetchDicTypeSelectObj } from '@/pages/admin/Dictionary/service'
type ModalModifyFormDataProps = {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  currentRow: PortfolioSaveDataType | undefined;
  searchType: any;
}
const ModalModifyForm: React.FC<ModalModifyFormDataProps> = (props) => {
  const { createModalVisible, handleModalVisible, actionRef, currentRow, searchType } = props
  const [ searchModel, setSearchModel ] = useState<any>({});
  const [ searchBrand, setSearchBrand ] = useState<any>({});
  const [ loadingModel, setLoadingModel ] = useState<boolean>(false)
  const [ loadingBrand, setLoadingBrand ] = useState<boolean>(false)
  const submitForm = async (value: PortfolioSaveDataType) => {
    let params = currentRow?.id !== undefined ? { ...value, id: currentRow.id } : value;
    const response = await saveProtfolio({
      ...params
    })
    if (!response) return
    actionRef.current && actionRef.current.reload();
    handleModalVisible(false);
    message.success(`${currentRow?.id !== undefined ? '修改' : '添加'}成功`);
  }

  useEffect(() => {
    currentRow?.type && fetchDicTypeSelectObj(currentRow?.type).then(res => {
      setSearchModel(res);
    });
    currentRow?.brand && fetchDicTypeSelectObj(currentRow?.brand).then(res => {
      setSearchModel(res);
    });
  }, [])
  const formRef = useRef<any | null>(null);
  return (
    <ModalForm
      modalProps={ {
        maskClosable: false,
        okText: "保存"
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
      formRef={ formRef }
    >
      <ProFormSelect
        name="deviceName"
        rules={ [
          {
            required: true,
            message: "请选择设备名称！"
          },
        ] }
        label="设备名称"
        valueEnum={ { ...searchType } }
        placeholder="请选择设备名称"
        initialValue={ currentRow?.deviceName }
      />
      <ProFormText
        label="设备Id"
        name="deviceId"
        placeholder="请输入设备Id"
        initialValue={ currentRow?.deviceId }
        disabled
      />
      <ProFormText
        label="设备品牌"
        name="brand"
        placeholder="请输入设备品牌"
        initialValue={ currentRow?.brand }
        disabled
      />
      <ProFormText
        label="设备型号"
        name="model"
        placeholder="请输入设备型号"
        initialValue={ currentRow?.model }
        disabled
      />
      <ProFormText
        label="设备类型"
        name="type"
        placeholder="请输入设备类型"
        initialValue={ currentRow?.type }
        disabled
      />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入单位名称！"
          },
        ] }
        label="单位名称"
        name="companyName"
        placeholder="请输入单位名称"
        initialValue={ currentRow?.companyName }
      />
      <ProFormText
        label="单位Id"
        name="companyId"
        placeholder="请输入单位Id"
        initialValue={ currentRow?.companyId }
        disabled
      />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入安装位置！"
          },
        ] }
        label="安装位置"
        name="installLocation"
        placeholder="请输入安装位置"
        initialValue={ currentRow?.installLocation }
      />
      {/* <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入安装时间！"
          },
        ] }
        label="安装时间"
        name="installTime"
        placeholder="请输入安装时间"
      /> */}
      <ProFormDateTimePicker rules={ [
        {
          required: true,
          message: "请输入安装时间！"
        },
      ] } placeholder="请选择安装时间" name="installTime" label="安装时间" initialValue={ currentRow?.installTime } />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入二维码code！"
          },
        ] }
        label="二维码code"
        name="qrCodde"
        placeholder="请输入二维码code"
        initialValue={ currentRow?.qrCodde }
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
    </ModalForm >
  )
}

export default ModalModifyForm;