import { Modal, Empty, Descriptions } from 'antd';
import React, { FC } from 'react';
import { WorkExperienceDataType, ProjectExperiencesDataType } from '../../API.d'
interface ModalViewWorkExpProps {
  hide: any;
  visible: boolean;
  initialValues: WorkExperienceDataType;
}
const ModalViewWorkExp: FC<ModalViewWorkExpProps> = ({ hide, visible, initialValues }) => {
  const { companyName, workTime, companyDetail, jobName, jobDetail, projectExpreience } = initialValues
  return (
    <>
      <Modal
        title="工作详情"
        centered
        visible={ visible }
        onOk={ () => { hide(false) } }
        onCancel={ () => { hide(false) } }
      >
        <Descriptions style={ { marginBottom: "20px" } } title="公司信息" bordered column={ 1 }>
          <Descriptions.Item label="公司名称" >{ companyName }</Descriptions.Item>
          <Descriptions.Item label="时间">{ workTime }</Descriptions.Item>
          <Descriptions.Item label="公司描述">{ companyDetail }</Descriptions.Item>
          <Descriptions.Item label="岗位名称">{ jobName }</Descriptions.Item>
          <Descriptions.Item label="岗位描述">{ jobDetail }</Descriptions.Item>
        </Descriptions>
        { !projectExpreience || projectExpreience.length === 0 ? <Empty description="尚未添加项目经验" /> : (projectExpreience.map((item: ProjectExperiencesDataType, index: number) => (
          <>
            <Descriptions size="small" style={ { marginBottom: "20px" } } key={ index } title={ item.projectName } bordered column={ 1 }>
              <Descriptions.Item label="项目名称" >{ item.projectName }</Descriptions.Item>
              <Descriptions.Item label="项目时间" >{ item.projectTime }</Descriptions.Item>
              <Descriptions.Item label="项目描述" >{ item.projectDetail }</Descriptions.Item>
              <Descriptions.Item label="使用技术" >{ item.projectSkill }</Descriptions.Item>
              <Descriptions.Item label="项目内容" >{ item.workContent }</Descriptions.Item>
              <Descriptions.Item label="参与角色" >{ item.projectRole }</Descriptions.Item>
              <Descriptions.Item label="项目地址" >{ item.projectUrl }</Descriptions.Item>
              <Descriptions.Item label="项目状态" >{ item.projectStatus }</Descriptions.Item>
            </Descriptions>
          </>
        )))
        }
      </Modal>
    </>
  );
};

export default ModalViewWorkExp;
