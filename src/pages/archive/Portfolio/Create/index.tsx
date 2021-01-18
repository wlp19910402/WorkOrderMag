import { Card, Form, Select, Descriptions, Button, Row, Col, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { PortfolioListDataType } from '../data';
import BasicModifyForm from '../components/BasicModifyForm'

const DictionaryList: React.FC<PortfolioListDataType> = () => {
  return (
    <BasicModifyForm />
  );
};

export default DictionaryList;
