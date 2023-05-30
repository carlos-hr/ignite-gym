import * as yup from 'yup';

export const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe o nome'),
  confirm_password: yup.string().required('Informe o nome'),
});
