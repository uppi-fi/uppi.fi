import Flex, { FlexProps } from '../Flex';

const Col: React.FC<Omit<FlexProps, 'flexDirection'>> = ({
  children,
  ...css
}) => {
  return (
    <Flex flexDirection="column" {...css}>
      {children}
    </Flex>
  );
};

export default Col;
