import React, { useCallback, useMemo } from 'react';
import { OModal } from '@/components/Globals/OModal';
import { CloseOutlined, ExclamationCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import { skuAlertsType } from '@/utils/helpers/types';
import { OTable } from '@/components/Globals/OTable';

interface ISKUAlertsModal {
  isOpen: boolean;
  onClose: () => void;
  alerts: any[];
  setAlerts: (any) => void;
}

const SKUAlertsModal: React.FC<ISKUAlertsModal> = ({ isOpen, onClose, alerts, setAlerts }) => {
  const handleDelete = useCallback(
    (id) => {
      setAlerts(alerts.filter((alert) => alert.id !== id));
    },
    [alerts, setAlerts],
  );

  const columns = useMemo(
    () => [
      {
        key: 'type',
        dataIndex: 'type',
        title: 'Type',
        align: 'center',
      },
      {
        key: 'created',
        dataIndex: 'created',
        title: 'Created',
        align: 'center',
      },
      {
        key: 'message',
        title: 'Message',
        render: (_, record) => {
          return (
            <p>
              {skuAlertsType.INFO === record.icon && (
                <span
                  style={{
                    float: 'left',
                    width: '30px',
                    lineHeight: '80%',
                  }}
                >
                  <InfoCircleFilled style={{ color: '#00CD0A', fontSize: '20px' }} />
                </span>
              )}
              {skuAlertsType.WARNING === record.icon && (
                <span
                  style={{
                    float: 'left',
                    width: '30px',
                    lineHeight: '80%',
                  }}
                >
                  <ExclamationCircleFilled style={{ color: '#F6871B', fontSize: '20px' }} />
                </span>
              )}
              {record.message}
            </p>
          );
        },
      },
      {
        key: 'action',
        title: 'Dismiss',
        align: 'center',
        render: (_, record) => {
          return (
            <span onClick={() => handleDelete(record.id)}>
              <CloseOutlined style={{ color: 'blue' }} />
            </span>
          );
        },
      },
    ],
    [handleDelete],
  );

  const handleRemove = () => {
    setAlerts([]);
  };

  const alertTableRows = useMemo(
    () =>
      alerts.map((_item) => ({
        key: _item.id,
        ..._item,
      })),
    [alerts],
  );

  return (
    <OModal
      title="SKU Alerts"
      width={MODAL_WIDTH}
      isOpen={isOpen}
      handleCancel={onClose}
      buttons={[
        {
          key: 'delete_all',
          type: 'default',
          btnLabel: 'Delete All',
          onClick: handleRemove,
        },
        {
          key: 'cancel',
          type: 'primary',
          btnLabel: `Close`,
          onClick: onClose,
        },
      ]}
    >
      <OTable columns={columns} rows={alertTableRows} />
    </OModal>
  );
};

export default SKUAlertsModal;
