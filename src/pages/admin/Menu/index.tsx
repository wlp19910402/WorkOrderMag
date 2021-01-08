import { PlusOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Card, Tree, Row, Col, Divider, Form, } from 'antd';
import React, { useState, useEffect, } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { MenuDataType } from './data.d';
import { DataNode } from 'rc-tree/lib/interface.d'
import { Loading, connect, Dispatch, } from 'umi'
import { MenuModelState } from './model';
import { createFromIconfontCN } from '@ant-design/icons';
import { TypeFormType } from './data.d'
import ModifyForm from './components/ModifyForm'

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2316393_wa0uc2scrz8.js'
  ],
});
/**
 *  删除节点
 * @param selectedRows
 */
interface MenuTreeTypeProps {
  currentMenu: MenuDataType | undefined;
  menuTreeList: MenuDataType[] | [];
  flatMenuData: MenuDataType[] | [];
  dispatch: Dispatch;
}
const handleRemove = async (selectedRows: MenuDataType[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    // await removeRule({
    //   deleteId: selectedRows.map((row) => row.id),
    // });
    hide;
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide;
    message.error('删除失败，请重试');
    return false;
  }
};
const treeData: (DataNode[] | []) = (data: MenuDataType[] | []) => data.filter(ite => ite.id).map(item => ({
  key: item.id?.toString(),
  title: item.name,
  children: treeData(item.children),
  icon: item.icon ? <IconFont type="icon-fire" /> : <IconFont type="icon-fire" />
}))
const MenuTree: React.FC<MenuTreeTypeProps> = (props) => {
  const { dispatch, menuTreeList, flatMenuData } = props;
  const [ currentRow, setCurrentRow ] = useState<MenuDataType>();
  const [ typeFormType, setTypeFormType ] = useState<TypeFormType>(0);
  const onSelect = async (keys: string) => {
    let current = flatMenuData.find(item => item.id === parseInt(keys))
    await setCurrentRow(undefined)
    await setCurrentRow(current)
    setTypeFormType(current?.type)
  };
  useEffect(() => {
    dispatch({
      type: "menu/fetchMenuTree"
    })
  }, [])
  return (
    <PageContainer>
      <div>
        {/* { JSON.stringify(currentRow) } */ }
      </div>
      <Card title="基本信息" bordered={ false }>
        <Row>
          <Col flex={ 2 }>
            <Tree
              defaultExpandAll={ true }
              onSelect={ onSelect }
              treeData={ treeData(menuTreeList) }
              showIcon={ true }
              blockNode={ true }
              titleRender={ (nodeData) => {
                return (
                  <>
                    <span style={ { fontSize: "16px" } }>{ nodeData.title }</span>
                    <div style={ { position: "absolute", right: "0", top: "0", height: "40px", width: "100px", background: "#ffffff" } }>
                      <Row justify="center">
                        <Col span={ 8 }>
                          <Button type="primary" size="small" onClick={
                            (e) => {
                              e.stopPropagation();
                              alert(88);
                            }
                          }><PlusOutlined style={ { fontSize: '14px' } } /></Button>
                        </Col>
                        <Col span={ 8 } style={ { textAlign: "center" } }>
                          <Button type="default" danger size="small" onClick={
                            (e) => {
                              e.stopPropagation();
                              alert(88);
                            }
                          }><MinusOutlined style={ { fontSize: '14px' } } /></Button>
                        </Col>
                        <Col span={ 8 } >
                          <Button style={ { float: "right" } } type="default" size="small" onClick={
                            (e) => {
                              e.stopPropagation();
                              console.log(nodeData);
                            }
                          }><EditOutlined style={ { fontSize: '14px' } } /></Button>
                        </Col>
                      </Row>
                    </div>
                  </>
                )
              } }
            />
          </Col>
          <Col>
            <Divider style={ { height: "100%" } } type="vertical"></Divider>
          </Col>
          <Col flex={ 3 } >
            { currentRow &&
              <ModifyForm
                typeFormType={ typeFormType }
                currentRow={ currentRow }
                flatMenuData={ flatMenuData }
                setTypeFormType={ setTypeFormType }
                dispatch={ dispatch }
              />
            }
          </Col>
        </Row>
      </Card>
    </PageContainer >
  );
};
export default connect(
  ({ menu, loading }:
    {
      loading: Loading, menu: MenuModelState
    }
  ) => ({
    loadingMenuTree: loading.effects[ 'menu/fetchMenuTree' ],
    loadingSaveMenu: loading.effects[ 'menu/saveMenu' ],
    menuTreeList: menu.menuTree,
    currentMenu: menu.currentMenu,
    flatMenuData: menu.flatMenuData
  }))(MenuTree);