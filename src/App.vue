<template>
  <div
    v-if="pendingStore.getIsMainPending"
    class="w-100 h-screen position-relative"
  >
    <custom-loader
      :width="6"
      :size="92"
    />
  </div>
  <v-app v-else>
    <default>
      <router-view />
    </default>
    <cart-modal />
  </v-app>
</template>

<script setup>
import Default from '@/layouts/default/index.vue';
import CartModal from '@/components/Modal/CartModal/CartModal.vue';
import CustomLoader from '@/components/CustomLoader/CustomLoader.vue';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'vue-router';
import { usePendingStore } from '@/store/usePendingStore';

const router = useRouter();
const userStore = useUserStore();
const pendingStore = usePendingStore();

router.beforeEach(async (to) => {
  if (!userStore.getIsUserWasRequested) {
    pendingStore.toggleMainPending(true);
    await userStore.getIsUserAuthToStore();
    userStore.getIsUserAuth && updateStates();
    pendingStore.toggleMainPending(false);
  }

  if (to.name === 'Profile') {
    if (userStore.getIsUserAuth) return true;
    await router.push({ name: 'Auth' });
  }

  if (to.name === 'Auth') {
    if (!userStore.getIsUserAuth) return true;
    await router.push({ name: 'Profile', params: { id: userStore.getUserInfo.id } });
  }
});

const updateStates = () => {
  // cartStore.getCartFromApiToStore();
  // favoritesStore.getFavoritesFromApiToStore();
};
</script>
