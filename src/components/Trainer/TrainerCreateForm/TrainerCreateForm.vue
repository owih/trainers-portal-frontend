<template>
  <v-form
    v-model="form"
    class="w-100"
    validate-on="blur"
    :disabled="userStore.getPending.create"
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
      :rules="[rules.password]"
      label="Пароль"
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
    <v-row class="justify-space-between">
      <v-col cols="auto">
        <v-btn
          color="primary"
          variant="elevated"
          type="submit"
          :loading="userStore.getPending.create"
        >
          Создать
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/store/useUserStore';
import rules from '@/composibles/useFormValidation';

const userStore = useUserStore();
const currentUserInfo = userStore.getCurrentUserInfo;

const form = ref(true);

const repeatPasswordRule = (value) => value === formData.password || 'Пароли должны совпадать';

const formData = reactive({
  login: '',
  password: '',
  repeatPassword: '',
  role: 'TRAINER',
});

const updateFormData = () => {
  formData.login = '';
  formData.role = 'TRAINER';
  formData.password = '';
  formData.repeatPassword = '';
};

const onSubmit = () => {
  if (!form.value) {
    return;
  }
  formData.id = currentUserInfo.id;
  userStore.createUserFromApiToStore(formData).then(() => updateFormData());
};

// Updating formData with this way, for correct Vuetify form validation behavior
onMounted(() => {
  updateFormData();
});
</script>

<style scoped>

</style>
