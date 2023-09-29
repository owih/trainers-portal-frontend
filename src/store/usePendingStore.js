import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const usePendingStore = defineStore('pending-store', () => {
  const isMainPending = ref(false);
  const isPagePending = ref(false);

  const getIsMainPending = computed(() => isMainPending.value);
  const getIsPagePending = computed(() => isPagePending.value);

  const toggleMainPending = (isPending) => {
    isMainPending.value = isPending ?? false;
  };

  const togglePagePending = (isPending) => {
    isPagePending.value = isPending ?? false;
  };

  return {
    getIsMainPending,
    getIsPagePending,
    toggleMainPending,
    togglePagePending,
  };
});
