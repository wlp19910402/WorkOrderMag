import { Form, Input, DatePicker } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import React, { FC } from 'react';
import { WorkExperienceDataType, workExpDefault, ProjectExperiencesDataType, projectExpDefault } from './API.d'
import moment from 'moment'
import { dateFormat } from '@/utils/parameter'
interface ModalCreateProjectExpProps {
  modifyProjectExpModalShow: boolean;
  handelProjectExpModal: React.Dispatch<React.SetStateAction<boolean>>;
  saveProjectExp: (value: any) => Promise<void>;
  editData: ProjectExperiencesDataType;
  isEditProjectExp: boolean;
}
const ModalModifyProjectExp: FC<ModalCreateProjectExpProps> = ({ modifyProjectExpModalShow, handelProjectExpModal, saveProjectExp, isEditProjectExp, editData = projectExpDefault }) => {
  const { projectName, projectTime, projectDetail, projectSkill, workContent, projectRole, projectUrl, projectStatus, } = editData
  return (
    <>
      <ModalForm
        title={ isEditProjectExp ? "编辑项目经验" : "新增项目经验" }
        width="400px"
        visible={ modifyProjectExpModalShow }
        onVisibleChange={ handelProjectExpModal }
        onFinish={ async (value) => { saveProjectExp(value) } }
      >
        <Form.Item
          label='项目名称'
          name="projectName"
          rules={ [ { required: true, message: '请输入项目名称' } ] }
          initialValue={ projectName }
        >
          <Input defaultValue={ projectName } placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item
          label="日期"
          name="projectTime"
        >
          <DatePicker.RangePicker
            defaultValue={ [ moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat) ] }
            placeholder={ [ '开始日期', '结束日期' ] } style={ { width: '100%' } }
            format={ dateFormat }
          />
        </Form.Item>
        <Form.Item
          label='项目描述'
          name="projectDetail"
          rules={ [ { message: '请输入项目描述' } ] }
          initialValue={ projectDetail }
        >
          <Input.TextArea defaultValue={ projectDetail } placeholder="请输入项目描述" />
        </Form.Item>
        <Form.Item
          label='使用技能'
          name="projectSkill"
          rules={ [ { message: '请输入使用技能' } ] }
          initialValue={ projectSkill }
        >
          <Input defaultValue={ projectSkill } placeholder="请输入使用技能" />
        </Form.Item>
        <Form.Item
          label='工作内容'
          name="workContent"
          rules={ [ { message: '请输入工作内容' } ] }
          initialValue={ workContent }
        >
          <Input.TextArea defaultValue={ workContent } placeholder="请输入工作内容" />
        </Form.Item>
        <Form.Item
          label='项目担任的角色'
          name="projectRole"
          rules={ [ { message: '请输入角色' } ] }
          initialValue={ projectRole }
        >
          <Input defaultValue={ projectRole } placeholder="请输入角色" />
        </Form.Item>
        <Form.Item
          label='项目地址'
          name="projectUrl"
          rules={ [ { message: '请输入项目地址' } ] }
          initialValue={ projectUrl }
        >
          <Input defaultValue={ projectUrl } placeholder="请输入项目地址" />
        </Form.Item>
        <Form.Item
          label='项目状态'
          name="projectStatus"
          rules={ [ { message: '请输入项目状态' } ] }
          initialValue={ projectStatus }
        >
          <Input defaultValue={ projectStatus } placeholder="请输入项目状态" />
        </Form.Item>
      </ModalForm>
    </>
  );
};

export default ModalModifyProjectExp;
