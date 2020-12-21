import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Popover, Row, Select, TimePicker, Upload, Modal, message } from 'antd';
import React, { FC, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import SkillForm from './components/SkillForm';
import BasicForm from './components/BasicForm';
import ExperienceForm from './components/ExperienceForm'
import styles from './style.less';

type InternalNamePath = (string | number)[];
const tableData = [
  {
    key: '1',
    skillName: "Java",
    skillProficiency: 40,
  },
  {
    key: '2',
    skillName: "Javascript",
    skillProficiency: 40,
  },
  {
    key: '3',
    skillName: "React",
    skillProficiency: 40,
  },
];
const workExperienceData = [
  {
    key: "1",
    companyName: "亚大通讯网络有限责任公司",
    workTime: "2008/09/08-2021/02/02",
    companyDetail: "公司描述，具体内容等待等。。。",
    jobName: "后台开发人员",
    jobDetail: "复制Java开发，已经上线项目维护。。。",
    projectExpreience: [
      {
        key: "1",
        projectName: "家装分期",
        projectTime: "2018/09/08-2021/02/02",
        projectDetail: "发布任务，执行任务，下发贷款",
        projectSkill: "React,typescript,umi,onsenui,...",
        workContent: "此项目参与工作内容",
        projectRole: "前端人员",
        projectUrl: "",
        projectStatus: "上线"
      },
      {
        key: "2",
        projectName: "家装分期",
        projectTime: "2018/09/08-2021/02/02",
        projectDetail: "发布任务，执行任务，下发贷款",
        projectSkill: "React,typescript,umi,onsenui,...",
        workContent: "此项目参与工作内容",
        projectRole: "前端人员",
        projectUrl: "",
        projectStatus: "上线"
      }
    ]
  },
  {
    key: "2",
    companyName: "亚大通讯网络有限责任公司222",
    workTime: "2008/09/08-2021/02/02",
    companyDetail: "公司描述，具体内容等待等。。。",
    jobName: "后台开发人员",
    jobDetail: "复制Java开发，已经上线项目维护。。。",
    projectExpreience: [
      {
        key: "1",
        projectName: "家装分期",
        projectTime: "2018/09/08-2021/02/02",
        projectDetail: "发布任务，执行任务，下发贷款",
        projectSkill: "React,typescript,umi,onsenui,...",
        workContent: "此项目参与工作内容",
        projectRole: "前端人员",
        projectUrl: "",
        projectStatus: "上线"
      },
      {
        key: "2",
        projectName: "家装分期",
        projectTime: "2018/09/08-2021/02/02",
        projectDetail: "发布任务，执行任务，下发贷款",
        projectSkill: "React,typescript,umi,onsenui,...",
        workContent: "此项目参与工作内容",
        projectRole: "前端人员",
        projectUrl: "",
        projectStatus: "上线"
      }
    ]
  }
]
interface AdvancedFormProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}
const AdvancedForm: FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [ form ] = Form.useForm();
  const [ error, setError ] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[ 0 ] as string;
      return (
        <li key={ key } className={ styles.errorListItem } onClick={ () => scrollToField(key) }>
          <CloseCircleOutlined className={ styles.errorIcon } />
          <div className={ styles.errorMessage }>{ err.errors[ 0 ] }</div>

        </li>
      );
    });
    return (
      <span className={ styles.errorIcon }>
        <Popover
          title="表单校验信息"
          content={ errorList }
          overlayClassName={ styles.errorPopover }
          trigger="click"
          getPopupContainer={ (trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          } }
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount }
      </span>
    );
  };
  const onFinish = (values: { [ key: string ]: any }) => {
    setError([]);
    dispatch({
      type: 'formAndadvancedForm/submitAdvancedForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  return (
    <Form
      form={ form }
      layout="vertical"
      hideRequiredMark
      initialValues={ { members: tableData, experiences: workExperienceData } }
      onFinish={ onFinish }
      onFinishFailed={ onFinishFailed }
    >
      <PageContainer content="制作resume。">
        <Card title="基本信息" className={ styles.card } bordered={ false }>
          <BasicForm />
        </Card>
        <Card title="技能掌握" className={ styles.card } bordered={ false }>
          <Form.Item name="members">
            <SkillForm />
          </Form.Item>
        </Card>
        <Card title="工作经验" className={ styles.card } bordered={ false }>
          <Form.Item name="experiences">
            <ExperienceForm />
          </Form.Item>
        </Card>
      </PageContainer>
      <FooterToolbar>
        { getErrorInfo(error) }
        <Button type="primary" onClick={ () => form?.submit() } loading={ submitting }>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [ key: string ]: boolean } } }) => ({
  submitting: loading.effects[ 'formAndadvancedForm/submitAdvancedForm' ],
}))(AdvancedForm);
