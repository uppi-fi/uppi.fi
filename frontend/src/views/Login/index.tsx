import Col from '@frontend/components/atoms/Col';
import Row from '@frontend/components/atoms/Row';
import Centered from '@frontend/components/Centered';
import { useApiService } from '@frontend/services/useApiService';
import { currentUserState } from '@frontend/state/currentUserState';
import { jwtTokenState } from '@frontend/state/jwtTokenState';
import { Icon } from '@iconify/react';
import {
  ApiMessage,
  LoginResponse,
  RegisterResponse,
  UsernameAndPasswordParams,
} from '@shared/api';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [errors, setErrors] = useState<{
    login?: string;
    register?: string;
  }>();

  const { post: login } = useApiService<
    LoginResponse,
    UsernameAndPasswordParams
  >('/login');
  const { post: register } = useApiService<
    RegisterResponse,
    UsernameAndPasswordParams
  >('/register');

  const setCurrentUser = useSetRecoilState(currentUserState);
  const setJwtToken = useSetRecoilState(jwtTokenState);

  const onLoginSubmit = async () => {
    const res = await login({
      username,
      password,
    });
    const isOk = res.message === ApiMessage.Ok;

    setErrors((old) => ({
      ...old,
      login: isOk ? undefined : res.message,
    }));

    if (!isOk) {
      return;
    }

    console.debug('Login success');
    setCurrentUser(res.user);
    setJwtToken(res.token);
  };

  const onRegisterSubmit = async () => {
    const res = await register({
      username: registerUsername,
      password: registerPassword,
    });
    const isOk = res.message === ApiMessage.Ok;

    setErrors((old) => ({
      ...old,
      register: isOk ? undefined : res.message,
    }));

    if (!isOk) {
      return;
    }

    console.debug('Register success');
    setCurrentUser(res.user);
    setJwtToken(res.token);
  };

  return (
    <Centered>
      <Row gap="10vw">
        <Col gap="8px">
          <Row alignItems="center" gap="4px">
            <Icon icon="ant-design:user-outlined" fontSize={24} />
            <h4>Kirjaudu sisään</h4>
          </Row>
          <input
            autoComplete="username"
            type="text"
            placeholder="Käyttäjätunnus"
            value={username}
            onChange={(evt) => setUsername(evt.currentTarget.value)}
          />
          <input
            autoComplete="password"
            type="password"
            placeholder="Salasana"
            value={password}
            onChange={(evt) => setPassword(evt.currentTarget.value)}
          />
          <button disabled={!username || !password} onClick={onLoginSubmit}>
            Kirjaudu sisään
          </button>
          {errors?.login}
        </Col>
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
            type="text"
            name="username"
            placeholder="Käyttäjätunnus"
            value={registerUsername}
            onChange={(evt) => setRegisterUsername(evt.currentTarget.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Salasana"
            value={registerPassword}
            onChange={(evt) => setRegisterPassword(evt.currentTarget.value)}
          />
          <button
            disabled={!registerUsername || !registerPassword}
            onClick={onRegisterSubmit}
          >
            Luo uusi käyttäjä
          </button>
          {errors?.register}
        </Col>
      </Row>
    </Centered>
  );
}

export default Login;
