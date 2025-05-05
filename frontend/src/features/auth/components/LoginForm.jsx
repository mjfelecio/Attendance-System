import { VStack, Input, Button } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import React from 'react';

function LoginForm() {
  return (
    <VStack spacing='4'>
      <FormControl id='email'>
        <FormLabel>Email address</FormLabel>
        <Input type='email' />
      </FormControl>
      <FormControl id='password'>
        <FormLabel>Password</FormLabel>
        <Input type='password' />
      </FormControl>
      <Button colorScheme='teal' width='full'>
        Login
      </Button>
    </VStack>
  );
}

export default LoginForm;