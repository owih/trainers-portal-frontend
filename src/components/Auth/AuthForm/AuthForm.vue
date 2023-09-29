<template>
  <v-form
    v-model="form"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="formData.login"
      :readonly="loading"
      :rules="[rules.login]"
      variant="outlined"
      class="mb-3"
      clearable
      label="Логин"
    />

    <v-text-field
      v-model="formData.password"
      :readonly="loading"
      :rules="[rules.password]"
      variant="outlined"
      clearable
      label="Пароль"
      type="password"
    />

    <br>

    <v-btn
      :disabled="!form"
      :loading="props.pending"
      block
      color="success"
      size="large"
      type="submit"
      variant="elevated"
    >
      Sign In
    </v-btn>
  </v-form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import rules from '@/composibles/useFormValidation';

const props = defineProps({
  pending: {
    type: Boolean,
    required: true,
  }
});
const emits = defineEmits(['auth']);

const form = ref(false);
const loading = ref(false);

const formData = reactive({
  login: '',
  password: '',
});

const onSubmit = () => {
  emits('auth', formData);
};
</script>

<style scoped>
</style>
