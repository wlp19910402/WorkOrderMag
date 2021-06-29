import React from 'react';
import { Spin } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { message } from 'antd';
import OSS from 'ali-oss';
// import ImgNull from '@/assets/images/images-null.png';
import styles from './Upload.less';
import { uploadStsSign } from './service'

type UploadProps = {
  uploadId: string;
  value: string;
  onChange: (url: string) => void;
}
const UploadView: React.FC<UploadProps> = props => {
  const { uploadId, value = '', onChange } = props;
  const [ status, setStatus ] = React.useState<'' | 'done' | 'uploading' | 'error'>(value === '' ? '' : 'done');

  const uploadImage = async () => {
    const fileInput: any = document.getElementById(uploadId)
    const file = fileInput?.files[ 0 ]
    if (file === undefined) {
      return
    }
    setStatus("uploading");

    const response = await uploadStsSign({ originalName: file.name })
    if (!response) {
      setStatus("error");
      return
    }
    const stsRes = response.data
    const ossToken: OSS.Options = {
      accessKeyId: stsRes.AccessKeyId,
      accessKeySecret: stsRes.AccessKeySecret,
      stsToken: stsRes.SecurityToken,
      bucket: stsRes.bucketName,
      region: stsRes.region
    }
    const client = new OSS(ossToken)
    const back = JSON.parse(stsRes.callback)
    const callback: OSS.ObjectCallback = {
      url: back.callbackUrl,
      body: back.callbackBody,
      contentType: back.callbackBodyType
    }
    const result: any = await client.put(
      stsRes.resourceKey,
      file,
      { callback }
    );
    if (result.data.code === 0) {
      onChange(result.url)
      setStatus("done");
    } else {
      message.error(result.data.message);
      setStatus("error");
    }
  }
  return (
    <div className={ styles.qmUploadContainer }>
      <Spin spinning={ status === 'uploading' }>
        <div className={ styles.qmUploadBox } >
          { status !== "uploading" && status !== "done" &&
            <input id={ uploadId } type="file" onChange={ () => {
              if (
                (!value || value === '') &&
                (status === '' || status === 'error')
              ) {
                uploadImage();
              }
            } } /> }

          { value && value !== '' ? (
            <>
              <CloseOutlined
                className={ styles.closeBtn }
                onClick={ (e) => {
                  e.stopPropagation();
                  if (onChange) onChange("");
                } }
              />
              <div>{ value }</div>
            </>
          ) : (
            <>
              { status === 'error' ? (
                <>
                  <span className={ styles.uploadImgError }>上传失败,点击重新上传</span>
                </>
              ) : (
                <>
                  <PlusOutlined className={ styles.qmAntdIcon } />
                </>
              ) }
            </>
          ) }
        </div>
      </Spin>
    </div>
  );
};

export default UploadView;
