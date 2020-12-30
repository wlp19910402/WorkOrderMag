import { Button, message, Input, Drawer, Tree, Card, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

import { ClusterOutlined, EditOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import routerData from '../../../layouts/dataRoutes'
// import
const treeData = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];
interface routerDataType {
  path: string,
  name?: string | undefined,
  icon?: string,
  component?: string,
  authority?: string[],
  routes?: routerDataType[],
}
interface treeDataType {
  title: string | undefined,
  key: string | undefined,
  children?: treeDataType[] | undefined
}
const routerTree = (data: routerDataType[]): treeDataType[] => data.filter(ite => ite.name).map((item, index) => ({
  title: item.name ? item.name : undefined,
  key: item.path ? item.path : undefined,
  children: item.routes && item.routes.length > 0 ? routerTree(item.routes) : undefined
}));
const TableList: React.FC<{}> = () => {
  const onSelect = (keys, event) => {
    console.log('Trigger Select', keys, event);
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };
  return (
    <PageContainer content="制作resume。">
      <Card title="基本信息" bordered={ false }>
        <Tree.DirectoryTree
          multiple
          defaultExpandAll={ true }
          blockNode={ false }
          onSelect={ onSelect }
          onExpand={ onExpand }
          selectable={ false }
          treeData={ routerTree(routerData) }
          titleRender={ (nodeData) => {
            return (
              <>
                <ClusterOutlined />
                <Space>
                  { nodeData.title }</Space>
                <Button onClick={
                  (e) => {
                    e.stopPropagation();
                    alert(88);
                  }
                }><PlusOutlined /></Button>
                <Button onClick={
                  (e) => {
                    e.stopPropagation();
                    alert(88);
                  }
                }><MinusOutlined /></Button>
                <Button onClick={
                  (e) => {
                    e.stopPropagation();
                    alert(88);
                  }
                }><EditOutlined /></Button>

              </>
            )
          } }
        />
      </Card>
    </PageContainer>
  );
};

export default TableList;
