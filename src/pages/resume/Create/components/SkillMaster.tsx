import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message, Slider, Progress, Card } from 'antd';
import React, { FC, useState } from 'react';
import { SkillMasterDateType } from '../../API'
import styles from '../style.less';

interface SkillMasterModifyDataType extends SkillMasterDateType {
  isNew?: boolean;
  editable?: boolean;
}
interface SkillMasterProps {
  value?: SkillMasterModifyDataType[];
  onChange?: (value: SkillMasterModifyDataType[]) => void;
}

const SkillMaster: FC<SkillMasterProps> = ({ value, onChange }) => {
  const [ clickedCancel, setClickedCancel ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ index, setIndex ] = useState(0);
  const [ cacheOriginData, setCacheOriginData ] = useState({});
  const [ data, setData ] = useState(value);
  const getRowByKey = (key: string, newData?: SkillMasterModifyDataType[]) =>
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
      skillName: "",
      skillProficiency: 0,
      editable: true,
      isNew: true,
    });

    setIndex(index + 1);
    setData(newData);
  };

  const remove = (key: string) => {
    const newData = data?.filter((item) => item.key !== key) as SkillMasterModifyDataType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string,
  ) => {
    const newData = [ ...(data as SkillMasterModifyDataType[]) ];
    const target = getRowByKey(key, newData);
    if (target) {
      target[ fieldName ] = e.target.value;
      setData(newData);
    }
  };
  const sliderChange = (
    e: any,
    fieldName: string,
    key: string
  ) => {
    const newData = [ ...(data as SkillMasterModifyDataType[]) ];
    const target = getRowByKey(key, newData);
    if (target) {
      target[ fieldName ] = e;
      setData(newData);
    }
  }
  const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.persist();
    setLoading(true);
    setTimeout(() => {
      if (clickedCancel) {
        setClickedCancel(false);
        return;
      }
      const target = getRowByKey(key) || ({} as any);
      if (!target.skillName) {
        message.error('技能名称不能为空');
        (e.target as HTMLInputElement).focus();
        setLoading(false);
        return;
      }
      delete target.isNew;
      toggleEditable(e, key);
      if (onChange) {
        onChange(data as SkillMasterModifyDataType[]);
      }
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter') {
      saveRow(e, key);
    }
  };

  const cancel = (e: React.MouseEvent, key: string) => {
    setClickedCancel(true);
    e.preventDefault();
    const newData = [ ...(data as SkillMasterModifyDataType[]) ];
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
      title: '技能名称',
      dataIndex: 'skillName',
      key: 'skillName',
      width: '40%',
      render: (text: string, record: SkillMasterModifyDataType) => {
        if (record.editable) {
          return (
            <Input
              value={ text }
              autoFocus
              onChange={ (e) => handleFieldChange(e, 'skillName', record.key) }
              onKeyPress={ (e) => handleKeyPress(e, record.key) }
              placeholder="技能名称"
            />
          );
        }
        return text;
      },
    },
    {
      title: '熟练程度',
      dataIndex: 'skillProficiency',
      key: 'skillProficiency',
      width: '40%',
      render: (text: number = 30, record: SkillMasterModifyDataType) => {
        if (record.editable) {
          return (
            <Slider defaultValue={ text } onChange={ (e: any) => sliderChange(e, 'skillProficiency', record.key) } />
          );
        }
        return (<Progress percent={ text } />);
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: SkillMasterModifyDataType) => {
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span style={ { float: "right" } }>
                <a onClick={ (e) => saveRow(e, record.key) }>添加</a>
                <Divider type="vertical" />
                <Popconfirm title="是否要删除此行？" onConfirm={ () => remove(record.key) }>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span style={ { float: "right" } }>
              <a onClick={ (e) => saveRow(e, record.key) }>保存</a>
              <Divider type="vertical" />
              <a onClick={ (e) => cancel(e, record.key) }>取消</a>
            </span>
          );
        }
        return (
          <span style={ { float: "right" } }>
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
    <Card title="技能掌握"
      className={ styles.card }
      bordered={ false }
      extra={ <Button type="primary" key="primary" onClick={ newMember }><PlusOutlined />新建</Button> }
    >
      <Table<SkillMasterModifyDataType>
        loading={ loading }
        columns={ columns }
        dataSource={ data }
        pagination={ false }
        rowClassName={ (record) => (record.editable ? styles.editable : '') }
      />
    </Card>
  );
};

export default SkillMaster;
