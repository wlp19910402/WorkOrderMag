import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Table } from 'antd';
import React, { FC, useState } from 'react';
import ModalViewWorkExp from './modalViewWorkExp'
import { WorkExperienceDataType, workExpDefault } from './API.d'
import ModalModifyWorkExp from './ModalModifyWorkExp'
import ModalCreateProjectExp from './ModalCreateProjectExp'
interface ExperienceFormFormProps {
  value?: WorkExperienceDataType[];
  onChange?: (value: WorkExperienceDataType[]) => void;
}

const ExperienceForm: FC<ExperienceFormFormProps> = ({ value, onChange }) => {
  const [ clickedCancel, setClickedCancel ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ index, setIndex ] = useState(0);
  const [ projectIndex, setProjectIndex ] = useState(0);
  const [ cacheOriginData, setCacheOriginData ] = useState({});
  const [ cacheWorkExpData, setCacheWorkExpData ] = useState(workExpDefault)
  const [ data, setData ] = useState(value);
  const [ viewWorkExpreienceModal, handelViewWorkExpModal ] = useState<boolean>(false)
  /**
     * 新建窗口的弹窗
     */
  const [ createWorkExpreienceModal, handelWorkExpreienceModal ] = useState<boolean>(false);
  const [ createProjectExpreienceModal, handelProjectExpreienceModal ] = useState<boolean>(false);
  const [ workKey, setCurrentWorkKey ] = useState<string>('')
  const [ projectKey, setCurrentProjectKey ] = useState<string>('')
  const [ isEditWorkExp, setEditWorkExp ] = useState<boolean>(false);
  const getRowByKey = (key: string, newData?: WorkExperienceDataType[]) =>
    (newData || data)?.filter((item) => item.key === key)[ 0 ];
  //编辑工作经验
  const workEditTable = async (e: React.MouseEvent | React.KeyboardEvent, record: WorkExperienceDataType) => {
    e.preventDefault();
    await setEditWorkExp(true);
    await setCacheWorkExpData(record);
    setCurrentWorkKey(record.key)
    handelWorkExpreienceModal(true)
  };
  const workCreateTable = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    await setEditWorkExp(false);
    await setCacheWorkExpData({ ...workExpDefault });
    handelWorkExpreienceModal(true)
  };
  const removeWorkExp = (key: string) => {
    const newData = data?.filter((item) => item.key !== key) as WorkExperienceDataType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
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
    const newData = data?.map((item) => ({ ...item })) || [];
    newData.forEach(item => {
      if ((item.key === workKey)) {
        item.projectExpreience.push({
          key: '',
          projectName: "",
          projectTime: "",
          projectDetail: "",
          projectSkill: "",
          workContent: "",
          projectRole: "",
          projectUrl: "",
          projectStatus: "",
          ...value
        })
        setProjectIndex(projectIndex + 1)
      }
    })
    setData(undefined);
    setData(newData);
    handelProjectExpreienceModal(false)
  }
  const handelProjectExpreience = async (key: string) => {
    setCurrentWorkKey(key)
    handelProjectExpreienceModal(true)
  }
  //保存工作经验
  const saveWorkExp = async (value: any) => {
    const newData = data?.map((item) => ({ ...item })) || [];
    if (isEditWorkExp) {
      newData.forEach((item: any, index: number) => {
        if (item.key === workKey) {
          newData[ index ] = {
            ...item,
            ...value
          }
        }
      })
    } else {
      newData.push({
        ...workExpDefault,
        key: `NEW_TEMP_ID_${index}`,
        ...value
      });
      setIndex(index + 1);
    }
    handelWorkExpreienceModal(false)
    setData(undefined)
    setData(newData);
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
        return (
          <span >
            <a onClick={ () => { setCacheWorkExpData(record); handelViewWorkExpModal(true) } }>查看</a>
            <Divider type="vertical" />
            <a onClick={ (e) => { workEditTable(e, record) } }>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={ () => removeWorkExp(record.key) }>
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

        return (
          <span >
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
        expandable={ {
          expandedRowRender: record => (<div style={ { backgroundColor: "#d4eaff", padding: "20px" } }>
            <Table<WorkExperienceDataType>
              loading={ loading }
              columns={ columns2 }
              dataSource={ record && record.projectExpreience ? record.projectExpreience : [] }
              pagination={ false }
            />
            <Button
              style={ { width: '100%', marginTop: 16, marginBottom: 8 } }
              type="dashed"
              onClick={ () => handelProjectExpreience(record.key) }
            ><PlusOutlined />
              新增项目经验
            </Button>
          </div>),
        } }
      />
      <Button
        style={ { width: '100%', marginTop: 16, marginBottom: 8 } }
        type="dashed"
        onClick={ (e: React.MouseEvent | React.KeyboardEvent) => { workCreateTable(e) } }
      >
        <PlusOutlined />
        新增工作经验
      </Button>
      { createWorkExpreienceModal ? <ModalModifyWorkExp
        createWorkExpreienceModal={ createWorkExpreienceModal }
        handelWorkExpreienceModal={ handelWorkExpreienceModal }
        saveWorkExp={ saveWorkExp }
        editData={ cacheWorkExpData }
      /> : <></> }

      <ModalViewWorkExp
        hide={ handelViewWorkExpModal }
        visible={ viewWorkExpreienceModal }
        initialValues={ cacheWorkExpData }
      />
      <ModalCreateProjectExp
        createProjectExpreienceModal={ createProjectExpreienceModal }
        handelProjectExpreienceModal={ handelProjectExpreienceModal }
        CreateProjectExp={ createProjectExp }
      />
    </>
  );
};

export default ExperienceForm;
