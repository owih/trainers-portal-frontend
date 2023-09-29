import useUrlBackendPaths from '@/composibles/useUrlBackendPaths';
import Api from '@/api/api';

const urlPath = useUrlBackendPaths.cart;

export const getCartFromApi = () => {
  const path = `${urlPath}/`;
  return Api.request('get', path);
};

export const updateCartFromApi = (productId, count) => {
  const data = { productId, count };
  const path = `${urlPath}/`;
  return Api.request('post', path, data);
};

export const addProductToCartApi = (productId) => {
  const data = { productId };
  const path = `${urlPath}/`;
  return Api.request('put', path, data);
};

export const deleteProductFromCartApi = (productId) => {
  const path = `${urlPath}/${productId}`;
  return Api.request('delete', path);
};
