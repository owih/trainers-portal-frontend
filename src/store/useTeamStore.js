import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useCustomNotifyStore } from '@/store/useCustomNotifyStore';
import {
  getIsUserAuthFromApi,
  getCurrentUserInfoFromApi,
  loginUserFromApi,
  registrationUserFromApi,
  updateToken, updateUserFromApi,
  userApiLogout,
} from '@/api/useUserApi';

export const useUserStore = defineStore('team-store', () => {
  const userInfo = ref({});
  const currentUserInfo = ref({});
  const isUserAuth = ref(false);
  const isUserWasRequested = ref(false);
  const pending = reactive({
    auth: false,
    user: false,
    info: false,
    update: false,
    password: false,
    requested: false,
  });

  const customNotifyStore = useCustomNotifyStore();

  const getUserInfo = computed(() => userInfo.value);
  const getCurrentUserInfo = computed(() => currentUserInfo.value);
  const getIsUserAuth = computed(() => isUserAuth.value);
  const getIsUserWasRequested = computed(() => isUserWasRequested.value);
  const getPending = computed(() => pending);


  const logout = async () => {
    userApiLogout();
    isUserAuth.value = false;
  };

  const getIsUserAuthToStore = async () => {
    try {
      isUserWasRequested.value = true;
      pending.user = true;
      const  { data } = await getIsUserAuthFromApi();
      if (data.token) {
        updateToken(data.token);
        userInfo.value = data.user;
        isUserAuth.value = true;
      } else {
        isUserAuth.value = false;
      }

      pending.user = false;
      customNotifyStore.addNotify('Welcome back!', 'Success');
    } catch (e) {
      isUserAuth.value = false;
      pending.user = false;
      customNotifyStore.addNotify('Unauthorized', 'Error');
    }
  };

  const login = async (formData) => {
    try {
      pending.auth = true;
      const  { data } = await loginUserFromApi(formData);

      if (data.token) {
        updateToken(data.token);
        userInfo.value = data.user;
        isUserAuth.value = true;
      } else {
        isUserAuth.value = false;
      }

      pending.auth = false;
      customNotifyStore.addNotify('Welcome!', 'Success');
    } catch (e) {
      pending.auth = false;
      customNotifyStore.addNotify('Something went wrong!', 'Error');
    }
  };

  const registration = async (formData) => {
    try {
      pending.auth = true;
      const  { data } = await registrationUserFromApi(formData);

      if (data.token) {
        updateToken(data.token);
        isUserAuth.value = true;
      } else {
        isUserAuth.value = false;
      }

      pending.auth = false;
      customNotifyStore.addNotify('Welcome!', 'Success');
    } catch (e) {
      pending.auth = false;
      customNotifyStore.addNotify('Something went wrong!', 'Error');
    }
  };

  const updateUserFromApiToStore = async (formData) => {
    try {
      pending.update = true;

      const  { data } = await updateUserFromApi(formData);
      userInfo.value = data.user;
      currentUserInfo.value = data.user;

      if (data.token) {
        if (data.user.id === userInfo.value.id) {
          userInfo.value = data.user;
        }
        currentUserInfo.value = data.user;
        updateToken(data.token);
      }

      pending.update = false;
      customNotifyStore.addNotify('User info was updated!', 'Success');
    } catch (e) {
      pending.update = false;
      customNotifyStore.addNotify('Something went wrong!', 'Error');
    }
  };

  const getCurrentUserInfoFromApiToStore = async (id) => {
    try {
      pending.info = true;

      const  { data } = await getCurrentUserInfoFromApi(id);
      if (data.user.id === userInfo.value.id) {
        userInfo.value = data.user;
      }
      currentUserInfo.value = data.user;

      pending.info = false;
      customNotifyStore.addNotify('Successfully loaded user info!', 'Success');
    } catch (e) {
      pending.info = false;
      customNotifyStore.addNotify('Something went wrong!', 'Error');
    }
  };

  return {
    getIsUserAuth,
    getPending,
    getIsUserWasRequested,
    getUserInfo,
    getCurrentUserInfo,
    getIsUserAuthToStore,
    login,
    logout,
    registration,
    updateUserFromApiToStore,
    getCurrentUserInfoFromApiToStore,
  };
});
