import FormError from '@frontend/components/FormError';
import { useApiService } from '@frontend/services/useApiService';
import { useToast } from '@frontend/services/useToast';
import { currentUserState } from '@frontend/state/currentUserState';
import { jwtTokenState } from '@frontend/state/jwtTokenState';
import { Icon } from '@iconify/react';
import {
  ApiMessage,
  LoginResponse,
  UsernameAndPasswordParams,
} from '@shared/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import Col from '../../atoms/Col';
import Row from '../../atoms/Row';
import Button from '../../Button';

interface LoginFormInput {
  username: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInput>({
    reValidateMode: 'onSubmit',
  });

  const setCurrentUser = useSetRecoilState(currentUserState);
  const setJwtToken = useSetRecoilState(jwtTokenState);
  const toast = useToast();

  const { post: loginRequest } = useApiService<
    LoginResponse,
    UsernameAndPasswordParams
  >('login');

  const onSubmit: SubmitHandler<LoginFormInput> = async ({
    username,
    password,
  }) => {
    const res = await loginRequest({
      username,
      password,
    });
    const isOk = res.message === ApiMessage.Ok;

    if (!isOk) {
      return setError('password', {
        message: 'Kirjautuminen epäonnistui',
      });
    }

    console.debug('Login success');
    setCurrentUser(res.user);
    setJwtToken(res.token);
    toast.success('Kirjauduit sisään', `Terve taas ${res.user.username}!`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Col gap="8px">
        <Row alignItems="center" gap="4px">
          <Icon
            icon="ant-design:user-add-outlined"
            fontSize={24}
            color="green"
          />
          <h4>Kirjaudu sisään</h4>
        </Row>
        <input
          {...register('username', { required: 'Anna käyttäjätunnus' })}
          type="text"
          placeholder="Käyttäjätunnus"
        />
        <input
          {...register('password', { required: 'Anna salasana' })}
          type="password"
          placeholder="Salasana"
        />
        <Button>Kirjaudu sisään</Button>
        <FormError errors={errors} name="username" />
        <FormError errors={errors} name="password" />
      </Col>
    </form>
  );
}

export default LoginForm;
