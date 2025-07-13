import { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  VStack,
  Image,
  Text,
  Checkbox,
  Link,
  HStack
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/provider/AuthProvider';
import LoginForm from '../features/auth/components/LoginForm';

function Login() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      await login(credentials.email, credentials.password);
    } catch (err) {
      setErrorMessage(err.message);
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

            <RouterLink to="/Signup">
              <Link color="blue.700" _hover={{ textDecoration: 'underline' }} fontWeight="medium">
                Create account
              </Link>
            </RouterLink>

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