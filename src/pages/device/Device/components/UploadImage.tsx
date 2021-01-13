import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
interface UploadProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}
function getBase64 (file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={ { marginTop: 8 } }>Upload</div>
  </div>
);
const UploadView: React.FC<UploadProps> = props => {
  const [ fileList, setFileList ] = React.useState<any[]>([ {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  // {
  //   uid: '-2',
  //   name: 'image.png',
  //   status: 'done',
  //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  // },
  // {
  //   uid: '-3',
  //   name: 'image.png',
  //   status: 'done',
  //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  // },
  // {
  //   uid: '-4',
  //   name: 'image.png',
  //   status: 'done',
  //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  // },
  // {
  //   uid: '-xxx',
  //   percent: 50,
  //   name: 'image.png',
  //   status: 'uploading',
  //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  // },
  {
    uid: '-5',
    name: 'image.png',
    status: 'error',
  }, ]);
  const [ previewTitle, hindlePreviewTitle ] = React.useState<string>();
  const [ previewImage, hindlePreviewImage ] = React.useState<string>();
  const [ previewVisible, hindlePreviewVisible ] = React.useState<boolean>(false);

  const handleCancel = () => hindlePreviewVisible(false);
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    hindlePreviewImage(file.url || file.preview)
    hindlePreviewVisible(true);
    hindlePreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  };

  const handleChange = (res: any) => {
    setFileList(res.setFileList);
  };

  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={ fileList }
        onPreview={ handlePreview }
        onChange={ handleChange }
      >
        { fileList?.length >= 6 ? null : uploadButton }
      </Upload>

      <Modal
        visible={ previewVisible }
        title={ previewTitle }
        footer={ null }
        onCancel={ handleCancel }
      >
        <img alt="example" style={ { width: '100%' } } src={ previewImage } />
      </Modal>
      {/* {fileList?.length } */ }
    </>
  );
};

export default UploadView;
