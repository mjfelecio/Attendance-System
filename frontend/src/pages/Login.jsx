import { Box, Heading, Container } from '@chakra-ui/react';
import React from 'react';
import LoginForm from '../features/auth/components/LoginForm';

function Login() {
  return (
    <Container centerContent>
      <Box padding='6' boxShadow='lg' bg='white' mt='10'>
        <Heading mb='6'>Login</Heading>
        <LoginForm />
      </Box>
    </Container>
  );
}

export default Login;