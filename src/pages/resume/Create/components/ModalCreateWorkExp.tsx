import { Form, Input, DatePicker } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import React, { FC } from 'react';
interface ModalCreateWorkExpProps {
  createWorkExpreienceModal: boolean;
  handelWorkExpreienceModal: React.Dispatch<React.SetStateAction<boolean>>;
  CreateWorkExp: (value: any) => Promise<void>;
}
const ModalViewWorkExp: FC<ModalCreateWorkExpProps> = ({ createWorkExpreienceModal, handelWorkExpreienceModal, CreateWorkExp }) => {

  return (
    <>
      <ModalForm
        title="新增工作经验"
        width="400px"
        visible={ createWorkExpreienceModal }
        onVisibleChange={ handelWorkExpreienceModal }
        onFinish={ async (value) => { CreateWorkExp(value) } }
      >
        <Form.Item
          label='公司名称'
          name="companyName"
          rules={ [ { required: true, message: '请输入公司名称' } ] }
        >
          <Input placeholder="请输入公司名称" />
        </Form.Item>
        <Form.Item
          label="日期"
          name="workTime"
        >
          <DatePicker.RangePicker placeholder={ [ '入职日期', '离职日期' ] } style={ { width: '100%' } } />
        </Form.Item>
        <Form.Item
          label='公司描述'
          name="companyDetail"
          rules={ [ { message: '请输入公司描述' } ] }
        >
          <Input.TextArea placeholder="请输入公司描述" />
        </Form.Item>
        <Form.Item
          label='岗位名称'
          name="jobName"
          rules={ [ { required: true, message: '请输入岗位名称' } ] }
        >
          <Input placeholder="请输入岗位名称" />
        </Form.Item>
        <Form.Item
          label='岗位描述'
          name="jobDetail"
          rules={ [ { message: '请输入岗位描述' } ] }
        >
          <Input.TextArea placeholder="请输入岗位描述" />
        </Form.Item>
      </ModalForm>
    </>
  );
};

export default ModalViewWorkExp;
