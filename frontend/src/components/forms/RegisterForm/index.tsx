import FormError from '@frontend/components/FormError';
import { useCurrentUser } from '@frontend/services/useCurrentUser';
import { useToast } from '@frontend/services/useToast';
import { jwtTokenState } from '@frontend/state/jwtTokenState';
import { Icon } from '@iconify/react';
import { ApiMessage } from '@shared/api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import Col from '../../atoms/Col';
import Row from '../../atoms/Row';
import Button from '../../Button';
import * as api from '@frontend/api';

interface RegisterFormInput {
  username: string;
  password: string;
  accessKey: string;
}

function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    reValidateMode: 'onSubmit',
  });
  const toast = useToast();

  const { setCurrentUser } = useCurrentUser();
  const setJwtToken = useSetRecoilState(jwtTokenState);

  const onSubmit: SubmitHandler<RegisterFormInput> = async ({
    username,
    password,
    accessKey,
  }) => {
    const res = await api.register({
      username,
      password,
      accessKey,
    });

    switch (res.message) {
      case ApiMessage.InvalidAccessKey:
        setError('accessKey', {
          type: 'manual',
          message: 'Väärä pääsykoodi',
        });
        break;
      case ApiMessage.UserAlreadyExists:
        setError('username', {
          type: 'manual',
          message: 'Käyttäjätunnus on jo olemassa',
        });
        break;
    }

    if (res.message !== ApiMessage.Ok) {
      return;
    }

    console.debug('Register success', res);
    setCurrentUser(res.user);
    setJwtToken(res.token);
    toast.success(
      'Uusi käyttäjä luotu',
      `Tervetuloa ${res.user.username}! Voit nyt lisätä tiedostoja 👍`
    );
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
          <h4>Uusi käyttäjä</h4>
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
        <input
          {...register('accessKey', { required: 'Anna pääsykoodi' })}
          type="text"
          placeholder="Kutsukoodi"
        />
        <Button>Luo uusi käyttäjä</Button>
        <FormError errors={errors} name="username" />
        <FormError errors={errors} name="password" />
        <FormError errors={errors} name="accessKey" />
      </Col>
    </form>
  );
}

export default RegisterForm;
