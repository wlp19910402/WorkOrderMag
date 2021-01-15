import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Col, Row } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 }
};
export default (): React.ReactNode => {
  return (
    <PageContainer>
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
        <Row gutter={ 24 } >
          { [ 1, 2, 3, 4 ].map((value, index) => (
            <Col key={ index } { ...topColResponsiveProps }>
              <Card
                hoverable
                style={ { width: 240 } }
                cover={ <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> }
                actions={ [
                  <EyeOutlined key="view" />,
                  <EditOutlined key="edit" />,
                ] }
              >
                <Card.Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </Col>
          )) }
        </Row>
      </Card>
    </PageContainer>
  );
};
