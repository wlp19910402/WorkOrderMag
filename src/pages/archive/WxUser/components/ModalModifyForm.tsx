import { ConsumableAddDataType } from '@/pages/archive/portfolio/data.d'
import { message, Spin, Alert, Divider } from 'antd';
import type { ActionType } from '@ant-design/pro-table';
import React, { useState, useRef, useEffect } from 'react';
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { fetchWxBindAdmin } from '@/pages/archive/WxUser/service'
import { queryUserList } from '@/pages/admin/UserList/service';
import { UserListDataType } from '@/pages/admin/data.d'
import style from "@/pages/workOrder/components/sendOrder.less"
export type ColumnEditConsumableType = {
  consumableName: string;
  consumableNo: string;
  consumableTypeName: string;
  consumableModelName: string;
} & ConsumableAddDataType

type ModalModifyFormDataProps = {
  createModalVisible: boolean;
  handleModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  listReloadAndRest?: () => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  wxUserId: number;
}
const ModelSendOrder: React.FC<ModalModifyFormDataProps> = ({ createModalVisible = false, handleModalVisible, listReloadAndRest, wxUserId, actionRef }) => {
  const [ engineerData, setEngineerData ] = useState<any[] | []>([]);
  const [ currentEngineer, setCurrentEngineer ] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(true)
  const submitForm = async (record: any) => {
    await setLoading(true)
    //在工单列表中进行绑定档案
    let response = await fetchWxBindAdmin({
      id: wxUserId,
      adminId: record.adminId,
      realName: record.realName,
      mobile: record.mobile
    })
    await setLoading(false)
    if (!response) return
    message.success("绑定管理员成功");
    if (actionRef.current) {
      actionRef.current.reload();
    }
    if (listReloadAndRest) listReloadAndRest();

    handleModalVisible(false);
  }
  const fetchQueryList = async () => {
    const response = await queryUserList({
      pageSize: 10000000,
      current: 1,
      bindFlag: 2
    })
    setLoading(false)
    if (!response) { setEngineerData([]); return }
    const { data } = response;
    conversionFormat(data.records)
  }
  const conversionFormat = (data: UserListDataType[]) => {
    let obj: any[] = []
    data.forEach(item => {
      obj.push({ value: item.id, label: `${item.username}(${item.mobile})`, style: { "width": "240px", display: "inline-block", margin: "0" } })
    })
    setEngineerData(obj)
  }
  useEffect(() => {
    fetchQueryList()
  }, [])
  const formRef = useRef<any | null>(null)
  return (
    <Spin spinning={ loading }>
      <ModalForm
        modalProps={ {
          maskClosable: false,
          okText: "保存"
        } }
        title="派单"
        width="800px"
        visible={ createModalVisible }
        onVisibleChange={ handleModalVisible }
        onFinish={ async (value: any) => {
          await submitForm(value)
        } }
        labelCol={ { span: 4 } }
        layout="horizontal"
        formRef={ formRef }
      >
        <Alert message={ `管理员: ${currentEngineer}` } type="info" />
        <div className={ style.groupBox }>
          <div className={ style.groupBoxAuto } >
            {
              engineerData.length > 0 ? <ProFormRadio.Group
                name="adminId"
                layout="vertical"
                label=""
                rules={ [ { required: true, message: "管理员必填!" } ] }
                radioType="radio"
                options={ [ ...engineerData ] }
                normalize={ (val, prevValue, all) => {
                  setCurrentEngineer(engineerData.find(item => item.value === val).label)
                  return val
                } }
              /> : "暂时无可用人员，请在新增管理员人员"
            }
          </div>
        </div>
        <Divider />
        <ProFormText
          label="工程师姓名"
          name={ "realName" }
          rules={ [
            {
              required: true,
              message: "请输入工程师姓名！"
            },
          ] }
          placeholder="请输入工程师姓名"
        />
        <ProFormText
          label="工程师手机号"
          rules={ [
            {
              required: true,
              message: "请输入手机号！"
            },
            { pattern: /^1\d{10}$/, message: "请输入正确的手机号" }
          ] }
          name={ "mobile" }
          placeholder="请输入工程师手机号"
        />
      </ModalForm >
    </Spin>
  );
};

export default ModelSendOrder