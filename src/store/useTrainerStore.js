import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useCustomNotifyStore } from '@/store/useCustomNotifyStore';
import { updateTrainerFromApi } from '@/api/useTrainerApi';

export const useTrainerStore = defineStore('trainer-store', () => {
  const currentTrainerInfo = ref({});

  const pending = reactive({
    info: false,
    update: false,
  });

  const customNotifyStore = useCustomNotifyStore();

  const getCurrentTrainerInfo = computed(() => currentTrainerInfo.value);
  const getPending = computed(() => pending);

  const setCurrentTrainerInfo = (data) => {
    currentTrainerInfo.value = data;
  };

  const updateTrainerFromApiToStore = async (formData) => {
    try {
      pending.update = true;

      const  { data } = await updateTrainerFromApi(formData);
      currentTrainerInfo.value = data.role;

      pending.update = false;
      customNotifyStore.addNotify('User info was updated!', 'Success');
    } catch (e) {
      pending.update = false;
      customNotifyStore.addNotify('Something went wrong!', 'Error');
    }
  };

  const getCurrentTrainerInfoFromApiToStore = async (id) => {
    try {
      pending.info = true;

      const  { data } = await updateTrainerFromApi(id);
      currentTrainerInfo.value = data.role;

      pending.info = false;
      customNotifyStore.addNotify('Successfully loaded user info!', 'Success');
    } catch (e) {
      pending.info = false;
      customNotifyStore.addNotify('Something went wrong!', 'Error');
    }
  };

  return {
    getCurrentTrainerInfo,
    getPending,
    setCurrentTrainerInfo,
    updateTrainerFromApiToStore,
    getCurrentTrainerInfoFromApiToStore,
  };
});
