<template>
  <v-navigation-drawer
    v-model="dialogsStore.getDialogsIsOpenStates.menu"
    temporary
    floating
    location="right"
  >
    <div class="d-flex align-center justify-space-between">
      <v-list-item
        title="Sidebar"
        class="py-2"
      />
      <v-list-item
        class="py-2"
      >
        <v-btn
          variant="text"
          color=""
          icon="mdi-close"
          @click="onClickClose"
        />
      </v-list-item>
    </div>

    <v-list
      density="compact"
      nav
    >
      <template
        v-for="item in useSideLinks"
        :key="item.id"
      >
        <v-list-item
          v-if="item.url"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :to="item.url"
        />
        <v-list-item
          v-else
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          @click="onClickModalLink(item.modal || 'menu')"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useDialogsStore } from '@/store/useDialogsStore';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'vue-router';
import useSideLinks from '@/composibles/useSideLinks';
import { useCustomNotifyStore } from '@/store/useCustomNotifyStore';

const userStore = useUserStore();
const dialogsStore = useDialogsStore();
const notifyStore = useCustomNotifyStore();
const router = useRouter();
const onClickClose = () => {
  dialogsStore.toggleModal('menu');
};
const onClickModalLink = (modal) => {
  if (userStore.getIsUserAuth) {
    dialogsStore.toggleModal('menu', false);
    dialogsStore.toggleModal(modal, true);
    return;
  }
  router.push({ name: 'Auth' });
  notifyStore.addNotify('You need to be Authorized', 'Error');
};
</script>

<style scoped>
</style>
