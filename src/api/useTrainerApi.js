import useUrlBackendPaths from '@/composibles/useUrlBackendPaths';
import Api from '@/api/api';

const urlPath = useUrlBackendPaths.trainer;

export const getTrainerListFromApi = (filterData, page, limit) => {
  if (page && limit) {
    const path = `${urlPath}/?page=${page}&limit=${limit}&name=${filterData.name || ''}&type=${filterData.type || ''}`;
    return Api.request('get', path);
  }
  const path = `${urlPath}/?name=${filterData.name || ''}&type=${filterData.type || ''}`;
  return Api.request('get', path);
};

export const getTrainerFromApi = (id) => {
  const path = `${urlPath}/${String(id)}`;
  return Api.request('get', path);
};

export const updateTrainerFromApi = (fomData) => {
  const path = `${urlPath}/update`;
  return Api.request('post', path, fomData);
};

