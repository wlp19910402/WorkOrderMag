import React from 'react';
import { Spin } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Image, message } from 'antd';
import request from '@/utils/request';
// import OSS from 'ali-oss';
// import moment from 'moment';
// import { encode } from 'js-base64';
// import { Camera } from '@ionic-native/camera';
// import { File, FileEntry } from '@ionic-native/file';
// import { Geolocation } from '@ionic-native/geolocation';
import ImgNull from '@/assets/images/images-null.png';
import styles from './Upload.less';
import { uploadOssSign } from './service'

type UploadProps = {
  // token: API.OssToken;
  title: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

const UploadView: React.FC<UploadProps> = props => {
  const { value, onChange } = props;
  const [ status, setStatus ] = React.useState<'' | 'done' | 'uploading' | 'error'>('');
  const uploadId = "upload1"
  const fileMaxSize = "500KB"
  const uploadImage = async () => {
    const file = document.getElementById(uploadId)?.files[ 0 ];
    console.log(file)
    if (file === undefined) {
      return
    }
    setStatus("uploading");
    if (file.size / 1024 >= parseInt(fileMaxSize.split('KB')[ 0 ])) {
      message.error('上传的图片不能大于5M哦')
      setStatus("");
    } else {
      const response = await uploadOssSign({ originalName: file.name })
      setStatus("error");
      if (!response) {
        setStatus("error");
        return
      }
      const defaultConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS,post',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
        timeout: 0
      }
      const mergeConfig = Object.assign(defaultConfig, {})
      const {fileName} = response.data;
      const {signInfo} = response.data;
      const formData = new FormData();
      formData.append("key", signInfo.dir + fileName);
      formData.append("OSSAccessKeyId", signInfo.accessid);
      formData.append("policy", signInfo.policy);
      formData.append("signature", signInfo.signature);
      formData.append("file", file);
      formData.append("success_action_status", 200);
      // signInfo.host
      request.post('/uploadAliyuncs',
        {
          data: formData,
          headers: mergeConfig.headers,
          timeout: mergeConfig.timeout
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    }
  }
  return (
    <div className={ styles.qmUploadBox }>
      <Spin spinning={ status === 'uploading' }>
        <div className={ styles.qmUploadBox } >
          { status !== "uploading" &&
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
                onClick={ () => {
                  if (onChange) onChange("");
                  setStatus('');
                } }
              />
              <Image width="100%" height="100%" src={ value }></Image>
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
