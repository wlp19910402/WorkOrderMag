import { Descriptions } from 'antd';
import React from 'react';
import { WorkExperienceDataType, ProjectExperiencesDataType } from '../../API.d'
interface ProjectExperienceDataTypeProps {
  value: WorkExperienceDataType[] | [];
}
const DetailProjectExp: React.FC<ProjectExperienceDataTypeProps> = ({ value = [] }) => {
  return (
    <Descriptions size="small" style={ { marginBottom: "20px", width: "100%" } } title="项目经验" bordered column={ 1 }>
      <Descriptions.Item contentStyle={ { width: "100%", display: "block" } }>
        { value.map(
          (ite: WorkExperienceDataType, idx: number) => (<div style={ value.length - 1 > idx ? { marginBottom: "20px" } : {} } >
            {ite.projectExpreience && ite.projectExpreience.map(
              (item: ProjectExperiencesDataType, index: number) => (
                <Descriptions size="small" style={ ite.projectExpreience.length - 1 > index ? { marginBottom: "20px" } : {} } key={ index } bordered column={ { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 } }>
                  <Descriptions.Item labelStyle={ { whiteSpace: "nowrap", background: "rgb(212, 234, 255)" } } contentStyle={ { background: "rgb(212, 234, 255)" } } label="项目名称">{ item.projectName }</Descriptions.Item>
                  <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目时间" >{ item.projectTime }</Descriptions.Item>
                  <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目角色">{ item.projectRole }</Descriptions.Item>
                  <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目状态">{ item.projectStatus }</Descriptions.Item>
                  { item.projectUrl ? <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目地址" span={ 2 }>{ item.projectUrl }</Descriptions.Item> : '' }
                  <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目描述" span={ 2 } >{ item.projectDetail }</Descriptions.Item>
                  <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目技术" span={ 2 }>{ item.projectSkill }</Descriptions.Item>
                  <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="工作内容" span={ 2 }>{ item.workContent }</Descriptions.Item>
                </Descriptions>
              )) }
          </div>)) }
      </Descriptions.Item>
    </Descriptions>
  );
};
export default DetailProjectExp;