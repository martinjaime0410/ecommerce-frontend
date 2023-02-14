import { uuidv4 } from '@antv/xflow-core';
import { useState } from 'react';

export default () => {
  const [poExportSettings, setPOExportSettings] = useState<any[]>([
    {
      id: 1,
      settingName: 'Default Export',
      fileFormat: 'csv',
      dateFormat: 'MM/dd/yyyy',
      multiSku: 'multiline',
      delimitValue: '',
      wrapDoubleQuote: true,
      includeColumnHeader: true,
      exportFields: [
        {
          key: 63,
          field: 'Carrier Fee',
          name: 'CARRIER FEE',
        },
        {
          key: 1,
          field: 'PO Number',
          name: 'ORDER NUMBER',
        },
        {
          key: 59,
          field: 'Buyer Name',
          name: 'BUYER NAME',
        },
        {
          key: 50,
          field: 'Ship Address1',
          name: 'SHIP ADDRESS1',
        },
      ],
    },
    {
      id: 2,
      settingName: 'Customers_Phone_Numbers',
      fileFormat: 'csv',
      dateFormat: 'MM/dd/yyyy',
      multiSku: 'delimit',
      delimitValue: '""',
      wrapDoubleQuote: false,
      includeColumnHeader: true,
      exportFields: [
        {
          key: 81,
          field: 'Product Name',
          name: 'PRODUCT NAME',
        },
        {
          key: 83,
          field: 'Customer Name',
          name: 'CUSTOMER NAME',
        },
        {
          key: 48,
          field: 'Ship to Name',
          name: 'SHIP TO NAME',
        },
        {
          key: 57,
          field: 'Ship to Phone',
          name: 'SHIP TO PHONE',
        },
      ],
    },
  ]);
  const [editableExportSetting, setEditableExportSetting] = useState(null);

  const addPOExportSettings = (_newSettings) =>
    setPOExportSettings((prevState) => [
      {
        id: uuidv4(),
        ..._newSettings,
      },
      ...prevState,
    ]);

  const updatePOExportSettings = (_updatedSetting) => {
    console.log(_updatedSetting);
    setPOExportSettings((prevState) =>
      prevState.map((_item) => (_item.id === _updatedSetting.id ? _updatedSetting : _item)),
    );
  };

  const removePOExportSettings = (_index) => {
    setPOExportSettings((prevState) =>
      prevState.filter((_item, _curIndex) => _index !== _curIndex),
    );
  };

  return {
    poExportSettings,
    editableExportSetting,
    addPOExportSettings,
    updatePOExportSettings,
    removePOExportSettings,
    setEditableExportSetting,
  };
};