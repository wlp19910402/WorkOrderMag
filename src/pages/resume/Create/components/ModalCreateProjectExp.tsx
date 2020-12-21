import { Form, Input, DatePicker } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import React, { FC } from 'react';
interface ModalCreateProjectExpProps {
  createProjectExpreienceModal: boolean;
  handelProjectExpreienceModal: React.Dispatch<React.SetStateAction<boolean>>;
  CreateProjectExp: (value: any) => Promise<void>;
}
const ModalViewProjectExp: FC<ModalCreateProjectExpProps> = ({ createProjectExpreienceModal, handelProjectExpreienceModal, CreateProjectExp }) => {

  return (
    <>
      <ModalForm
        title="新增项目经验"
        width="400px"
        visible={ createProjectExpreienceModal }
        onVisibleChange={ handelProjectExpreienceModal }
        onFinish={ async (value) => { CreateProjectExp(value) } }
      >
        <Form.Item
          label='项目名称'
          name="projectName"
          rules={ [ { required: true, message: '请输入项目名称' } ] }
        >
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item
          label="日期"
          name="projectTime"
        >
          <DatePicker.RangePicker placeholder={ [ '开始日期', '结束日期' ] } style={ { width: '100%' } } />
        </Form.Item>
        <Form.Item
          label='项目描述'
          name="projectDetail"
          rules={ [ { message: '请输入项目描述' } ] }
        >
          <Input.TextArea placeholder="请输入项目描述" />
        </Form.Item>
        <Form.Item
          label='使用技能'
          name="projectSkill"
          rules={ [ {  message: '请输入使用技能' } ] }
        >
          <Input placeholder="请输入使用技能" />
        </Form.Item>
        <Form.Item
          label='工作内容'
          name="workContent"
          rules={ [ { message: '请输入工作内容' } ] }
        >
          <Input.TextArea placeholder="请输入工作内容" />
        </Form.Item>
        <Form.Item
          label='项目担任的角色'
          name="projectRole"
          rules={ [ { message: '请输入角色' } ] }
        >
          <Input placeholder="请输入角色" />
        </Form.Item>
        <Form.Item
          label='项目地址'
          name="projectUrl"
          rules={ [ { message: '请输入项目地址' } ] }
        >
          <Input placeholder="请输入项目地址" />
        </Form.Item>
        <Form.Item
          label='项目状态'
          name="projectStatus"
          rules={ [ {  message: '请输入项目状态' } ] }
        >
          <Input placeholder="请输入项目状态" />
        </Form.Item>
      </ModalForm>
    </>
  );
};

export default ModalViewProjectExp;
