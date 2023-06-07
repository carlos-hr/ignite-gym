import * as yup from 'yup';

export const updateProfileSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve conter pelo menos 6 caracteres'),
  confirm_password: yup
    .string()
    .required('Confirme a senha')
    .oneOf([yup.ref('password')], 'A confirmação da senha nao confere'),
});
