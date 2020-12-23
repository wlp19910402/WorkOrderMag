import { Modal, Empty, Descriptions } from 'antd';
import React, { FC } from 'react';
import { ProjectExperiencesDataType } from '../../API.d'
interface ModalViewProjectExpProps {
  hide: any;
  visible: boolean;
  initialValues: ProjectExperiencesDataType;
}
const ModalViewProjectExp: FC<ModalViewProjectExpProps> = ({ hide, visible, initialValues }) => {
  const { projectName, projectTime, projectDetail, projectSkill, workContent, projectRole, projectUrl, projectStatus } = initialValues
  return (
    <>
      <Modal
        title="项目详情"
        centered
        visible={ visible }
        onOk={ () => { hide(false) } }
        onCancel={ () => { hide(false) } }
      >
        <Descriptions size="small" style={ { marginBottom: "20px" } } title={ projectName } bordered column={ 1 }>
          <Descriptions.Item label="项目名称" >{ projectName }</Descriptions.Item>
          <Descriptions.Item label="项目时间" >{ projectTime }</Descriptions.Item>
          <Descriptions.Item label="项目描述" >{ projectDetail }</Descriptions.Item>
          <Descriptions.Item label="使用技术" >{ projectSkill }</Descriptions.Item>
          <Descriptions.Item label="项目内容" >{ workContent }</Descriptions.Item>
          <Descriptions.Item label="参与角色" >{ projectRole }</Descriptions.Item>
          <Descriptions.Item label="项目地址" >{ projectUrl }</Descriptions.Item>
          <Descriptions.Item label="项目状态" >{ projectStatus }</Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default ModalViewProjectExp;
