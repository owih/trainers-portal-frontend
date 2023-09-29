import useUrlBackendPaths from '@/composibles/useUrlBackendPaths';
import Api from '@/api/api';

const urlPath = useUrlBackendPaths.user;

export const getIsUserAuthFromApi = () => {
  const path = `${urlPath}/auth`;
  return Api.request('get', path);
};

export const loginUserFromApi = (fomData) => {
  const path = `${urlPath}/login`;
  return Api.request('post', path, fomData);
};

export const userApiLogout = () => {
  Api.removeToken();
};

export const getCurrentUserInfoFromApi = (id) => {
  const path = `${urlPath}/${id}`;
  return Api.request('get', path);
};

export const updateUserFromApi = (fomData) => {
  const path = `${urlPath}/update`;
  return Api.request('post', path, fomData);
};

export const createUserFromApi = (fomData) => {
  const path = `${urlPath}/create`;
  return Api.request('post', path, fomData);
};

export const updateToken = (token) => {
  Api.updateToken(token);
};
