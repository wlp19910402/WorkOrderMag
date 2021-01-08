import { PlusOutlined, MinusOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, message, Card, Tree, Row, Col, Divider, Form, Input, Radio } from 'antd';
import React, { useState, useEffect, } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { MenuDataType } from './data.d';
import { DataNode } from 'rc-tree/lib/interface.d'
import { Loading, connect, Dispatch, } from 'umi'
import { MenuModelState } from './model';
import ModalModifyForm from './components/ModalModifyForm'
import { createFromIconfontCN } from '@ant-design/icons';
import { TypeFormType } from './data.d'

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
const clusterOutlined = "ClusterOutlined"
const treeData: (DataNode[] | []) = (data: MenuDataType[] | []) => data.filter(ite => ite.id).map(item => ({
  key: item.id?.toString(),
  title: item.name,
  children: treeData(item.children),
  icon: item.icon ? <IconFont type="icon-fire" /> : <IconFont type="icon-fire" />
  // isLeaf: !(item.children && item.children?.length > 0)
}))
const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 16 },
  },
};
const MenuTree: React.FC<MenuTreeTypeProps> = (props) => {
  const { dispatch, menuTreeList, flatMenuData } = props;
  const [ currentRow, setCurrentRow ] = useState<MenuDataType>();
  const [ modalVisible, handleModalVisible ] = useState<boolean>(false);

  const [ form ] = Form.useForm();
  const [ TypeFormType, setTypeFormType ] = useState<TypeFormType>(0);
  const onSelect = (keys: string) => {
    let current = flatMenuData.find(item => item.id === parseInt(keys))
    setCurrentRow(current)
    setTypeFormType(current?.type)
  };
  const onExpand = (e) => {
    console.log('Trigger Expand', e);
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
              onExpand={ onExpand }
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
                              handleModalVisible(true);
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
              <Form
                { ...formItemLayout }
                form={ form }
                layout="vertical"
                initialValues={ { TypeFormType } }
              >
                <Form.Item style={ { flexDirection: "unset" } } label="类型：" name="TypeFormType" initialValue={ currentRow.type }>
                  <Radio.Group onChange={ (e) => { setTypeFormType(e.target.value) } }>
                    <Radio.Button value={ 0 }>目录</Radio.Button>
                    <Radio.Button value={ 1 }>菜单</Radio.Button>
                    <Radio.Button value={ 2 }>按钮</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item style={ { flexDirection: "unset" } } label="名称：" initialValue={ currentRow.name } name="name" required>
                  <Input placeholder="请输入名称" />
                </Form.Item>
                <Form.Item style={ { flexDirection: "unset" } } label="上级菜单："   >
                  <Input disabled value={ flatMenuData?.find(item => item.id === currentRow.parentId)?.name } />
                </Form.Item>
                { TypeFormType === 1 && <>
                  <Form.Item style={ { flexDirection: "unset" } } labelAlign="left" initialValue={ currentRow.url } label="菜单地址：" name="url" >
                    <Input placeholder="请输入菜单地址" />
                  </Form.Item>
                  <Form.Item style={ { flexDirection: "unset" } } label="授权标识：" initialValue={ currentRow.perms } name="perms" >
                    <Input placeholder="请输入授权标识" />
                  </Form.Item>
                </> }
                { (TypeFormType === 1 || TypeFormType === 0) && <>
                  <Form.Item style={ { flexDirection: "unset" } } label="排序号：" initialValue={ currentRow.orderNum || 1 } name="orderNum" >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item style={ { flexDirection: "unset" } } label="图标：" initialValue={ currentRow.icon } name="icon">
                    <Input placeholder="请输入图标" />
                  </Form.Item>
                </>
                }
                { TypeFormType === 2 && <>
                  <Form.Item style={ { flexDirection: "unset" } } label="授权标识：" name="perms" >
                    <Input placeholder="请输入授权标识" />
                  </Form.Item>
                </> }
                <Form.Item style={ { flexDirection: "unset" } } label=" " >
                  <Row>
                    <Col span={ 6 }><Button type="default">取消</Button></Col>
                    <Col span={ 6 } offset={ 1 }><Button type="primary">提交</Button>
                    </Col>
                  </Row>


                </Form.Item>
              </Form>
            }
          </Col>
        </Row>
      </Card>
      {/* {modalVisible && (
        <ModalModifyForm
          modalVisible={ modalVisible }
          handleModalVisible={ handleModalVisible }
          currentRow={ currentRow }
        />
      ) } */}
    </PageContainer >
  );
};

// export default MenuTree;
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