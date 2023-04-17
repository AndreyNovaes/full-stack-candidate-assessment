import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';

const Loading: React.FC = () => (
  <Center height="100%" width="100%">
    <Spinner size="xl" />
  </Center>
);

export default Loading;
