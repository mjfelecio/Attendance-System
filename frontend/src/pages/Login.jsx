import { Box, Heading, Container, VStack, Image } from '@chakra-ui/react';
import React from 'react';
import LoginForm from '../features/auth/components/LoginForm';

function Login() {
  return (
    <Container 
      centerContent 
      bg='gray.100'
      minH='100vh'
      py='8'
    >
      <Box
        padding='8'
        boxShadow='lg' 
        rounded='lg'
        bg='white'
        mt='16' 
        width={{ base: '95%', md: '450px' }} 
      >
        <VStack spacing='6'>
          
          <Image src="/ACLC.jpg" alt='ACLC College of Ormoc Logo' boxSize='120px' objectFit='contain' /> 
          <Heading size='xl'>Welcome Back</Heading>
          <LoginForm /> 
        </VStack>
      </Box>
    </Container>
  );
}

export default Login;