import Flex, { FlexProps } from '../Flex';

const Row: React.FC<Omit<FlexProps, 'flexDirection'>> = ({
  children,
  ...rest
}) => {
  return <Flex {...rest}>{children}</Flex>;
};

export default Row;
