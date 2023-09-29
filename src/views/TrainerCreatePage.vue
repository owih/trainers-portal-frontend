<template>
  <div
    v-if="!pendingStore.getIsPagePending"
    class="page"
  >
    <v-container>
      <template v-if="isUserHasAccess">
        <h1 class="page__title">
          Форма создания сотрудника
        </h1>
        <div class="page__section">
          <TrainerCreateForm />
        </div>
        <div
          v-if="userStore.getCreatedUserInfo.id"
          class="page__section"
        >
          <h3 class="page__title">
            Пользователь {{ userStore.getCreatedUserInfo.id }} успешно создан!
          </h3>
          <v-row class="justify-start align-start ma-n1">
            <v-col
              cols="auto"
              class="pa-1"
            >
              <v-btn
                :to="{ name: 'Profile', params: { id: userStore.getCreatedUserInfo.id } }"
                color="primary"
                variant="elevated"
              >
                Перейти к редактированию
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
      <template v-else>
        <h1 class="page__title">
          Недостаточно прав
        </h1>
      </template>
    </v-container>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/store/useUserStore';
import { usePendingStore } from '@/store/usePendingStore';
import useRoleWithSettingsAccessList from '@/composibles/useRoleWithSettingsAccessList';
import TrainerCreateForm from '@/components/Trainer/TrainerCreateForm/TrainerCreateForm.vue';

const userStore = useUserStore();
const pendingStore = usePendingStore();

const isUserHasAccess = computed(() => useRoleWithSettingsAccessList.includes(userStore.getUserInfo.role));

const getUserInfo = async () => {
};
onMounted(getUserInfo);
</script>
