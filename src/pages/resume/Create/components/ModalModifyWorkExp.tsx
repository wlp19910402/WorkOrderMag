import { Form, Input, DatePicker } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import React, { FC } from 'react';
import { WorkExperienceDataType, workExpDefault } from './API.d'
import moment from 'moment'
interface ModalCreateWorkExpProps {
  createWorkExpreienceModal: boolean;
  handelWorkExpreienceModal: React.Dispatch<React.SetStateAction<boolean>>;
  saveWorkExp: (value: any) => Promise<void>;
  editData: WorkExperienceDataType | undefined;
}
const dateFormat = 'YYYY/MM/DD';
const ModalModifyWorkExp: FC<ModalCreateWorkExpProps> = ({ createWorkExpreienceModal, handelWorkExpreienceModal, saveWorkExp, editData = workExpDefault }) => {
  const { companyName, workTime, companyDetail, jobName, jobDetail } = editData
  return (
    <>
      <ModalForm
        title="新增工作经验"
        width="400px"
        visible={ createWorkExpreienceModal }
        onVisibleChange={ handelWorkExpreienceModal }
        onFinish={ async (value = editData) => { await saveWorkExp(value); } }
      >

        <Form.Item
          label='公司名称'
          name="companyName"
          rules={ [ { required: true, message: '请输入公司名称' } ] }
        >
          <Input defaultValue={ companyName } value={ companyName } placeholder="请输入公司名称" />
        </Form.Item>
        <Form.Item
          label="日期"
          name="workTime"
        >
          <DatePicker.RangePicker
            defaultValue={ [ moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat) ] }
            placeholder={ [ '入职日期', '离职日期' ] } style={ { width: '100%' } } format={ dateFormat } />
        </Form.Item>
        <Form.Item
          label='公司描述'
          name="companyDetail"
          rules={ [ { message: '请输入公司描述' } ] }
        >
          <Input.TextArea defaultValue={ companyDetail } value={ companyDetail } placeholder="请输入公司描述" />
        </Form.Item>
        <Form.Item
          label='岗位名称'
          name="jobName"
          rules={ [ { required: true, message: '请输入岗位名称' } ] }
        >
          <Input defaultValue={ jobName } value={ jobName } placeholder="请输入岗位名称" />
        </Form.Item>
        <Form.Item
          label='岗位描述'
          name="jobDetail"
          rules={ [ { message: '请输入岗位描述' } ] }
        >
          <Input.TextArea defaultValue={ jobDetail } value={ jobDetail } placeholder="请输入岗位描述" />
        </Form.Item>
      </ModalForm>
    </>
  );
};

export default ModalModifyWorkExp;
