import React from 'react';
import { OModal } from '@/components/Globals/OModal';
import { OInput } from '@/components/Globals/OInput';
import { useModel } from '@umijs/max';
import { Row, Col, Checkbox } from 'antd';

interface IExportInventoryModal {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ExportInventoryModal: React.FC<IExportInventoryModal> = ({ isOpen, onClose, onSave }) => {
  const { initialState } = useModel('@@initialState');

  return (
    <OModal
      title="Export Inventory"
      width={500}
      isOpen={isOpen}
      handleCancel={onClose}
      buttons={[
        {
          key: 'back',
          type: 'default',
          btnLabel: 'Close',
          onClick: onClose,
        },
        {
          key: 'submit',
          type: 'primary',
          btnLabel: 'Export Inventory',
          onClick: onSave,
        },
      ]}
    >
      <>
        <p>Inventory export is generated in the Microsoft Excel spreadsheet format.</p>
        <p>
          {
            "To download your stock details, select a warehouse and click the 'Export' button. Please allow the time necessary for the Excel file to be generated and emailed to you."
          }
        </p>
        <Row justify="space-between">
          <Col>
            <Checkbox>Exclude Inactive SKUs</Checkbox>
            <br />
            <Checkbox>Export Bundles Only</Checkbox>
            <br />
            <Checkbox>Export Cores Only</Checkbox>
          </Col>
          <Col>
            <OInput
              type="select"
              placeholder="Select..."
              options={initialState?.initialData?.warehouses.map((_item) => ({
                text: _item.name,
                value: _item.id,
              }))}
              style={{ width: 250 }}
            />
          </Col>
        </Row>
      </>
    </OModal>
  );
};

export default ExportInventoryModal;
