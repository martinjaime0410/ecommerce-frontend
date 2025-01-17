import { useState } from 'react';
import { modalType } from '@/utils/helpers/types';
import { Upload, Modal } from 'antd';
import type { UploadFile } from 'antd';
import { getBase64 } from '@/utils/helpers/base';
import type { UploadProps } from 'antd/es/upload';
import type { RcFile } from 'antd/lib/upload';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@umijs/max';

interface IGallery {
  fileList: UploadFile[];
  setFileList: (values: UploadFile[]) => void;
}

const Gallery: React.FC<IGallery> = ({ fileList, setFileList }) => {
  const [previewTitle, setPreviewTitle] = useState('');
  const [modalOpen, setModal] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const authData = JSON.parse(localStorage.getItem('authdata'));

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setModal(modalType.Preview);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChangeImage: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleCancel = () => setModal(modalType.Close);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <p>
        <FormattedMessage id="pages.products.coreProduct.gallery.description" />
      </p>
      <Upload
        accept="image/png, image/jpeg, image/jpg"
        multiple={true}
        action={`${BACKEND_URL}/api/images`}
        headers={{ Authorization: `Bearer ${authData?.access_token}` }}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChangeImage}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={modalOpen == modalType.Preview} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default Gallery;
