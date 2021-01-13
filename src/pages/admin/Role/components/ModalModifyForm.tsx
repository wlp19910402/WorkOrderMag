/**
 * 用户列表 编辑 和 新增
 */
import React from 'react';
import { ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { saveRole } from '../service';
import { RoleDataType } from '../data.d';
import { message } from 'antd'

interface ModalModifyFormDataProps {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  currentRow: RoleDataType | undefined;
}
const ModalModifyForm: React.FC<ModalModifyFormDataProps> = (props) => {
  const { createModalVisible, handleModalVisible, actionRef, currentRow } = props
  const submitForm = async (value: RoleDataType) => {
    const res = await saveRole(value)
    if (res.code === 0) {
      handleModalVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
      message.success(`${value.id != undefined ? '修改' : '添加'}成功`);
    } else {
      message.error(`${value.id != undefined ? '修改' : '添加'}失败`);
    }
  }
  return (
    <ModalForm
      title='新建用户'
      width="400px"
      labelCol={ { span: 6 } }
      layout="horizontal"
      visible={ createModalVisible }
      onVisibleChange={ handleModalVisible }
      onFinish={ async (value) => {
        let bodyVaule: RoleDataType = {
          roleName: value.roleName,
          deptId: value.deptId,
          remark: value.remark
        }
        if (currentRow) {
          bodyVaule.id = currentRow.id
        }
        await submitForm(bodyVaule)
      } }
    >
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入角色名称！"
          },
        ] }
        label="角色名称"
        name="roleName"
        placeholder="请输入角色名称"
        initialValue={ currentRow?.roleName }
      />

      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入部门ID！"
          },
        ] }
        label="部门ID"
        name="deptId"
        placeholder="请输入部门ID"
        initialValue={ currentRow?.deptId }
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
