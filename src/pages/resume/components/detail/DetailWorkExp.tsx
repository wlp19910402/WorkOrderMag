import { Descriptions } from 'antd';
import React from 'react';
import { WorkExperienceDataType } from '../../API.d'
interface WorkExperienceDataTypeProps {
  value: WorkExperienceDataType[] | [];
}
const DetailWorkExp: React.FC<WorkExperienceDataTypeProps> = ({ value = [] }) => {
  return (
    <Descriptions size="small" style={ { marginBottom: "20px", width: "100%" } } title="工作经验" bordered column={ 1 }>
      <Descriptions.Item contentStyle={ { width: "100%", display: "block" } }>
        { value.map((item: WorkExperienceDataType, index: number): any => (
          <Descriptions size="small" style={ value.length - 1 > index ? { marginBottom: "20px", width: "100%" } : { width: "100%" } } key={ index } bordered column={ { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 } }>
            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap", background: "rgb(212, 234, 255)" } } contentStyle={ { background: "rgb(212, 234, 255)" } } label="公司名称" >{ item.companyName }</Descriptions.Item>
            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="工作时间" >{ item.workTime }</Descriptions.Item>
            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="工作岗位" span={ 2 }>{ item.jobName }</Descriptions.Item>
            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="公司描述" span={ 2 }>{ item.companyDetail }</Descriptions.Item>
            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="岗位描述" span={ 2 }>{ item.jobDetail }</Descriptions.Item>
          </Descriptions>
        )) }
      </Descriptions.Item>
    </Descriptions>
  );
};
export default DetailWorkExp;