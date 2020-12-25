import { Descriptions } from 'antd';
import React from 'react';
import { BaseInfoDataType, BaseInfoDefault } from '../../API.d'
import styles from '../../style.less';
interface BaseInfoDataTypeProps {
  value: BaseInfoDataType;
}
const DetailBaseInfo: React.FC<BaseInfoDataTypeProps> = ({ value = BaseInfoDefault }) => {
  return (
    <Descriptions size="small" style={ { marginBottom: "20px" } } title="基础信息" bordered column={ { xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 } }>
      <Descriptions.Item labelStyle={ { width: "140px" } } label={ <img alt="" className={ styles.cardAvatar } src={ require('@/assets/images/resumeHeader.jpg') } /> } span={ 3 }>
        <Descriptions size="small" bordered column={ { xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 } }>
          <Descriptions.Item label="姓名" >{ value.name }</Descriptions.Item>
          <Descriptions.Item label="性别" >{ value.sex }</Descriptions.Item>
          <Descriptions.Item label="籍贯" >{ value.nativePlace }</Descriptions.Item>
          <Descriptions.Item label="民族" >{ value.ethnic }</Descriptions.Item>
          <Descriptions.Item label="工作年限" >{ value.yearsWork }</Descriptions.Item>
          <Descriptions.Item label="学历" >{ value.education }</Descriptions.Item>
          <Descriptions.Item label="居住地址" >{ value.residencePlace }</Descriptions.Item>
          <Descriptions.Item label="电子邮箱" >{ value.email }</Descriptions.Item>
          <Descriptions.Item label="手机号" >{ value.phone }</Descriptions.Item>
          <Descriptions.Item label="出生日期" >{ value.dateBirth }</Descriptions.Item>
          <Descriptions.Item label="求职意向" >{ value.jobIntention }</Descriptions.Item>
          <Descriptions.Item label="期望薪资" >{ value.salaryExpectation }</Descriptions.Item>
        </Descriptions>
      </Descriptions.Item>
    </Descriptions>
  );
};
export default DetailBaseInfo;