import { Card, Spin, Typography } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { match } from 'react-router'
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
    <Spin spinning={ loading }>
      <Card
        hoverable
        className={ styles.card }
        actions={ [ <Link to={ `/resume/edit/${resumeData.id}` } >详情</Link>, <Link to={ `/resume/edit/${resumeData.id}` } >编辑</Link>, <Link to={ `/resume/edit/${resumeData.id}` } >打印</Link>, <Link to={ `/resume/edit/${resumeData.id}` } >删除</Link> ] }
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
    </Spin>
  );
};

export default connect(({ loading }: { loading: { models: { [ key: string ]: boolean } } }) => ({
  loading: loading.models.resumeDetail ? true : false,
}))(ResumeDetail);
