<template>
  <v-form
    v-model="form"
    class="w-100"
    :disabled="trainerStore.getPending.update"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="formData.login"
      class="mb-2"
      variant="outlined"
      :rules="[rules.name]"
      label="Имя*"
      required
    />
    <v-text-field
      v-model="formData.password"
      class="mb-2"
      variant="outlined"
      :rules="[rules.surname]"
      label="Фамилия*"
      required
    />
    <v-text-field
      v-model="formData.repeatPassword"
      class="mb-2"
      variant="outlined"
      :rules="[rules.patronymic]"
      label="Отчество"
    />
    <v-text-field
      v-model="formData.repeatPassword"
      class="mb-2"
      variant="outlined"
      :rules="[rules.phone_number]"
      label="Номер телефона*"
      type="phone"
      required
    />
    <v-text-field
      v-model="formData.repeatPassword"
      class="mb-2"
      variant="outlined"
      :rules="[rules.home_address]"
      label="Домашний адрес"
    />
    <v-date-picker v-model="formData.repeatPassword" />
    <v-row class="justify-space-between">
      <v-col cols="auto">
        <v-btn
          color="primary"
          variant="elevated"
          type="submit"
          :loading="trainerStore.getPending.update"
        >
          Сохранить
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import rules from '@/composibles/useFormValidation';
import { useTrainerStore } from '@/store/useTrainerStore';

const trainerStore = useTrainerStore();

const form = ref(true);

const formData = reactive({
  name: '',
  surname: '',
  patronymic: '',
  phone_number: '',
  date_of_birth: '',
});

const updateFormData = () => {
  formData.name = trainerStore.getCurrentTrainerInfo.name || '';
  formData.surname = trainerStore.getCurrentTrainerInfo.surname || '';
  formData.patronymic = trainerStore.getCurrentTrainerInfo.patronymic || '';
  formData.phone_number = trainerStore.getCurrentTrainerInfo.phone_number || '';
  formData.date_of_birth = trainerStore.getCurrentTrainerInfo.date_of_birth || '';
};

const onSubmit = () => {
  if (!form.value) {
    return;
  }
  formData.id = trainerStore.getCurrentTrainerInfo.id;
  trainerStore.updateTrainerFromApiToStore(formData).then(() => updateFormData());
};

onMounted(() => {
  updateFormData();
});
</script>

<style scoped>

</style>
