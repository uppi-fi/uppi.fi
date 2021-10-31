import { ErrorMessage } from '@hookform/error-message';
import { Icon } from '@iconify/react';
import Row from '../atoms/Row';
import Text from '../atoms/Text';

export interface FormErrorProps {
  errors?: any;
  name: string;
}

function FormError({ errors, name }: FormErrorProps) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <Text color="red" fontSize="14px">
          <Row gap="6px">
            <Icon icon="ant-design:warning-twotone" fontSize="18px" />
            {message}
          </Row>
        </Text>
      )}
    />
  );
}

export default FormError;
