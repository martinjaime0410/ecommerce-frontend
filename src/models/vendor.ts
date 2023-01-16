import httpClient from '@/utils/http-client';
import { useModel } from '@umijs/max';
import { useCallback, useEffect, useState } from 'react';

export default () => {
  const [vendorList, setVendorList] = useState<any[]>([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [editableVendor, setEditableVendor] = useState(null);
  const [vendorHistory, setVendorHistory] = useState([]);
  const { initialState } = useModel('@@initialState');

  const getVendorList = useCallback((query = '') => {
    httpClient
      .get('/api/vendors' + query)
      .then((response: any) => setVendorList(response.data.vendors))
      .catch((error) => console.log(error));
  }, []);

  const createNewVendor = useCallback((data) => {
    httpClient
      .post('/api/vendors', data)
      .then((response) => {
        setVendorList((prev) => [response.data.vendor, ...prev]);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateNewVendor = useCallback(() => {
    httpClient
      .put('/api/vendors/' + editableVendor.id, editableVendor)
      .then((response) => {
        setVendorList((prev) =>
          prev.map((_item) => (_item.id === editableVendor.id ? response.data.vendor : _item)),
        );
        setSelectedVendor(response.data.vendors);
      })
      .catch((error) => console.log(error));
  }, [editableVendor]);

  const deleteVendor = useCallback((data) => {
    httpClient
      .delete('/api/vendors/' + data.id)
      .then(() => {
        setVendorList((prev) => prev.filter((_item) => _item.id != data.id));
      })
      .catch((err) => console.log(err));
  }, []);

  const makeDeactivate = useCallback((id, status) => {
    httpClient
      .put('/api/vendors/' + id + '/change-status', { status })
      .then((response) => {
        setVendorList((prev) => prev.filter((_item) => _item.id != id));
        setSelectedVendor(null);
      })
      .catch((error) => console.log(error));
  }, []);

  const getVendorHistory = useCallback((id) => {
    httpClient
      .get('/api/vendors/' + id + '/history')
      .then((response: any) => {
        setVendorHistory(response.data.vendorHistory);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (initialState?.currentUser) {
      getVendorList();
    }
  }, [getVendorList, initialState?.currentUser]);

  return {
    vendorList,
    selectedVendor,
    editableVendor,
    vendorHistory,
    setEditableVendor,
    getVendorList,
    setSelectedVendor,
    createNewVendor,
    updateNewVendor,
    deleteVendor,
    makeDeactivate,
    getVendorHistory,
  };
};
