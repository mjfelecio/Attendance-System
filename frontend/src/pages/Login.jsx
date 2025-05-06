import React, { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  VStack,
  Image,
  Text,
  Button,
  Checkbox, // Using Checkbox.Root, Checkbox.Control, Checkbox.Label from your update
  Link,
  HStack,
  Spinner,
  Input // Assuming Input is still needed here temporarily or was part of your manual edit
} from '@chakra-ui/react';

// Import useNavigate hook
import { useNavigate } from 'react-router-dom';

// Assuming LoginForm handles inputs and submit
import LoginForm from '../features/auth/components/LoginForm';

// Assuming logo and background images are in public folder

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Replace with actual login logic
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            credentials.email === 'test@aclc.edu.ph' &&
            credentials.password === 'password'
          ) {
            resolve();
          } else {
            reject(new Error('Invalid email or password.'));
          }
        }, 1500);
      });
      navigate('/Dashboard'); // Go to dashboard on success

    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle remember me checkbox
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  // Handle forgot password link
  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    // TODO: Implement forgot password logic
  };

   // Handle Google Sign-in
   const handleGoogleSignIn = () => {
     // TODO: Implement Google Sign-in logic
   }

  return (
    <Flex
      minH="100vh"
      width="100vw"
      align="center"
      justify="center"
      backgroundImage="url('/bg2.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position="relative"
      overflow="hidden"
    >
      <Box
        padding={{ base: '6', md: '10' }}
        boxShadow="2xl"
        rounded="2xl"
        bg='rgba(255, 255, 255, 0.6)'
        position="relative"
        zIndex="1"
        width={{ base: '95%', sm: '400px', md: '450px' }}
        maxWidth="95%"
        textAlign="center"
        backdropFilter="blur(10px)"
      >
        <VStack gap="6"> 
          <Image
            src="/ACLC.jpg"
            alt="ACLC College of Ormoc Logo"
            boxSize={{ base: '100px', md: '120px' }}
            objectFit="contain"
          />

          <Heading size={{ base: 'lg', md: 'xl' }} color="gray.900"> 
            Welcome Back
          </Heading>

          {errorMessage && (
            <Text color="red.600" fontWeight="bold" fontSize="sm" mt="2">
              {errorMessage}
            </Text>
          )}

          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

          <HStack justify="space-between" w="100%" fontSize="sm">
            <Checkbox.Root checked={rememberMe} onChange={handleRememberMeChange} colorPalette='blue'>
              <Checkbox.Control />
              <Checkbox.Label color="gray.900">Remember me</Checkbox.Label> 
            </Checkbox.Root>

            <Link
              color="blue.700" 
              href="#"
              onClick={handleForgotPasswordClick}
              _hover={{ textDecoration: 'underline' }}
              fontWeight="medium"
            >
              Forgot password?
            </Link>
          </HStack>

        </VStack>
      </Box>
    </Flex>
  );
}

export default Login;