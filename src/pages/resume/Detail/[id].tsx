import { Card, Table, Spin, Typography, Descriptions, Progress } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { match } from 'react-router'
import { connect, Dispatch, Link } from 'umi';
import styles from '../style.less';
import { ResumeDataType, resumeDataDefault, SkillMasterDateType, WorkExperienceDataType, ProjectExperiencesDataType } from '../API.d'
interface AdvancedFormProps {
  dispatch: Dispatch;
  match: match;
  loading: boolean;
}
const ResumeDetail: FC<AdvancedFormProps> = ({ dispatch, match, loading }) => {
  const [ resumeData, setResumeData ] = useState<ResumeDataType>(resumeDataDefault)
  useEffect(() => {
    dispatch({
      type: 'resumeDetail/fetch',
      payload: match.params,
      callback: async (res: ResumeDataType) => {
        await setResumeData(res)
      }
    });
  }, [])
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
    <Spin spinning={ loading }>
      <Card
        hoverable
        className={ styles.card }
        actions={ [ <Link to={ `/resume/edit/${resumeData.id}` } >详情</Link>, <Link to={ `/resume/edit/${resumeData.id}` } >编辑</Link>, <Link to={ `/resume/edit/${resumeData.id}` } >打印</Link>, <Link to={ `/resume/edit/${resumeData.id}` } >删除</Link> ] }
      >
        <Card.Meta
          description={
            <Typography.Paragraph className={ styles.item } ellipsis={ { rows: 3 } }>
              <Descriptions size="small" style={ { marginBottom: "20px" } } title="基础信息" bordered column={ { xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 } }>
                <Descriptions.Item labelStyle={ { width: "140px" } } label={ <img alt="" className={ styles.cardAvatar } src={ require('@/assets/images/resumeHeader.jpg') } /> } span={ 3 }>
                  <Descriptions size="small" bordered column={ { xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 } }>
                    <Descriptions.Item label="姓名" >{ resumeData.baseInfo?.name }</Descriptions.Item>
                    <Descriptions.Item label="性别" >{ resumeData.baseInfo?.sex }</Descriptions.Item>
                    <Descriptions.Item label="籍贯" >{ resumeData.baseInfo?.nativePlace }</Descriptions.Item>
                    <Descriptions.Item label="民族" >{ resumeData.baseInfo?.ethnic }</Descriptions.Item>
                    <Descriptions.Item label="工作年限" >{ resumeData.baseInfo?.yearsWork }</Descriptions.Item>
                    <Descriptions.Item label="学历" >{ resumeData.baseInfo?.education }</Descriptions.Item>
                    <Descriptions.Item label="居住地址" >{ resumeData.baseInfo?.residencePlace }</Descriptions.Item>
                    <Descriptions.Item label="电子邮箱" >{ resumeData.baseInfo?.email }</Descriptions.Item>
                    <Descriptions.Item label="手机号" >{ resumeData.baseInfo?.phone }</Descriptions.Item>
                    <Descriptions.Item label="出生日期" >{ resumeData.baseInfo?.dateBirth }</Descriptions.Item>
                    <Descriptions.Item label="求职意向" >{ resumeData.baseInfo?.jobIntention }</Descriptions.Item>
                    <Descriptions.Item label="期望薪资" >{ resumeData.baseInfo?.salaryExpectation }</Descriptions.Item>
                  </Descriptions>
                </Descriptions.Item>
              </Descriptions>
              <Descriptions size="small" style={ { marginBottom: "20px" } } title="技能掌握" bordered column={ 1 }>
                <Descriptions.Item style={ { padding: "0px" } }>
                  <Table<SkillMasterDateType>
                    columns={ columns }
                    dataSource={ resumeData.skillMaster }
                    pagination={ false }
                  />
                </Descriptions.Item>
              </Descriptions>
              <Descriptions size="small" style={ { marginBottom: "20px" } } title="工作经验" bordered column={ 1 }>
                <Descriptions.Item>
                  { resumeData.workExperience.map((item: WorkExperienceDataType, index: number): any => (
                    <Descriptions size="small" style={ resumeData.workExperience.length - 1 > index ? { marginBottom: "20px" } : {} } key={ index } bordered column={ { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 } }>
                      <Descriptions.Item labelStyle={ { whiteSpace: "nowrap", background: "rgb(212, 234, 255)" } } contentStyle={ { background: "rgb(212, 234, 255)" } } label="公司名称" >{ item.companyName }</Descriptions.Item>
                      <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="工作时间" >{ item.workTime }</Descriptions.Item>
                      <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="工作岗位" span={ 2 }>{ item.jobName }</Descriptions.Item>
                      <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="公司描述" span={ 2 }>{ item.companyDetail }</Descriptions.Item>
                      <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="岗位描述" span={ 2 }>{ item.jobDetail }</Descriptions.Item>
                    </Descriptions>
                  )) }
                </Descriptions.Item>
              </Descriptions>
              <Descriptions size="small" style={ { marginBottom: "20px" } } title="项目经验" bordered column={ 1 }>
                <Descriptions.Item>
                  { resumeData.workExperience.map(
                    (ite: WorkExperienceDataType, idx: number) => (<div style={ resumeData.workExperience.length - 1 > idx ? { marginBottom: "20px" } : {} } >
                      {ite.projectExpreience.map(
                        (item: ProjectExperiencesDataType, index: number) => (
                          <Descriptions size="small" style={ ite.projectExpreience.length - 1 > index ? { marginBottom: "20px" } : {} } key={ index } bordered column={ { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 } }>
                            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap", background: "rgb(212, 234, 255)" } } contentStyle={ { background: "rgb(212, 234, 255)" } } label="项目名称">{ item.projectName }</Descriptions.Item>
                            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目时间" >{ item.projectTime }</Descriptions.Item>
                            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目角色">{ item.projectRole }</Descriptions.Item>
                            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目状态">{ item.projectStatus }</Descriptions.Item>
                            {item.projectUrl ? <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目地址" span={ 2 }>{ item.projectUrl }</Descriptions.Item> : '' }
                            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目描述" span={ 2 } >{ item.projectDetail }</Descriptions.Item>
                            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="项目技术" span={ 2 }>{ item.projectSkill }</Descriptions.Item>
                            <Descriptions.Item labelStyle={ { whiteSpace: "nowrap" } } label="工作内容" span={ 2 }>{ item.workContent }</Descriptions.Item>
                          </Descriptions>
                        )) }
                    </div>)) }
                </Descriptions.Item>
              </Descriptions>
            </Typography.Paragraph>
          }
        />
      </Card>
    </Spin>
  );
};

export default connect(({ loading }: { loading: { models: { [ key: string ]: boolean } } }) => ({
  loading: loading.models.resumeDetail ? true : false,
}))(ResumeDetail);
