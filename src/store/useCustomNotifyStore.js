import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCustomNotifyStore = defineStore('notify-store', () => {
  const notifies = ref([]);

  const getNotifies = computed(() => notifies.value);

  const addNotify = (text, type) => {
    const notify = ref({
      id: Number(Date.now()),
      model: true,
      text,
      type: type ?? 'Common',
    });

    notifies.value.push(notify);
  };

  const removeNotify = async (id) => {
    notifies.value = notifies.value.filter((item) => item.value.id !== id);
  };

  return {
    getNotifies,
    addNotify,
    removeNotify,
  };
});
