import { Card, Descriptions, Divider, notification, Timeline, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { infoOrder, logOrder } from '@/pages/workOrder/service';
import { WorkOrderInfoDataType, orderStatusData, orderTypeMatchInfo, WorkOrderWrokLogDataType } from '@/pages/workOrder/data.d';
import { match } from 'react-router';
import WorkOrderInfoConsumableList from '@/pages/workOrder/components/WorkOrderInfoConsumableList'
import WorkOrderInfoProtolioConsumableList from '@/pages/workOrder/components/WorkOrderInfoProtolioConsumableList'
import WorkOrderInfoProtolioPartList from '@/pages/workOrder/components/WorkOrderInfoProtolioPartList'
import ImageFlatList from '@/components/common/ImageFlatList'
interface WorkOrderFinishProps {
  matchRoute: match<{}>;
  orderType: string;
}

const DictionaryList: React.FC<WorkOrderFinishProps> = ({ orderType = 'wx', matchRoute }) => {
  const [ currentRow, setCurrentRow ] = useState<WorkOrderInfoDataType>();
  const [ logs, setLogs ] = useState<WorkOrderWrokLogDataType[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true)
  let routeParams: any = matchRoute.params
  const fetchQueryCurrentOrderInfo = async () => {
    const response = await infoOrder(routeParams.id);
    setLoading(false)
    if (!response) {
      setCurrentRow(undefined)
      return
    }
    let data = response.data
    setCurrentRow(data)
  };
  const fetchLogsOrder = async () => {
    let response = await logOrder(routeParams.id)
    if (!response) {
      setCurrentRow(undefined)
      return
    }
    setLogs(response.data)
  }
  const openNotification = async () => {
    const args = {
      message: '工单日志',
      description:
        <Timeline style={ { maxHeight: "400px", overflow: "auto" } }>
          { logs.map((item: WorkOrderWrokLogDataType) => (
            <Timeline.Item color={ orderStatusData.find(it => it.value === item.operationType)?.color }>
              <p />
              <p>状态：{ orderStatusData.find(it => it.value === item.operationType)?.label }</p>
              <p>日志：{ item.operationLog }</p>
              <p>人员时间：{ item.createUsername }{ item.createTime }</p>
            </Timeline.Item>
          )) }
        </Timeline>,
      duration: 0,
    };
    notification.open(args);
  };
  useEffect(() => {
    fetchQueryCurrentOrderInfo();
    fetchLogsOrder();
  }, [])
  return (
    <Spin spinning={ loading }>
      <Card title="工单详情" style={ { marginBottom: "20px" } } extra={ <a onClick={ () => { openNotification() } }>查看日志</a> } bordered={ false } >
        <Divider orientation="left">工单基本信息</Divider>
        <Descriptions bordered size="small"
          column={ { xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 } }
          labelStyle={ { width: "120px", padding: "8px" } }
        >
          <Descriptions.Item label="工单编号" >{ currentRow?.orderNo }</Descriptions.Item>
          <Descriptions.Item label="单位名称" >{ currentRow?.company }</Descriptions.Item>
          <Descriptions.Item label="设备名称">{ currentRow?.deviceName }</Descriptions.Item>
          <Descriptions.Item label="工程师姓名">{ currentRow?.engineerName }</Descriptions.Item>
          <Descriptions.Item label="支持人员">{ currentRow?.supporterNames }</Descriptions.Item>
          <Descriptions.Item label="接单时间">{ currentRow?.receivingTime }</Descriptions.Item>
          <Descriptions.Item label="工单状态">{ orderStatusData.find(item => item.value === currentRow?.status)?.label }</Descriptions.Item>
          <Descriptions.Item label="工单来源">{ currentRow?.sourceType }</Descriptions.Item>
          <Descriptions.Item label="工单类型">{ orderTypeMatchInfo(currentRow?.orderType)?.label }</Descriptions.Item>
          <Descriptions.Item label="是否绑定档案">{ currentRow?.portfolioId !== "" ? "已绑定" : "未绑定" }</Descriptions.Item>
          <Descriptions.Item label="工单描述" span={ 2 }>{ currentRow?.workDescription }</Descriptions.Item>
          <Descriptions.Item label="工单图片" span={ 2 }><ImageFlatList imageUrls={ currentRow?.orderImgUrls } /></Descriptions.Item>
          {
            currentRow?.status === "wc" &&
            <>
              <Descriptions.Item label="结单人员">{ currentRow?.subUsername }</Descriptions.Item>
              <Descriptions.Item label="结单时间">{ currentRow?.subTime }</Descriptions.Item>
              <Descriptions.Item label="结单备注" span={ 2 }> { currentRow?.subRemark }</Descriptions.Item>
              <Descriptions.Item label="结单图片" span={ 2 }><ImageFlatList imageUrls={ currentRow?.subImgUrls } /></Descriptions.Item>
            </>
          }
        </Descriptions>
        {
          currentRow?.portfolioId !== "" && currentRow?.status === "wc" &&
          <>
            <Divider orientation="left">更换耗材信息</Divider>
            { currentRow?.workConsumables && currentRow?.workConsumables.length > 0 ?
              <WorkOrderInfoConsumableList dataList={ currentRow?.workConsumables } /> :
              <WorkOrderInfoConsumableList dataList={ [] } /> }
          </>
        }
      </Card >
      {
        currentRow?.portfolioId !== "" &&
        <Card title="绑定档案信息" bordered={ false }>
          <Divider orientation="left">绑定档案耗材信息</Divider>
          { currentRow?.consumables && currentRow?.consumables.length > 0 ?
            <WorkOrderInfoProtolioConsumableList dataList={ currentRow?.consumables } /> :
            < WorkOrderInfoProtolioConsumableList dataList={ [] } /> }
          <Divider orientation="left">绑定档案备件信息</Divider>
          { currentRow?.parts && currentRow?.parts.length > 0 ?
            <WorkOrderInfoProtolioPartList dataList={ currentRow?.parts } /> :
            <WorkOrderInfoProtolioPartList dataList={ [] } /> }
        </Card>
      }
    </Spin>
  );
};

export default DictionaryList;
