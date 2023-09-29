
export default {
  required: (value) => !!value || 'Поле обязательно для заполнения.',
  name: (value) => (!!value && value.length >= 2) || 'Минимум 2 символа.',
  surname: (value) => (!!value && value.length >= 4) || 'Минимум 4 символа.',
  patronymic: (value) => !value || (!!value && value.length >= 4) || 'Минимум 4 символа.',
  phone_number: (value) => (!!value && value.length === 10) || '10 символов.',
  home_address: (value) => !value || (!!value && value.length >= 5) || 'Минимум 5 символов.',
  date_of_birth: (value) => !value || (!!value && value.length >= 10) || 'Минимум 10 символов.',
  login: (value) => (!!value && value.length >= 4) || 'Минимум 4 символа.',
  password: (value) => (!!value && (value.length >= 6)) || 'Минимум 6 символов',
  changePassword: (value) => !value || (!!value && (value.length >= 6)) || 'Минимум 6 символов',
};
