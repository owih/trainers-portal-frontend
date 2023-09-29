import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useDialogsStore = defineStore('dialogs-store', () => {
  const dialogsIsOpenState = reactive({
    cart: false,
    menu: false,
    favorites: false,
  });

  const getDialogsIsOpenStates = computed(() => dialogsIsOpenState);

  const toggleModal = (name, isOpen = null) => {
    if (isOpen === null) {
      dialogsIsOpenState[name] = !dialogsIsOpenState[name];
      return;
    }

    if (dialogsIsOpenState[name] !== isOpen) {
      dialogsIsOpenState[name] = isOpen;
    }
  };

  return {
    dialogsIsOpenState,
    getDialogsIsOpenStates,
    toggleModal,
  };
});
