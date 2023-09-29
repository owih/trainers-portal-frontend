<template>
  <div
    v-if="!pendingStore.getIsPagePending"
    class="page"
  >
    <v-container>
      <template v-if="isUserHasAccess">
        <h1 class="page__title">
          Список сотрудников
        </h1>
        <div class="page__section">
          <h3 class="page__title">
            Создать сотрудника
          </h3>
          <v-btn
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Форма создания сотрудника
          </v-btn>
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

const userStore = useUserStore();
const pendingStore = usePendingStore();

const isUserHasAccess = computed(() => useRoleWithSettingsAccessList.includes(userStore.getUserInfo.role));

const getUserInfo = async () => {
};
onMounted(getUserInfo);
</script>
