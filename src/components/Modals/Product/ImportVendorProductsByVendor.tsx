import { OModal } from '@/components/Globals/OModal';
import { Button, Card, Col, Drawer, Row, Select, Upload } from 'antd';
import { fileUploadProps } from '@/utils/helpers/base';
import { UploadOutlined } from '@ant-design/icons';
import { OInput } from '@/components/Globals/OInput';
import { modalType } from '@/utils/helpers/types';
import InitialState from '@/.umi/plugin-initialState/@@initialState';
const { Option } = Select;

interface IVendorProductImportByVendor {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: any) => void;
}

const VendorProductImportByVendor: React.FC<IVendorProductImportByVendor> = ({ isOpen, onClose, onSave }) => {
  
  return (
    <OModal
      title={'Vendor Product Import By Vendor'}
      width={550}
      isOpen={isOpen}
      handleCancel={onClose}
      buttons={[
        {
          key: 'back',
          type: 'default',
          btnLabel: 'Cancel',
          onClick: onClose,
        },
        {
          key: 'submit',
          type: 'primary',
          btnLabel: 'Continue',
          onClick: () => onSave(modalType.ImportVendorProductSummary),
        },
      ]}
    >
      <>
        <p>Batch import of Vendor products is done through the Microsoft Excel spreadsheet format.</p>
        <a
          // onClick={handleDownloadTemplate}
          className="download-link"
        >
          <u>Download the Excel Template for Vendor Product Import By Vendor</u>
        </a>
        <p>
          To associate your product Master SKUs with Vendor SKUs, simply use the provided template
          and upload the data for each vendor.
        </p>
        <p>
          <strong>Vendor SKUs, are <i>not</i> case sensitive.</strong> For example, <i>'sku123'</i>{' '}
          <b>is regarded the same as</b> <i>'SKU123'</i> by the system. The same applies for product's
          Master SKU's.
        </p>

        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={12}>
            <Card title="Vendor">
              <OInput
                type="select"
                name="vendor"
                onChange={() => {}}
                placeholder="Select..."
                // options={InitialState?.}
              />
            </Card>
          </Col>
          <Col offset={4} span={8} style={{ textAlign: 'right' }}>
            <label>Excel File:</label>&nbsp;&nbsp;
            <Upload {...fileUploadProps}>
              <Button icon={<UploadOutlined />}>Select...</Button>
            </Upload>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right', marginTop: '1rem' }}>
            <label>Update existing SKUs if changes found in the Excel file?</label>&nbsp;&nbsp;
            <Select placeholder="Yes - Update existing SKUs and import new.">
              <Option value="1">Yes - Update existing SKUs and import new.</Option>
              <Option value="2">No - Ignore exisiting SKUs only import new.</Option>
            </Select>
          </Col>
        </Row>
      </>
    </OModal>
  );
};

export default VendorProductImportByVendor;