import { OButton } from '@/components/Globals/OButton';
import { OInput } from '@/components/Globals/OInput';
import { OModal } from '@/components/Globals/OModal';
import { fileUploadProps } from '@/utils/helpers/base';
import { modalType } from '@/utils/helpers/types';
import { UploadOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Col, Form, Row, Upload } from 'antd';
import React, { useState } from 'react';

interface IImportOrderModal {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  handleConfigureSettings: (value: any) => void;
}

const ImportOrderModal: React.FC<IImportOrderModal> = ({ isOpen, onClose, onSave, handleConfigureSettings }) => {
  const { orderImportSettings } = useModel('orderImportSettings');
  const [selectedSettings, setSelectedSettings] = useState(null);

  const handleSettingsSelect = (_value) => {
    if (_value == 0) {
      setSelectedSettings(null);
    } else {
      const _selectedFullSettings = orderImportSettings.find((_item) => _item.key == _value);
      setSelectedSettings(_selectedFullSettings);
    }
  };

  const onConfigureSettings = () => {
    handleConfigureSettings(modalType.OrderImportSettings);
  };

  return (
    <OModal
      title="Manual Order Import"
      helpLink="/help/orders/general"
      width={700}
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
          onClick: onSave,
        },
      ]}
    >
      <>
        <p>
          All orders for your manual channels can be imported into Skubana using as many custom format files as your workflow
          demands. Manually imported orders go through the same process as all others, including validation, assignment of a
          default fulfillment source, Orderbots, and detarmination of inventory availability.
        </p>
        <Row gutter={8}>
          <Col span={16}>
            <div
              style={{
                background: '#DEE0FF',
                border: '1px solid #AFB4FF',
                padding: '1rem',
                margin: '1rem 0',
              }}
            >
              <p>
                All manual order for your imports into Skubana must be performed using a pre-configured setting of the file format
                (CSV, EXCEL, TEXT) and column structure of your choice.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
                <OButton btnText="Configure" bordered={true} onClick={onConfigureSettings} />
                <span>Import Settings:</span>
                <OInput
                  type="select"
                  placeholder="Select..."
                  options={[
                    ...orderImportSettings.map((_item) => ({
                      value: _item.key,
                      text: _item.settingName,
                    })),
                  ]}
                  style={{ flex: 1 }}
                  onChange={(_name, _value) => handleSettingsSelect(_value)}
                  value={selectedSettings ? selectedSettings.key : 0}
                />
              </div>
            </div>
          </Col>
          <Col span={8}>
            <Form
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <Form.Item label="Order Import File: ">
                <Upload {...fileUploadProps}>
                  <Button icon={<UploadOutlined />}>Select...</Button>
                </Upload>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    </OModal>
  );
};

export default ImportOrderModal;
