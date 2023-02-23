import { OButton } from '@/components/Globals/OButton';
import { OInput } from '@/components/Globals/OInput';
import httpClient from '@/utils/http-client';
import { useModel } from '@umijs/max';
import { Card, Form, Space } from 'antd';
import qs from 'qs';
import { useState } from 'react';

const initailState = {
  phonenumber: '',
  card_number: '',
  name: '',
  city: '',
  state: '',
  country: '',
};

export default function SearchCustomer() {
  const [searchQuery, setSearchQuery] = useState(initailState);
  const { setCustomerList } = useModel('customer');

  const handleSearchQueryChange = (name: string, value: string) => {
    setSearchQuery((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSearch = (query) => {
    httpClient
      .get('/api/customers?' + qs.stringify(query))
      .then((response) => {
        setCustomerList(response.data.customers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearSearchQuery = () => {
    setSearchQuery(initailState);
    onSearch(initailState);
  };

  const inputFields = [
    {
      type: 'text',
      name: 'phonenumber',
      label: 'Phone Number',
    },
    {
      type: 'text',
      name: 'card_number',
      label: 'Card ID Number',
    },
    {
      type: 'text',
      name: 'name',
      label: 'Name',
    },
    {
      type: 'text',
      name: 'city',
      label: 'City',
    },
    {
      type: 'text',
      name: 'state',
      label: 'State/Province',
    },
    {
      type: 'text',
      name: 'country',
      label: 'Country',
    },
  ];

  return (
    <Card title="Search Customers" className="left-panel">
      <Form>
        <Space direction="vertical" size={VERTICAL_SPACE_SIZE}>
          {inputFields.map((_inputField, _index) => (
            <div key={_index}>
              <span>{_inputField.label}:</span>
              <OInput
                type={_inputField.type}
                name={_inputField.name}
                value={searchQuery[_inputField.name]}
                onChange={handleSearchQueryChange}
              />
            </div>
          ))}
        </Space>
      </Form>
      <div className="space-between" style={{ marginTop: 10 }}>
        <OButton btnText={'Clear'} onClick={clearSearchQuery} />
        <OButton btnText={'Search'} onClick={() => onSearch(searchQuery)} />
      </div>
    </Card>
  );
}
