import Flex, { FlexProps } from '../Flex';

const Col: React.FC<Omit<FlexProps, 'flexDirection'>> = ({
  children,
  ...rest
}) => {
  return (
    <Flex flexDirection="column" {...rest}>
      {children}
    </Flex>
  );
};

export default Col;
