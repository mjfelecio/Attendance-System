import { VStack, Input, Button } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import React, { useState } from 'react';
import { useAuth } from '../provider/AuthProvider';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing='4'>
        <FormControl id='email'>
          <FormLabel>Email address</FormLabel>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type='submit' colorScheme='teal' width='full'>
          Login
        </Button>
      </VStack>
    </form>
  );
}

export default LoginForm;