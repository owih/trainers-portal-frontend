import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useCustomNotifyStore } from '@/store/useCustomNotifyStore';
import {
  getIsUserAuthFromApi,
  getCurrentUserInfoFromApi,
  loginUserFromApi,
  updateToken, updateUserFromApi,
  userApiLogout, createUserFromApi,
} from '@/api/useUserApi';
import { useTrainerStore } from '@/store/useTrainerStore';
import useRoles from '@/composibles/useRoles';

export const useUserStore = defineStore('user-store', () => {
  const userInfo = ref({});
  const createdUserInfo = ref({});
  const currentUserInfo = ref({});
  const isUserAuth = ref(false);
  const isUserWasRequested = ref(false);
  const pending = reactive({
    auth: false,
    user: false,
    info: false,
    update: false,
    create: false,
  });

  const customNotifyStore = useCustomNotifyStore();
  const trainerStore = useTrainerStore();

  const getUserInfo = computed(() => userInfo.value);
  const getCreatedUserInfo = computed(() => createdUserInfo.value);
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

      console.log(userInfo.value, 'userInfo.value');

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

  const updateUserFromApiToStore = async (formData) => {
    try {
      pending.update = true;

      const  { data } = await updateUserFromApi(formData);
      userInfo.value = data.user;
      currentUserInfo.value = data.user;

      if (data.token && data.user.id === userInfo.value.id) {
        userInfo.value = data.user;
        updateToken(data.token);
      }
      currentUserInfo.value = data.user;

      pending.update = false;
      customNotifyStore.addNotify('User info was updated!', 'Success');
    } catch (e) {
      pending.update = false;
      customNotifyStore.addNotify('Something went wrong!', 'Error');
    }
  };

  const createUserFromApiToStore = async (formData) => {
    try {
      pending.create = true;

      const  { data } = await createUserFromApi(formData);
      createdUserInfo.value = data.user;

      pending.create = false;
      customNotifyStore.addNotify('User info was updated!', 'Success');
    } catch (e) {
      pending.create = false;
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
      if (data.user.role === useRoles.TRAINER) {
        trainerStore.setCurrentTrainerInfo(data.role);
      }
      currentUserInfo.value = data.user;

      pending.info = false;
      customNotifyStore.addNotify('Successfully loaded user info!', 'Success');
    } catch (e) {
      pending.info = false;
      customNotifyStore.addNotify('Something went wrong!', 'Error');
    }
  };

  const clearCurrentUserState = () => {
    currentUserInfo.value = {};
  };

  return {
    getIsUserAuth,
    getPending,
    getIsUserWasRequested,
    getUserInfo,
    getCurrentUserInfo,
    getCreatedUserInfo,
    getIsUserAuthToStore,
    login,
    logout,
    updateUserFromApiToStore,
    getCurrentUserInfoFromApiToStore,
    clearCurrentUserState,
    createUserFromApiToStore,
  };
});
