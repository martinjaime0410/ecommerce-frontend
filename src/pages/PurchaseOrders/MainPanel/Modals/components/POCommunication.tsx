import { Card, Form } from 'antd';
import React from 'react';

const POCommunication: React.FC = () => {
  // const formInputs = [
  //   {
  //     type: 'textarea',
  //     label: 'Message To Vendor',
  //     name: 'messageToVendor',
  //     rows: 5,
  //     placeholder: 'Hi Vendor,\n\n Message',
  //     defaultValue: selectedPO?.messageToVendor,
  //     onChange: handleSelectedPOChange,
  //   },
  //   {
  //     type: 'textarea',
  //     label: 'Internal Notes',
  //     name: 'internalNote',
  //     placeholder: 'TEAM: Please call me when this delivery arrives at the warehouse',
  //     rows: 5,
  //     defaultValue: selectedPO?.internalNote,
  //     onChange: handleSelectedPOChange,
  //   },
  // ];

  return (
    <Card title="Communication" style={{ paddingBottom: 10 }}>
      <Form layout="vertical">
        {/* {formInputs.map((inputItem, index) => (
          <Form.Item key={index} label={inputItem.label}>
            <OInput {...inputItem} />
          </Form.Item>
        ))} */}
      </Form>
    </Card>
  );
};

export default POCommunication;
