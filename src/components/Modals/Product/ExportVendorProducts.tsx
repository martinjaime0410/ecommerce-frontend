import { OModal } from '@/components/Globals/OModal';
import { OButton } from '@/components/Globals/OButton';
import { Col, Row } from 'antd';

interface IExportVendorProduct {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ExportVendorProduct: React.FC<IExportVendorProduct> = ({ isOpen, onClose, onSave }) => {
  const handleSave = () => onSave();

  return (
    <OModal
      title={'Select How To Export Vendor Products'}
      width={400}
      isOpen={isOpen}
      handleCancel={onClose}
      buttons={[
        {
          key: 'back',
          type: 'default',
          btnLabel: 'Close',
          onClick: onClose,
        },
      ]}
    >
      <>
        <p>Skubana gives you the option to export vendor products by downloading an individial file
          for each vendor, or by exporting one global file that contains all your vendor products.</p>

        <Row gutter={16}>
          <Col span={12}>
            <OButton type="primary" btnText={'Export By Vendor'} style={{ width: '100%', marginBottom: 100 }}/>
            <p>Export vendor products through individual file for each vendor.</p>
          </Col>
          <Col span={12}>
            <OButton type="primary" btnText={'Export All At Once'} style={{ width: '100%', marginBottom: 100 }}/>
            <p>Export all your vendor products in one file that includes vendor names.</p>
          </Col>
        </Row>
      </>
    </OModal>
  );
};

export default ExportVendorProduct;