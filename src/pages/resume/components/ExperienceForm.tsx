import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Table, Card } from 'antd';
import React, { FC, useState } from 'react';
import ModalViewWorkExp from './ModalViewWorkExp'
import { WorkExperienceDataType, workExpDefault, ProjectExperiencesDataType, projectExpDefault } from '../API.d'
import ModalModifyWorkExp from './ModalModifyWorkExp'
import ModalModifyProjectExp from './ModalModifyProjectExp'
import ModalViewProjectExp from './ModalViewProjectExp'
import styles from '../style.less';
interface ExperienceFormFormProps {
  value?: WorkExperienceDataType[];
  onChange?: (value: WorkExperienceDataType[]) => void;
}
const ExperienceForm: FC<ExperienceFormFormProps> = ({ value, onChange }) => {
  const [ loading, setLoading ] = useState(false);
  const [ index, setIndex ] = useState(0);
  const [ projectIndex, setProjectIndex ] = useState(0);
  const [ cacheWorkExpData, setCacheWorkExpData ] = useState(workExpDefault)
  const [ cacheProjectExpData, setCacheProjectExpData ] = useState(projectExpDefault)
  const [ data, setData ] = useState(value);
  const [ viewWorkExpModalShow, handelViewWorkExpModal ] = useState<boolean>(false)
  const [ viewProjectExpModalShow, handelViewProjectExpModal ] = useState<boolean>(false)
  const [ modifyWorkExpModalShow, handelWorkExpModal ] = useState<boolean>(false);
  const [ modifyProjectExpModalShow, handelProjectExpModal ] = useState<boolean>(false);
  const [ workKey, setCurrentWorkKey ] = useState<string>('')
  const [ projectKey, setCurrentProjectKey ] = useState<string>('')
  const [ isEditWorkExp, setEditWorkExp ] = useState<boolean>(false);
  const [ isEditProjectExp, setEditProjectExp ] = useState<boolean>(false);
  //编辑工作经验
  const workEditTable = async (e: React.MouseEvent | React.KeyboardEvent, record: WorkExperienceDataType) => {
    e.preventDefault();
    await setEditWorkExp(true);
    await setCacheWorkExpData(record);
    setCurrentWorkKey(record.key)
    handelWorkExpModal(true)
  };
  //创建工作经验
  const workCreateTable = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    await setEditWorkExp(false);
    await setCacheWorkExpData({ ...workExpDefault });
    handelWorkExpModal(true)
  };
  //删除工作经验
  const removeWorkExp = (key: string) => {
    const newData = data?.filter((item) => item.key !== key) as WorkExperienceDataType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };
  //保存工作经验
  const saveWorkExp = async (value: any) => {
    const newData = data?.map((item) => ({ ...item })) || [];
    if (isEditWorkExp) {
      newData?.forEach((item: any, index: number) => {
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
    handelWorkExpModal(false)
    setData(undefined)
    setData(newData);
  }
  //删除项目经验
  const removeProjectExp = (record: ProjectExperiencesDataType) => {
    const newData = data?.map((item) => {
      if (item.key === record.workKey) {
        return { ...item, projectExpreience: item.projectExpreience?.filter(ite => ite.key !== record.key) };
      }
      return item
    }) as WorkExperienceDataType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };
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
  //保存项目经验
  const saveProjectExp = async (value: ProjectExperiencesDataType) => {
    const newData = data?.map((item) => ({ ...item })) || [];
    newData.forEach(item => {
      if ((item.key === workKey)) {
        if (isEditProjectExp) {
          item.projectExpreience.forEach((ite, index) => {
            if (ite.key === projectKey) {
              item.projectExpreience[ index ] = {
                ...ite,
                ...value
              }
            }
          })
        } else {
          item.projectExpreience.push({
            ...projectExpDefault,
            key: `NEW_TEMP_ID_${projectIndex}`,
            ...value
          })
          setProjectIndex(projectIndex + 1)
        }
      }
    })

    setData(undefined);
    setData(newData);
    handelProjectExpModal(false)
  }
  //编辑项目经验
  const projectEditTable = async (e: React.MouseEvent | React.KeyboardEvent, record: ProjectExperiencesDataType) => {
    e.preventDefault();
    await setEditProjectExp(true);
    await setCacheProjectExpData(record);
    setCurrentWorkKey(record.workKey || '')
    setCurrentProjectKey(record.key || '')
    handelProjectExpModal(true)
  };
  //创建项目经验
  const projectCreateTable = async (e: React.MouseEvent | React.KeyboardEvent, workKey: string) => {
    e.preventDefault();
    setCurrentWorkKey(workKey)
    await setEditProjectExp(false);
    await setCacheProjectExpData({ ...projectExpDefault });
    handelProjectExpModal(true)
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
      render: (text: string, record: ProjectExperiencesDataType) => text,
    },
    {
      title: '项目时间',
      dataIndex: 'projectTime',
      key: 'projectTime',
      render: (text: string, record: ProjectExperiencesDataType) => text,
    },
    {
      title: '项目角色',
      dataIndex: 'projectRole',
      key: 'projectRole',
      render: (text: string, record: ProjectExperiencesDataType) => text,
    },
    {
      title: '项目状态',
      dataIndex: 'projectStatus',
      key: 'projectStatus',
      render: (text: string, record: ProjectExperiencesDataType) => text,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: ProjectExperiencesDataType) => {
        return (
          <span>
            <a onClick={ () => { setCacheProjectExpData(record); handelViewProjectExpModal(true) } }>查看</a>
            <Divider type="vertical" />
            <a onClick={ (e) => { projectEditTable(e, record) } }>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={ () => removeProjectExp(record) }>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  return (
    <Card title="工作经验"
      extra={ <Button type="primary" key="primary" onClick={ (e: React.MouseEvent | React.KeyboardEvent) => { workCreateTable(e) } }><PlusOutlined />新建</Button> } bordered={ false }>
      <Table<WorkExperienceDataType>
        loading={ loading }
        columns={ columns }
        dataSource={ data }
        pagination={ false }
        expandable={ {
          expandedRowRender: record => (<div style={ { backgroundColor: "#d4eaff", padding: "12px" } }>
            <Table<ProjectExperiencesDataType>
              loading={ loading }
              columns={ columns2 }
              dataSource={ record && record.projectExpreience ? record.projectExpreience : [] }
              pagination={ false }
            />
            <Button
              style={ { width: '100%', marginTop: 16, marginBottom: 8 } }
              type="dashed"
              onClick={ (e: React.MouseEvent | React.KeyboardEvent) => projectCreateTable(e, record.key) }
            ><PlusOutlined />
              新增项目经验
            </Button>
          </div>),
        } }
      />
      { modifyWorkExpModalShow ? <ModalModifyWorkExp
        modifyWorkExpModalShow={ modifyWorkExpModalShow }
        handelWorkExpModal={ handelWorkExpModal }
        saveWorkExp={ saveWorkExp }
        editData={ cacheWorkExpData }
        isEditWorkExp={ isEditWorkExp }
      /> : <></> }
      <ModalViewWorkExp
        hide={ handelViewWorkExpModal }
        visible={ viewWorkExpModalShow }
        initialValues={ cacheWorkExpData }
      />
      {modifyProjectExpModalShow ? <ModalModifyProjectExp
        modifyProjectExpModalShow={ modifyProjectExpModalShow }
        handelProjectExpModal={ handelProjectExpModal }
        saveProjectExp={ saveProjectExp }
        editData={ cacheProjectExpData }
        isEditProjectExp={ isEditProjectExp }
      /> : <></> }
      <ModalViewProjectExp
        hide={ handelViewProjectExpModal }
        visible={ viewProjectExpModalShow }
        initialValues={ cacheProjectExpData }
      />
    </Card>
  );
};
export default ExperienceForm;