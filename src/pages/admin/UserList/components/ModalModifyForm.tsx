/**
 * 用户列表 编辑 和 新增
 */
import React from 'react';
import { ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { addUser } from '../service';
import { UserListDataType, EditUserDataType } from '../../data.d';
import { RoleCheckBoxDataType } from '../index'

interface ModalModifyFormDataProps {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  currentRow: UserListDataType | undefined;
  roleData: RoleCheckBoxDataType[] | undefined;
}
const ModalModifyForm: React.FC<ModalModifyFormDataProps> = (props) => {
  const { createModalVisible, handleModalVisible, actionRef, currentRow, roleData } = props
  const submitForm = async (value: EditUserDataType) => {
    const res = await addUser(value)
    if (res.code === 0) {
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
    handleModalVisible(false);
  }
  return (
    <ModalForm
      title='新建用户'
      width="400px"
      visible={ createModalVisible }
      onVisibleChange={ handleModalVisible }
      onFinish={ async (value) => {
        let bodyVaule: EditUserDataType = {
          username: value.username,
          email: value.email,
          mobile: value.mobile,
          realname: value.realname,
          roleIds: value.roleIds,
          password: value.password
        }
        await submitForm(bodyVaule)
      } }
    >
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入用户名！"
          },
        ] }
        label="用户名"
        name="username"
        placeholder="请输入用户名"
        initialValue={ currentRow?.username }
      />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入姓名！"
          },
        ] }
        label="姓名"
        name="realName"
        placeholder="请输入姓名"
        initialValue={ currentRow?.realname }
      />
      <ProFormText.Password rules={ [
        {
          required: true,
          message: "请输入密码！"
        },
      ] } label="密码" name="password" placeholder="请输入密码"
      />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入手机号！"
          },
        ] }
        label="手机号"
        name="mobile"
        placeholder="请输入手机号"
        initialValue={ currentRow?.mobile }
      />
      <ProFormText
        rules={ [
          {
            required: true,
            message: "请输入邮箱！"
          },
        ] }
        label="邮箱"
        name="email"
        placeholder="请输入邮箱"
        initialValue={ currentRow?.email }
      />
      {roleData ? <ProFormCheckbox.Group
        name="roleIds"
        layout="horizontal"
        label="角色ID"
        options={ roleData }
      /> : <></>
      }
    </ModalForm>
  )
}

export default ModalModifyForm;
