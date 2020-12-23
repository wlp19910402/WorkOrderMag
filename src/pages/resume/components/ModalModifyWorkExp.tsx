import { Form, Input, DatePicker } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import React, { FC } from 'react';
import { WorkExperienceDataType, workExpDefault } from '../API.d'
import moment from 'moment'
import { dateFormat, rangePickerArrFormat } from '@/utils/parameter'
interface ModalCreateWorkExpProps {
  modifyWorkExpModalShow: boolean;
  handelWorkExpModal: React.Dispatch<React.SetStateAction<boolean>>;
  saveWorkExp: (value: any) => Promise<void>;
  editData: WorkExperienceDataType | undefined;
  isEditWorkExp: boolean;
}
const ModalModifyWorkExp: FC<ModalCreateWorkExpProps> = ({ modifyWorkExpModalShow, handelWorkExpModal, saveWorkExp, isEditWorkExp, editData = workExpDefault }) => {
  const { companyName, workTime, companyDetail, jobName, jobDetail } = editData
  return (
    <>
      <ModalForm
        title={ isEditWorkExp ? "编辑工作经验" : "新增工作经验" }
        width="400px"
        visible={ modifyWorkExpModalShow }
        onVisibleChange={ handelWorkExpModal }
        onFinish={ async (value = editData) => {
          value = {
            ...value,
            workTime: rangePickerArrFormat(value.workTime)
          }
          await saveWorkExp(value);
        } }
      >
        <Form.Item
          label='公司名称'
          name="companyName"
          rules={ [ { required: true, message: '请输入公司名称' } ] }
          initialValue={ companyName }
        >
          <Input defaultValue={ companyName } placeholder="请输入公司名称" />
        </Form.Item>
        <Form.Item
          label="日期"
          name="workTime"
        >
          <DatePicker.RangePicker
            defaultValue={ workTime ? [ moment(workTime.split('~')[ 0 ], dateFormat), moment(workTime.split('~')[ 1 ], dateFormat) ] : null }
            placeholder={ [ '入职日期', '离职日期' ] } style={ { width: '100%' } }
            format={ dateFormat }
          />
        </Form.Item>
        <Form.Item
          label='公司描述'
          name="companyDetail"
          rules={ [ { message: '请输入公司描述' } ] }
          initialValue={ companyDetail }
        >
          <Input.TextArea defaultValue={ companyDetail } placeholder="请输入公司描述" />
        </Form.Item>
        <Form.Item
          label='岗位名称'
          name="jobName"
          rules={ [ { required: true, message: '请输入岗位名称' } ] }
          initialValue={ jobName }
        >
          <Input defaultValue={ jobName } placeholder="请输入岗位名称" />
        </Form.Item>
        <Form.Item
          label='岗位描述'
          name="jobDetail"
          rules={ [ { message: '请输入岗位描述' } ] }
          initialValue={ jobDetail }
        >
          <Input.TextArea defaultValue={ jobDetail } placeholder="请输入岗位描述" />
        </Form.Item>
      </ModalForm>
    </>
  );
};

export default ModalModifyWorkExp;
