<template>
  <v-card
    class="mx-auto px-6 py-8"
    variant="elevated"
    max-width="600"
    min-width="400"
  >
    <auth-form
      :pending="userStore.getPending.auth"
      @auth="onAuth"
    />
  </v-card>
</template>
<script setup>
import AuthForm from '@/components/Auth/AuthForm/AuthForm.vue';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const onAuth = async (formData) => {
  console.log(formData, 'formdata');
  await userStore.login(formData);

  if (userStore.getIsUserAuth) {
    await router.push({ name: 'Profile', params: { id: '1' } });
  }
};
</script>

<style scoped>
</style>
