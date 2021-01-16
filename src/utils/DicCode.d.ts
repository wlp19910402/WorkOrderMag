/**
 * 字典类型针对的值，为了进行其他数据进行查询
 */
const DicCode = {
  DEVICE_TYPE: "dev_type",// 设备类型
  CONSUMABLE_TYPE: "hc_type",//耗材类型
  PART_TYPE: "bj_type"//备件类型
}

export const dicTypeData = [
  { label: "设备类型", value: DicCode.DEVICE_TYPE },
  { label: "耗材类型", value: DicCode.CONSUMABLE_TYPE },
  { label: "备件类型", value: DicCode.PART_TYPE }
]

export const dicClassData = {
  "dev_type": [
    { label: "设备类型", value: 0 },
    { label: "设备品牌", value: 1 },
    { label: "设备型号", value: 2 }
  ],
  "hc_type": [
    { label: "耗材类型", value: 0 },
    { label: "耗材型号", value: 1 }
  ],
  "bj_type": [
    { label: "备件类型", value: 0 },
    { label: "备件型号", value: 1 }
  ],
}

export const matchDicClass = (type: any) => dicClassData[ type ]

export default DicCode