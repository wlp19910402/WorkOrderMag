import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Col, Row } from 'antd';
import { ExperimentTwoTone, ReconciliationTwoTone, DatabaseTwoTone, ApiTwoTone, RocketTwoTone, DashboardTwoTone } from '@ant-design/icons';
import '@/pages/Welcome.less'
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 }
};
const iconPorps = {
  className: "welcomeIcon"
}

const welcomeModel = [
  {
    Icon: () => <ReconciliationTwoTone twoToneColor="#eb2f96" { ...iconPorps } />,
    title: "工单",
    dec: "工单描述信息",

  },
  {
    Icon: () => <DatabaseTwoTone twoToneColor="#eb2f96" { ...iconPorps } />,
    title: "档案",
    dec: "档案描述信息",
    twoToneColor: "#eb2f96"
  },
  {
    Icon: () => <ApiTwoTone twoToneColor="#eb2f96" { ...iconPorps } />,
    title: "设备",
    dec: "设备的描述信息",
    twoToneColor: "#eb2f96"
  },
  {
    Icon: () => <RocketTwoTone twoToneColor="#eb2f96" { ...iconPorps } />,
    title: "耗材",
    dec: "耗材的描述信息",
    twoToneColor: "#eb2f96"
  },
  {
    Icon: () => <ExperimentTwoTone twoToneColor="#eb2f96" { ...iconPorps } />,
    title: "备件",
    dec: "设备的描述信息",
    twoToneColor: "#eb2f96"
  },
  {
    Icon: () => <DashboardTwoTone twoToneColor="#eb2f96" { ...iconPorps } />,
    title: "监控",
    dec: "监控的描述信息",
    twoToneColor: "#eb2f96"
  }
]
export default (): React.ReactNode => {
  return (
    <PageContainer header={ { title: "" } }>
      <Card>
        <Alert
          message="凌云博际管理端。编辑，新增，查询.更加快捷使用"
          type="success"
          showIcon
          banner
          style={ {
            margin: -12,
            marginBottom: 24,
          } }
        />
        <Typography.Text strong>
          欢迎使用
        </Typography.Text>
        <Row gutter={ 24 } style={ { marginTop: "20px" } }>
          { welcomeModel.map((item, index) => (
            <Col key={ index } { ...topColResponsiveProps }>
              <Card
                className="welcomeModelBox"
                hoverable
                style={ { width: 180, height: 180, textAlign: "center", overflow: "hidden" } }
              >
                { item.Icon() }
                <Card.Meta style={ { textAlign: "center" } } title={ item.title } description={ item.dec } />
              </Card>
            </Col>
          )) }
        </Row>
      </Card>
    </PageContainer>
  );
};
