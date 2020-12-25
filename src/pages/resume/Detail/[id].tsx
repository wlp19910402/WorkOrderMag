import { Card, Spin, Typography, Button } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { match } from 'react-router'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect, Dispatch, Link } from 'umi';
import styles from '../style.less';
import { ResumeDataType, resumeDataDefault } from '../API.d'
import DetailBaseInfo from '../components/detail/DetailBaseInfo'
import DetailSkillMaster from '../components/detail/DetailSkillMaster'
import DetailWorkExp from '../components/detail/DetailWorkExp'
import DetailProjectExp from '../components/detail/DetailProjectExp'
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
  return (
    <PageContainer>
      <Spin spinning={ loading }>
        <Card
          hoverable
          className={ styles.card }
        >
          <Card.Meta
            description={
              <Typography.Paragraph className={ styles.item } ellipsis={ { rows: 3 } }>
                <DetailBaseInfo value={ resumeData.baseInfo } />
                <DetailSkillMaster value={ resumeData.skillMaster } />
                <DetailWorkExp value={ resumeData.workExperience } />
                <DetailProjectExp value={ resumeData.workExperience } />
              </Typography.Paragraph>
            }
          />
        </Card>
        <FooterToolbar>
          <Link to={ `/resume/edit/${resumeData.id}` } ><Button >删除</Button></Link>
          <Link to={ `/resume/edit/${resumeData.id}` } ><Button type="primary">编辑</Button></Link>
          <Link to={ `/resume/edit/${resumeData.id}` } ><Button type="primary">生成word</Button></Link>
          <Link to={ `/resume/edit/${resumeData.id}` } ><Button type="primary">发布</Button></Link>

        </FooterToolbar>
      </Spin>
    </PageContainer>
  );
};

export default connect(({ loading }: { loading: { models: { [ key: string ]: boolean } } }) => ({
  loading: loading.models.resumeDetail ? true : false,
}))(ResumeDetail);
