import { Descriptions, Table, Progress } from 'antd';
import React from 'react';
import { SkillMasterDateType } from '../../API.d'
interface SkillMasterDateTypeProps {
  value: SkillMasterDateType[] | [];
}
const DetailSkillMaster: React.FC<SkillMasterDateTypeProps> = ({ value = [] }) => {
  const columns = [
    {
      title: '技能名称',
      dataIndex: 'skillName',
      key: 'skillName',
      width: '40%',
      render: (text: string) => {
        return text;
      },
    },
    {
      title: '熟练程度',
      dataIndex: 'skillProficiency',
      key: 'skillProficiency',
      width: '40%',
      render: (text: number = 0) => {
        return (<Progress percent={ text } />);
      }
    }
  ];
  return (
    <Descriptions size="small" style={ { marginBottom: "20px", width: "100%" } } title="技能掌握" bordered column={ 1 }>
      <Descriptions.Item style={ { padding: "0px" } } contentStyle={ { width: "100%" } }>
        <Table<SkillMasterDateType>
          columns={ columns }
          dataSource={ value }
          pagination={ false }
          style={ { width: "100%" } }
        />
      </Descriptions.Item>
    </Descriptions >
  );
};
export default DetailSkillMaster;