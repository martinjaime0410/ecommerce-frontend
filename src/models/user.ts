import httpClient from '@/utils/http-client';
import { useCallback, useState } from 'react';
import qs from 'qs';

export default () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showInactive, setShowInactive] = useState(true);

  const getUsers = useCallback((_query) => {
    httpClient
      .get('/api/users?' + qs.stringify(_query))
      .then((response) => setUserList(response.data))
      .catch((err) => console.log(err));
  }, []);

  const createUser = useCallback(
    (data) => {
      return httpClient.post('/api/users', data).then((response) => {
        if (showInactive === response.data.is_active) setUserList((prev) => [...prev, response.data]);
      });
    },
    [showInactive],
  );

  const updateUser = useCallback(
    (_user) => {
      return httpClient.put('/api/users/' + _user.id, _user).then((response) => {
        if (showInactive === !!response.data.is_active) {
          setUserList(userList.map((_item) => (_item.id === response.data.id ? response.data : _item)));
        } else {
          setUserList(userList.filter((_item) => _item.id !== response.data.id));
        }
        setSelectedUser(null);
      });
    },
    [showInactive, userList],
  );

  // useEffect(() => {
  //   getUsers({ is_active: showInactive });
  // }, [getUsers, showInactive]);

  return {
    userList,
    selectedUser,
    showInactive,
    setSelectedUser,
    setShowInactive,
    getUsers,
    createUser,
    updateUser,
  };
};
