import React from 'react';
import { Spin } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Image, message } from 'antd';
// import OSS from 'ali-oss';
// import moment from 'moment';
// import { encode } from 'js-base64';
// import { Camera } from '@ionic-native/camera';
// import { File, FileEntry } from '@ionic-native/file';
// import { Geolocation } from '@ionic-native/geolocation';
import ImgNull from '@/assets/images/images-null.png';
import styles from './Upload.less';
import { uploadOssSign, uploadFile } from './service'
interface UploadProps {
  // token: API.OssToken;
  title: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

const UploadView: React.FC<UploadProps> = props => {
  const { title, name, value, onChange } = props;
  const [ status, setStatus ] = React.useState<'' | 'done' | 'uploading' | 'error'>('');
  const uploadId = "upload1"
  const fileMaxSize = "500KB"
  const uploadImage = async (v: any) => {
    let file = document.getElementById(uploadId)?.files[ 0 ];
    console.log(file)
    if (file == undefined) {
      return
    }
    setStatus("uploading");
    if (file.size / 1024 >= parseInt(fileMaxSize.split('KB')[ 0 ])) {
      message.error('上传的图片不能大于5M哦')
      setStatus("");
    } else {
      let response = await uploadOssSign({ originalName: file.name })
      setStatus("error");
      if (!response) {
        setStatus("error");
        return
      }
      const fileName = response.data.fileName;
      const signInfo = response.data.signInfo;
      let formData = new FormData();
      formData.append("key", signInfo.dir + fileName);
      formData.append("OSSAccessKeyId", signInfo.accessid);
      formData.append("policy", signInfo.policy);
      formData.append("signature", signInfo.signature);
      formData.append("file", file);
      formData.append("success_action_status", 200);
      console.log(formData)
      console.log(formData.get("key"), "3333", formData);
      let res = await uploadFile({ file: formData })
      console.log(res);
      // if (!this.ossClient) {
      //   await this.fetchOssToken()
      // }
      // await this.ossPutUpload(idx, file, fileName)
    }
    // this.isRequestLoading[ idx ] = false
    // this.isRequestLoading = [ ...this.isRequestLoading ]
    // try {
    //   const fileUri = await Camera.getPicture({
    //     quality: 25,
    //     destinationType: Camera.DestinationType.FILE_URI,
    //     encodingType: Camera.EncodingType.JPEG,
    //     mediaType: Camera.MediaType.PICTURE,
    //     saveToPhotoAlbum: false,
    //   })
    //   console.log(fileUri);
    //   setStatus('uploading');
    //   const entry: FileEntry = (await File.resolveLocalFilesystemUrl(fileUri)) as FileEntry;
    //   entry.file(
    //     async file => {
    //       try {
    //         // 初始化OSS客户端
    //         const client = new OSS({
    //           ...token,
    //         });
    //         // 上传文件
    //         const result = await client.put(
    //           `${token.uploadFullPath}${name}-${Date.now()}.jpeg`,
    //           file,
    //         );
    //         console.log(result);
    //         if (onChange) {
    //           // 设置水印
    //           const geo = await Geolocation.getCurrentPosition();
    //           const lat_lon = `${geo.coords.latitude}:${geo.coords.longitude}`;
    //           const watermarks = `watermark,text_${encode(moment().format('YYYY-MM-DD HH:mm:ss'))},color_77CC99,size_60,g_nw,x_20,y_20/watermark,text_${encode(lat_lon)},color_77CC99,size_60,g_se,x_20,y_20`;
    //           onChange(`${result.url}?x-oss-process=image/resize,w_2000,h_2000/${watermarks}`);
    //         }
    //         setStatus('done');
    //       } catch (error) {
    //         console.log(error);
    //         setStatus('error');
    //       }
    //     },
    //     error => {
    //       console.log(error);
    //       setStatus('error');
    //     },
    //   );
    // } catch (error) {
    //   console.log(error);
    //   setStatus('');
    // }
  }

  return (
    <div className={ styles.qmUploadBox }>
      <Spin spinning={ status === 'uploading' }>
        <div className={ styles.qmUploadBox } >
          { status !== "uploading" &&
            <input id={ uploadId } type="file" onChange={ (v) => {
              if (
                (!value || value === '') &&
                (status === '' || status === 'error')
              ) {
                uploadImage(v);
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
        <div
          style={ { fontSize: '12px', textAlign: 'center', color: '#999999' } }
        >
          { title }

        </div>
      </Spin>
    </div>
  );
};

export default UploadView;
