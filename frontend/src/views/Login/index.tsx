import Row from '@frontend/components/atoms/Row';
import Centered from '@frontend/components/Centered';
import LoginForm from '@frontend/components/forms/LoginForm';
import RegisterForm from '@frontend/components/forms/RegisterForm';

function Login() {
  return (
    <Centered>
      <Row gap="10vw">
        <LoginForm />
        <RegisterForm />
      </Row>
    </Centered>
  );
}

export default Login;
