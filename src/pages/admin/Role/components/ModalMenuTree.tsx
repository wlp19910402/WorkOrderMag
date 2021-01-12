/**
 * 用户列表 编辑 和 新增
 */
import React, { useState, useEffect } from 'react';
import { ActionType } from '@ant-design/pro-table';
import { RoleDataType } from '../data.d';
import { message, Modal, Tree } from 'antd'
import { connect, Dispatch, } from 'umi'
import { MenuModelState } from '@/models/menu'
import { treeData } from '@/pages/admin/Menu/index'
import { getRoleDetail, BindRole } from '../service'
import { MenuDataType } from '@/pages/admin/Menu/data.d'
interface ModalTreeDataProps {
  modalTreeVisible: boolean;
  handleModalTreeVisible: React.Dispatch<React.SetStateAction<boolean>>;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  currentRow: RoleDataType | undefined;
  menuTree: MenuDataType[] | [];
  dispatch: Dispatch;
}
export interface SaveRoleParamsType {
  menuIds: number[];
  roleId: number;
}
const ModalTreeForm: React.FC<ModalTreeDataProps> = (props) => {
  const { modalTreeVisible, handleModalTreeVisible, menuTree, actionRef, currentRow, dispatch } = props
  const [ expandedKeys, setExpandedKeys ] = useState<React.Key[]>([ '0-0-0', '0-0-1' ]);
  const [ checkedKeys, setCheckedKeys ] = useState<React.Key[]>([]);
  const [ selectedKeys, setSelectedKeys ] = useState<React.Key[]>([]);
  const [ autoExpandParent, setAutoExpandParent ] = useState<boolean>(true);
  const [ checkedParentKeys, setCheckedParentKeys ] = useState<React.Key[]>([])
  const submitForm = async (id: number) => {
    let arrSet = new Set(checkedKeys.concat(checkedParentKeys));
    let arr = Array.from(arrSet);
    const res = await BindRole({
      menuIds: arr.map(item => parseInt(item)),
      roleId: id
    })
    if (res.code === 0) {
      handleModalTreeVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
      message.success("保存成功");
    } else {
      message.error(res.message);
    }
  }
  const onExpand = (expandedKeys: React.Key[]) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeys: React.Key[], info: any) => {
    setCheckedParentKeys(info.halfCheckedKeys)
    setCheckedKeys(checkedKeys);
  }
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    setSelectedKeys(selectedKeys);
  };
  useEffect(() => {
    if (menuTree.length === 0) {
      dispatch({
        type: 'menu/fetchMenuTree'
      })
    }
    if (currentRow?.id) {
      getRoleDetail(currentRow.id?.toString()).then(res => {
        if (res.code === 0) {
          setCheckedKeys(res.data.menuIds.map((item: any) => item.toString()))
        } else {
          message.error(res.message)
        }
      })
    }
  }, [])
  return (
    <Modal title={ `绑定菜单权限:${currentRow?.roleName}` }
      visible={ modalTreeVisible }
      onOk={ () => currentRow?.id !== undefined && submitForm(currentRow?.id) }
      okText="保存"
      onCancel={ () => { handleModalTreeVisible(false) } }
      bodyStyle={ { maxHeight: "560px", overflow: "auto" } }
    >
      <Tree
        checkable
        onExpand={ onExpand }
        expandedKeys={ expandedKeys }
        autoExpandParent={ autoExpandParent }
        onCheck={ onCheck }
        checkedKeys={ checkedKeys }
        onSelect={ onSelect }
        selectedKeys={ selectedKeys }
        treeData={ treeData(menuTree) }
      />
    </Modal>
  )
}


export default connect(
  ({ loading, menu }: { loading: { models: { [ key: string ]: boolean } }, menu: MenuModelState }
  ) => ({
    loading: loading.models.menu ? true : false,
    menuTree: menu.menuTree
  }))(ModalTreeForm);