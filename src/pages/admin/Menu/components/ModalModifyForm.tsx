/**
 * 用户列表 编辑 和 新增
 */
import React from 'react';
import { ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { saveMenu } from '../service';
import { MenuDataType } from '../data.d';

interface ModalModifyFormDataProps {
  modalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  // actionRef: React.MutableRefObject<ActionType | undefined>;
  currentRow: MenuDataType | undefined;
}
const ModalModifyForm: React.FC<ModalModifyFormDataProps> = (props) => {
  const { modalVisible, handleModalVisible, currentRow } = props
  const submitForm = async (value: MenuDataType) => {
    const res = await saveMenu(value)
    if (res.code === 0) {
      handleModalVisible(false);
      // if (actionRef.current) {
      //   actionRef.current.reload();
      // }
    }
  }
  return (
    <ModalForm
      title='新建用户'
      width="400px"
      visible={ modalVisible }
      onVisibleChange={ handleModalVisible }
      onFinish={ async (value) => {
        let bodyVaule: MenuDataType = {
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
      <ProFormCheckbox.Group
        name="roleIds"
        layout="horizontal"
        label="角色id"
        options={ [
          {
            label: "管理员",
            value: 0
          },
          {
            label: "维修人员",
            value: 1
          },
          {
            label: "维修",
            value: 2
          }
        ] }
      />
    </ModalForm>
  )
}

export default ModalModifyForm;
