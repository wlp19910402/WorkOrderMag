/**
 * 用户列表 编辑 和 新增
 */
import React from 'react';
import { ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { saveUserAuthority, UserAuthorityType } from '../service';
import { UserListDataType } from '../../data.d';
import { RoleCheckBoxDataType } from '../index'
import { message } from 'antd'
interface ModalAuthifyFormDataProps {
  modalAuthifyVisible: boolean;
  handleModalAuthifyVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  currentRow: UserListDataType | undefined;
  roleData: RoleCheckBoxDataType[] | undefined;
  initialRoleIds: number[] | undefined;
}
const ModalAuthifyForm: React.FC<ModalAuthifyFormDataProps> = (props) => {
  const { modalAuthifyVisible, handleModalAuthifyVisible, actionRef, currentRow, roleData, initialRoleIds } = props
  const submitForm = async (value: UserAuthorityType) => {
    const res = await saveUserAuthority(value)
    if (res.code === 0) {
      handleModalAuthifyVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } else {
      message.error(res.message);
    }
    handleModalAuthifyVisible(false);
  }
  return (
    <ModalForm
      title='用户授权'
      width="400px"
      visible={ modalAuthifyVisible }
      onVisibleChange={ handleModalAuthifyVisible }
      onFinish={ async (value) => {
        let bodyVaule: UserAuthorityType = {
          roleIds: value.roleIds.map((item: any) => item.toString()),
          userId: value.id
        }
        await submitForm(bodyVaule)
      } }
      labelCol={ { span: 5 } }
      layout="horizontal"
    >
      <ProFormText
        hidden
        name="id"
        initialValue={ currentRow?.id }
      />
      <ProFormText
        name=""
        disabled
        label="用户名"
        initialValue={ currentRow?.username }
      />
      {roleData ? <ProFormCheckbox.Group
        name="roleIds"
        layout="horizontal"
        label="角色ID"
        initialValue={ initialRoleIds }
        options={ roleData }
      /> : <></> }
    </ModalForm>
  )
}

export default ModalAuthifyForm;
