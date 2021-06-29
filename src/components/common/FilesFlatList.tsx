import { List } from 'antd';
import React from 'react';
interface ImageFlatDataProps {
  filesUrls?: string[];
}
const ImageFlat: React.FC<ImageFlatDataProps> = ({ filesUrls }) => {
  return (
    filesUrls && filesUrls.length > 0 ?
      (
        <List
          size="small"
          bordered
          dataSource={ filesUrls }
          renderItem={ item => <List.Item>{ item }</List.Item> }
        />

      ) : <span style={ { color: "#999999" } }>暂无附件</span>
  )
};

export default ImageFlat