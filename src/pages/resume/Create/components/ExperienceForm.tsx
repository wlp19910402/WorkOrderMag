import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Table } from 'antd';
import React, { FC, useState } from 'react';
import styles from '../style.less';
import ModalViewWorkExp from './modalViewWorkExp'
import { WorkExperienceDataType } from './API'
import ModalCreateWorkExp from './modalCreateWorkExp'
// {
//   key: `1${index}`,
//     projectName: "",
//       projectTime: "",
//         projectDetail: "",
//           projectSkill: "",
//             workContent: "",
//               projectRole: "",
//                 projectUrl: "",
//                   projectStatus: "",
//                     isNew: true,
//                       editable: true
// }
interface ExperienceFormFormProps {
  value?: WorkExperienceDataType[];
  onChange?: (value: WorkExperienceDataType[]) => void;
}

const ExperienceForm: FC<ExperienceFormFormProps> = ({ value, onChange }) => {
  const [ clickedCancel, setClickedCancel ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ index, setIndex ] = useState(0);
  const [ cacheOriginData, setCacheOriginData ] = useState({});
  const [ cacheWorkExpData, setCacheWorkExpData ] = useState({
    key: "",
    companyName: "",
    workTime: "",
    companyDetail: "",
    jobName: "",
    jobDetail: "",
    projectExpreience: [],
    editable: true,
    isNew: true,
  })
  const [ data, setData ] = useState(value);
  const [ viewWorkExpreienceModal, handelViewWorkExpModal ] = useState<boolean>(false)
  /**
     * 新建窗口的弹窗
     */
  const [ createWorkExpreienceModal, handelWorkExpreienceModal ] = useState<boolean>(false);
  const [ createProjectExpreienceModal, handelProjectExpreienceModal ] = useState<boolean>(false);
  const getRowByKey = (key: string, newData?: WorkExperienceDataType[]) =>
    (newData || data)?.filter((item) => item.key === key)[ 0 ];
  const toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();
    const newData = data?.map((item) => ({ ...item }));
    const target = getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        cacheOriginData[ key ] = { ...target };
        setCacheOriginData(cacheOriginData);
      }
      target.editable = !target.editable;
      setData(newData);
    }
  };
  const newMember = () => {
    const newData = data?.map((item) => ({ ...item })) || [];

    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      companyName: "",
      workTime: "",
      companyDetail: "",
      jobName: "",
      jobDetail: "",
      projectExpreience: [],
      editable: true,
      isNew: true,
    });
    setIndex(index + 1);
    setData(newData);
  };

  const remove = (key: string) => {
    // const newData = data?.filter((item) => item.key !== key) as WorkExperienceDataType[];
    // setData(newData);
    // if (onChange) {
    //   onChange(newData);
    // }
  };
  const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    console.log(e, key)
  }
  // const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
  //   e.persist();
  //   setLoading(true);
  //   setTimeout(() => {
  //     if (clickedCancel) {
  //       setClickedCancel(false);
  //       return;
  //     }
  //     const target = getRowByKey(key) || ({} as any);
  //     if (!target.skillName) {
  //       message.error('技能名称不能为空');
  //       (e.target as HTMLInputElement).focus();
  //       setLoading(false);
  //       return;
  //     }
  //     delete target.isNew;
  //     toggleEditable(e, key);
  //     if (onChange) {
  //       onChange(data as WorkExperienceDataType[]);
  //     }
  //     setLoading(false);
  //   }, 500);
  // };

  // const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
  //   if (e.key === 'Enter') {
  //     saveRow(e, key);
  //   }
  // };
  const createProjectExp = async (value: any) => {

  }
  const createWorkExp = async (value: any) => {
    const newData = data?.map((item) => ({ ...item })) || [];
    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      companyName: "",
      workTime: "",
      companyDetail: "",
      jobName: "",
      jobDetail: "",
      projectExpreience: [],
      ...value,
      editable: true,
      isNew: true,
    });
    handelWorkExpreienceModal(false)
    setIndex(index + 1);
    setData(newData);
    // const success = await handleAdd(value as TableListItem);
    // if (success) {
    //   handelWorkExpreienceModal(false);
    //   if (actionRef.current) {
    //     actionRef.current.reload();
    //   }
    // }
  }
  const cancel = (e: React.MouseEvent, key: string) => {
    setClickedCancel(true);
    e.preventDefault();
    const newData = [ ...(data as WorkExperienceDataType[]) ];
    // 编辑前的原始数据
    let cacheData = [];
    cacheData = newData.map((item) => {
      if (item.key === key) {
        if (cacheOriginData[ key ]) {
          const originItem = {
            ...item,
            ...cacheOriginData[ key ],
            editable: false,
          };
          delete cacheOriginData[ key ];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }
      return item;
    });
    setData(cacheData);
    setClickedCancel(false);
  };

  const columns = [
    {
      title: '公司名称',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text: string, record: WorkExperienceDataType) => text,
    },
    {
      title: '来公司时间',
      dataIndex: 'workTime',
      key: 'workTime',
      render: (text: string, record: WorkExperienceDataType) => text,
    },
    {
      title: '岗位',
      dataIndex: 'jobName',
      key: 'jobName',
      render: (text: string, record: WorkExperienceDataType) => text,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: WorkExperienceDataType) => {
        if (!!record.editable && loading) {
          return null;
        }
        return (
          <span >
            <a onClick={ () => { setCacheWorkExpData(record); handelViewWorkExpModal(true) } }>查看</a>
            <Divider type="vertical" />
            <a onClick={ (e) => toggleEditable(e, record.key) }>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={ () => remove(record.key) }>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  const columns2 = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (text: string, record: WorkExperienceDataType) => text,
    },
    {
      title: '项目时间',
      dataIndex: 'projectTime',
      key: 'projectTime',
      render: (text: string, record: WorkExperienceDataType) => text,
    },
    {
      title: '项目角色',
      dataIndex: 'projectRole',
      key: 'projectRole',
      render: (text: string, record: WorkExperienceDataType) => text,
    },
    {
      title: '项目状态',
      dataIndex: 'projectStatus',
      key: 'projectStatus',
      render: (text: string, record: WorkExperienceDataType) => text,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: WorkExperienceDataType) => {
        if (!!record.editable && loading) {
          return null;
        }
        return (
          <span >
            <a onClick={ (e) => toggleEditable(e, record.key) }>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={ () => remove(record.key) }>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  return (
    <>
      <Table<WorkExperienceDataType>
        loading={ loading }
        columns={ columns }
        dataSource={ data }
        pagination={ false }
        rowClassName={ (record) => (record.editable ? styles.editable : '') }
        expandable={ {
          expandedRowRender: record => (<div style={ { backgroundColor: "#d4eaff", padding: "20px" } }>
            <Table<WorkExperienceDataType>
              loading={ loading }
              columns={ columns2 }
              dataSource={ record && record.projectExpreience ? record.projectExpreience : undefined }
              pagination={ false }
              rowClassName={ (record) => (record.editable ? styles.editable : '') }
            />
            <Button
              style={ { width: '100%', marginTop: 16, marginBottom: 8 } }
              type="dashed"
              onClick={ handelProjectExpreienceModal }
            ><PlusOutlined />
              新增项目经验
            </Button>
          </div>),
        } }
      />
      <Button
        style={ { width: '100%', marginTop: 16, marginBottom: 8 } }
        type="dashed"
        onClick={ () => { handelWorkExpreienceModal(true) } }
      >
        <PlusOutlined />
        新增工作经验
      </Button>

      <ModalCreateWorkExp
        createWorkExpreienceModal={ createWorkExpreienceModal }
        handelWorkExpreienceModal={ handelWorkExpreienceModal }
        CreateWorkExp={ createWorkExp }
      />
      <ModalViewWorkExp
        hide={ handelViewWorkExpModal }
        visible={ viewWorkExpreienceModal }
        initialValues={ cacheWorkExpData }
      />
    </>
  );
};

export default ExperienceForm;
