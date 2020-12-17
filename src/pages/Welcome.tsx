import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Col, Row } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
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
  const intl = useIntl();
  return (
    <PageContainer>
      <Card>
        <Alert
          message={ intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'resume模板，优化，简洁，清晰。开始您的resume',
          }) }
          type="success"
          showIcon
          banner
          style={ {
            margin: -12,
            marginBottom: 24,
          } }
        />
        <Typography.Text strong>
          <FormattedMessage id="pages.welcome.advancedComponent" defaultMessage="resume模板" />{ ' ' }
          {/* <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          > */}
          <FormattedMessage id="pages.welcome.link" defaultMessage="欢迎使用" />
          {/* </a> */ }
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
