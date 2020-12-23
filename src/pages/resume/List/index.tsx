import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, List, Typography, Descriptions } from 'antd';
import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import { BaseInfoDataType } from '../API.d';
import styles from './style.less';

const { Paragraph } = Typography;

interface CardListProps {
  listAndcardList: StateType;
  dispatch: Dispatch;
  loading: boolean;
}
interface CardListState {
  visible: boolean;
  done: boolean;
  current?: Partial<BaseInfoDataType>;
}

class CardList extends Component<CardListProps, CardListState> {
  componentDidMount () {
  }

  render () {
    const {
      listAndcardList: { list },
      loading,
    } = this.props;

    const content = (
      <div className={ styles.pageHeaderContent }>
        <div className={ styles.contentLink }>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{ ' ' }
            快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{ ' ' }
            产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{ ' ' }
            产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={ styles.extraImg }>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData: Partial<BaseInfoDataType> = {};
    return (
      <PageContainer content={ content } extraContent={ extraContent }>
        <div className={ styles.cardList }>
          <List<Partial<BaseInfoDataType>>
            rowKey="id"
            loading={ loading }
            grid={ {
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 3,
            } }
            dataSource={ [ ...list ] }
            renderItem={ (item, index) => {
              return (
                <List.Item>
                  <Card
                    hoverable
                    className={ styles.card }
                    actions={ [ <a key="option1">详情</a>, <a key="option2">编辑</a>, <a key="option2">打印</a>, <a key="option2">删除</a> ] }
                  >
                    <Card.Meta
                      avatar={ <img alt="" className={ styles.cardAvatar } src={ require('@/assets/images/resumeHeader.jpg') } /> }
                      description={
                        <Paragraph className={ styles.item } ellipsis={ { rows: 3 } }>
                          <Descriptions size="small" style={ { marginBottom: "20px" } } title={ item.name } bordered column={ 1 }>
                            <Descriptions.Item label="求职意向" >{ item.jobIntention }</Descriptions.Item>
                            <Descriptions.Item label="期望薪资" >{ item.salaryExpectation }</Descriptions.Item>
                            <Descriptions.Item label="工作年限" >{ item.yearsWork }</Descriptions.Item>
                            <Descriptions.Item label="学历" >{ item.education }</Descriptions.Item>
                          </Descriptions>
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
              );
            } }
          />
        </div>
      </PageContainer>
    );
  }
}

export default connect(
  ({
    listAndcardList,
    loading,
  }: {
    listAndcardList: StateType;
    loading: {
      models: { [ key: string ]: boolean };
    };
  }) => ({
    listAndcardList,
    loading: loading.models.listAndcardList,
  }),
)(CardList);