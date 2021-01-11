import { PlusOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Card, Tree, Row, Col, Divider, Spin, Popconfirm } from 'antd';
import React, { useState, useEffect, } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { MenuDataType } from './data.d';
import { DataNode } from 'rc-tree/lib/interface.d'
import { connect, Dispatch, } from 'umi'
import { TypeFormType, menuDefault } from './data.d'
import ModifyForm from './components/ModifyForm'
import { IconFont } from '@/components/common/IconFont'
import './style.less'
/**
 *  删除节点
 * @param selectedRows
 */
interface MenuTreeTypeProps {
  currentMenu: MenuDataType | undefined;
  dispatch: Dispatch;
  loading: boolean;
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
const treeData: (DataNode[] | undefined) = (data: MenuDataType[] | []) => treeData ? data.filter(ite => ite.id !== undefined).map(item => ({
  key: item.id?.toString(),
  title: item.name,
  children: treeData(item.children),
  icon: item.icon ? <IconFont style={ { fontSize: "16px" } } type={ item.icon } /> : true
})) : undefined
const MenuTree: React.FC<MenuTreeTypeProps> = (props) => {
  const { dispatch, loading } = props;
  const [ currentRow, setCurrentRow ] = useState<MenuDataType | undefined>(menuDefault);
  const [ typeFormType, setTypeFormType ] = useState<TypeFormType>(0);
  const [ editDisable, setEditDisable ] = useState<boolean | undefined>(true);
  const [ menuData, setMenuData ] = useState<DataNode[] | []>([])
  const [ defaultMenuData, setDefatultMenuData ] = useState<DataNode[] | []>([])
  const [ flatMenuData, setFlatMenuData ] = useState<MenuDataType[] | []>([]);
  const [ parentRow, setParentRow ] = useState<MenuDataType>();
  const onSelect = async (keys: string) => {
    await formDefault(keys[ 0 ]);
    setEditDisable(true);
  };
  const formDefault = async (keys: string) => {
    let current = flatMenuData.find(item => item.id === parseInt(keys))
    await setCurrentRow(undefined)
    if (keys === 'new' || !current) {
      await setCurrentRow({ ...menuDefault, parentId: parentRow?.id })
      setTypeFormType(1)
    } else {
      await setCurrentRow(current)
      setTypeFormType(current?.type)
    }
  }
  const fetchMenu = async () => {
    await dispatch({
      type: "menu/fetchMenuTree",
      callback: (data: MenuDataType[], faltData: MenuDataType[]) => {
        setMenuData(treeData(data));
        setDefatultMenuData(treeData(data))
        setFlatMenuData(faltData)
      }
    })
  }
  useEffect(() => {
    fetchMenu()
  }, [])
  const editMenu = async (e: any, keys: string) => {
    e.stopPropagation();
    formDefault(keys);
    setEditDisable(false);
    if (keys === 'new') setCurrentRow({ ...menuDefault, parentId: parentRow?.id })
  }
  const addMenu = async (e: any, Render: DataNode | []) => {
    e.stopPropagation();
    await setCurrentRow(undefined)
    await setCurrentRow({ ...menuDefault, parentId: parseInt(Render?.key) })
    await setParentRow(flatMenuData.find(item => item.id === parseInt(Render?.key)))
    setEditDisable(false);
    Render?.children.push({
      key: "new",
      title: "未命名",
      icon: true,
      children: []
    })
    let tmp = menuData;
    setMenuData([])
    setMenuData(tmp)
  }
  const cancelMenu = async (e: any, render: DataNode) => {
    e.stopPropagation();
    if (render.key === 'new') {
      setMenuData([]);
      setMenuData(defaultMenuData);
      setParentRow(undefined);
    } else {
      await dispatch({
        type: "menu/delMenu",
        payload: render.key,
        callback: async () => {
          await fetchMenu()
        }
      })
    }
  }
  return (
    <PageContainer>
      <Spin spinning={ loading }>
        <Card title="基本信息" bordered={ false }>
          <Row>
            <Col flex={ 2 }>
              <Tree
                autoExpandParent={ true }
                defaultExpandedKeys={ [ "0" ] }
                showLine={ true }
                defaultExpandAll={ true }
                onSelect={ onSelect }
                treeData={ menuData }
                showIcon={ true }
                blockNode={ true }
                titleRender={ (nodeData) => {
                  return (
                    <>
                      <span style={ { fontSize: "16px" } }>{ nodeData.title }</span>
                      <div style={ { position: "absolute", right: "0", top: "0", height: "40px", width: "100px", background: "#ffffff" } }>
                        <Row justify="center">
                          <Col span={ 8 }>
                            <Button
                              disabled={ parentRow?.id != undefined }
                              type="primary" size="small" onClick={ (e) => { addMenu(e, nodeData) } }><PlusOutlined style={ { fontSize: '14px' } }
                              /></Button>
                          </Col>
                          <Col span={ 8 } style={ { textAlign: "center" } }>
                            <Popconfirm
                              title="是否要删除此项？"
                              onConfirm={ (e) => { cancelMenu(e, nodeData) } }>
                              <Button disabled={ nodeData.key === '0' || (parentRow?.id != undefined && nodeData.key !== 'new') } type="default" danger size="small" ><MinusOutlined style={ { fontSize: '14px' } } /></Button>
                            </Popconfirm>,
                          </Col>
                          <Col span={ 8 } >
                            <Button disabled={ nodeData.key === '0' || (parentRow?.id != undefined && nodeData.key !== 'new') } style={ { float: "right" } } type="default" size="small" onClick={ (e) => { editMenu(e, nodeData.key) } }><EditOutlined style={ { fontSize: '14px' } } /></Button>
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
                  editDisable={ editDisable }
                  setParentRow={ setParentRow }
                  fetchMenu={ fetchMenu }
                />
              }
            </Col>
          </Row>
        </Card>
      </Spin>
    </PageContainer >
  );
};
export default connect(
  ({ loading }: { loading: { models: { [ key: string ]: boolean } }, }
  ) => ({
    loading: loading.models.menu ? true : false
  }))(MenuTree);