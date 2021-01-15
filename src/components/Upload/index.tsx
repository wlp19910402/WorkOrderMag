import React from 'react';
import { Spin } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Image, message } from 'antd';
import OSS from 'ali-oss';
import ImgNull from '@/assets/images/images-null.png';
import styles from './Upload.less';
import { uploadStsSign } from './service'
interface UploadProps {
  uploadId: string;
  value: string;
  onChange: (url: string) => void;
}
const UploadView: React.FC<UploadProps> = props => {
  const { uploadId, value = '', onChange } = props;
  const [ status, setStatus ] = React.useState<'' | 'done' | 'uploading' | 'error'>(value === '' ? '' : 'done');
  // const fileMaxSize = "500KB"
  const uploadImage = async () => {
    let file = document.getElementById(uploadId)?.files[ 0 ];
    console.log(file)
    if (file == undefined) {
      return
    }
    setStatus("uploading");
    // if (file.size / 1024 >= parseInt(fileMaxSize.split('KB')[ 0 ])) {
    //   message.error('上传的图片不能大于5M哦')
    //   setStatus("");
    //   return
    // }
    let response = await uploadStsSign({ originalName: file.name })
    if (!response) {
      setStatus("error");
      return
    }
    let stsRes = response.data
    const ossToken: OSS.Options = {
      accessKeyId: stsRes.AccessKeyId,
      accessKeySecret: stsRes.AccessKeySecret,
      stsToken: stsRes.SecurityToken,
      bucket: stsRes.bucketName,
      region: stsRes.region
    }
    const client = new OSS(ossToken)
    let back = JSON.parse(stsRes.callback)
    let callback: OSS.ObjectCallback = {
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
              <Image
                width="100%"
                height="100%"
                src={ `${value}?x-oss-process=image/resize,h_100,m_lfit` }
                previewPrefixCls={ value }
              // preview={ {
              //   src: value,
              //   visible: true
              // } }
              ></Image>
            </>
          ) : (
              <>
                { status === 'error' ? (
                  <>
                    <img src={ ImgNull }></img>
                    <span className={ styles.uploadImgError }>上传失败</span>
                  </>
                ) : (
                    <PlusOutlined className={ styles.qmAntdIcon } />
                  ) }
              </>
            ) }
        </div>
      </Spin>
    </div>
  );
};

export default UploadView;
