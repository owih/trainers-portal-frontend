<template>
  <v-dialog
    v-model="dialogsStore.dialogsIsOpenState.cart"
    width="768"
    min-height="400"
  >
    <v-card class="pa-2 pa-lg-6 flex-grow-1">
      <v-btn
        class="close"
        variant="text"
        icon="mdi-close"
        @click="onClickClose"
      />
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useDialogsStore } from '@/store/useDialogsStore';

const dialogsStore = useDialogsStore();
const onClickClose = () => {
  dialogsStore.toggleModal('cart', false);
};
</script>

<style lang="scss" scoped>
.close {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
</style>
