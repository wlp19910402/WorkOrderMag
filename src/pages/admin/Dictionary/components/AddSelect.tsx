// import { Select, Spin } from 'antd';
import React from 'react';
import { fetchDicTypeSelect } from '@/pages/admin/Dictionary/service'
import { ProFormSelect } from '@ant-design/pro-form'
import { OptionProps } from './ModalModifyForm'
interface SelectProps {
  name: string;
  label: string;
  option: OptionProps[];
  value: string;
  formRefCurrent: any;
  isControlType: boolean;
  onChange?: (value: string) => void;
  addSelect: any[];
  handleAddSelect: React.Dispatch<React.SetStateAction<any[]>>;
}
const AddSelect: React.FC<SelectProps> = (props) => {
  const { name, label, option, value, formRefCurrent, isControlType, addSelect, handleAddSelect } = props
  return (
    <ProFormSelect
      name={ name }
      label={ label }
      options={ option }
      placeholder={ `请选择${label}` }
      initialValue={ value }
      allowClear={ false }
      normalize={ (val, preVal, allVals) => {
        if (isControlType) {
          let name2 = option.find(item => item.value === val)?.label
          formRefCurrent.setFieldsValue({ "type": val, "name": name2 });
        } else {
          handleAddSelect(addSelect.filter((item, index) => index === 0))
          formRefCurrent.setFieldsValue({ "addSelect-1": undefined })
          fetchDicTypeSelect(val).then(res => {
            let tmp = addSelect;
            tmp[ 1 ].option = res
            handleAddSelect(tmp);
            formRefCurrent.setFieldsValue({ "type": res[ 0 ].value, "name": res[ 0 ].label, "addSelect-1": res[ 0 ].value });
          })
        }
        return val
      } }
    />
  )
};

export default AddSelect