<template>
  <v-form
    v-model="form"
    class="w-100"
    validate-on="blur"
    :disabled="userStore.getPending.update"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="formData.login"
      class="mb-2"
      variant="outlined"
      :rules="[rules.login]"
      label="Логин"
      required
    />
    <v-text-field
      v-model="formData.password"
      class="mb-2"
      variant="outlined"
      :rules="[rules.changePassword]"
      label="Новый пароль"
      required
    />
    <v-text-field
      v-model="formData.repeatPassword"
      class="mb-2"
      variant="outlined"
      :rules="[repeatPasswordRule]"
      label="Повторите пароль"
      required
    />
    <v-autocomplete
      v-model="formData.role"
      class="mb-2"
      variant="outlined"
      :items="useRoleForEditList"
      label="Роль"
      required
    />
    <v-row class="justify-space-between">
      <v-col cols="auto">
        <v-btn
          color="primary"
          variant="elevated"
          type="submit"
          :loading="userStore.getPending.update"
        >
          Сохранить
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          color="error"
          @click="onLogout"
        >
          Выйти
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/store/useUserStore';
import rules from '@/composibles/useFormValidation';
import useRoleForEditList from '@/composibles/useRoleForEditList';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const currentUserInfo = userStore.getCurrentUserInfo;
const router = useRouter();

const form = ref(true);

const repeatPasswordRule = (value) => value === formData.password || 'Пароли должны совпадать';

const formData = reactive({
  login: '',
  password: '',
  repeatPassword: '',
  role: '',
});

const updateFormData = () => {
  console.log(currentUserInfo, 'currentUserInfo update');
  formData.login = currentUserInfo.login || '';
  formData.role = currentUserInfo.role || '';
  formData.password = '';
  formData.repeatPassword = '';
};

const onLogout = () => {
  userStore.logout();

  router.push({ name: 'Auth' });
};

const onSubmit = () => {
  if (!form.value) {
    return;
  }
  formData.id = currentUserInfo.id;
  userStore.updateUserFromApiToStore(formData).then(() => updateFormData());
};

// Updating formData with this way, for correct Vuetify form validation behavior
onMounted(() => {
  updateFormData();
});
</script>

<style scoped>

</style>
