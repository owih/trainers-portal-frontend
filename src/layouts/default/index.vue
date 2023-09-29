<template>
  <v-app class="app">
    <header-layout />
    <v-main class="pt-0 pb-10">
      <div
        v-if="pendingStore.getIsPagePending"
        class="w-100 h-100 position-relative"
      >
        <custom-loader
          :width="6"
          :size="92"
        />
      </div>
      <slot />
    </v-main>
    <footer-layout />
  </v-app>
  <custom-notify />
  <menu-sidebar />
</template>

<script setup>
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout.vue';
import MenuSidebar from '@/components/Sidebar/MenuSidebar.vue';
import FooterLayout from '@/components/FooterLayout/FooterLayout.vue';
import CustomNotify from '@/components/CustomNotify/CustomNotify.vue';
import CustomLoader from '@/components/CustomLoader/CustomLoader.vue';
import { usePendingStore } from '@/store/usePendingStore';

const pendingStore = usePendingStore();
</script>

<style lang="scss" scoped>
.app {
  background-color: ghostwhite;
}
</style>
