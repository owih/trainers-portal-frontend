<template>
  <div
    v-if="!pendingStore.getIsPagePending"
    class="page"
  >
    <v-container>
      <template v-if="userStore.getCurrentUserInfo.id">
        <h1 class="page__title">
          Профиль
        </h1>
        <div class="page__section">
          <h3 class="page__title">
            Настройки аккаунта
          </h3>
          <ProfileForm />
        </div>
        <div
          v-if="isTrainerForm"
          class="page__section"
        >
          <h3 class="page__title">
            Настройки роли сотрудника
          </h3>
          <ProfileTrainerForm />
        </div>
      </template>
      <template v-else>
        <h1 class="page__title">
          Профиль с ID: {{ props.id }} не найден.
        </h1>
      </template>
    </v-container>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/store/useUserStore';
import ProfileForm from '@/components/Profile/ProfileForm/ProfileForm.vue';
import { usePendingStore } from '@/store/usePendingStore';
import useRoles from '@/composibles/useRoles';
import ProfileTrainerForm from '@/components/Profile/ProfileTrainerForm/ProfileTrainerForm.vue';

const userStore = useUserStore();
const pendingStore = usePendingStore();

const props = defineProps({
  id: {
    type: String,
    default: '',
    required: false,
  }
});
console.log(props.id);

const isTrainerForm = computed(() => userStore.getCurrentUserInfo.role === useRoles.TRAINER);
const getUserInfo = async () => {
  pendingStore.togglePagePending(true);
  await userStore.getCurrentUserInfoFromApiToStore(props.id);
  pendingStore.togglePagePending(false);
};
const clearState = () => {
  userStore.clearCurrentUserState();
};

onMounted(getUserInfo);
onUnmounted(clearState);
</script>
