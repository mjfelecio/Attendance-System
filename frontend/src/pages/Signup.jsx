import { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  VStack,
  Image,
  Text,
  Link,
  Input,
  Button,
  Spinner,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../features/auth/provider/AuthProvider';

function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      await signup(email, password);
    } catch (err) {
      setErrorMessage(err.message);
      setIsLoading(false);
    }
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
        bg="rgba(255, 255, 255, 0.6)"
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
            Create Account
          </Heading>

          {errorMessage && (
            <Text color="red.600" fontWeight="bold" fontSize="sm" mt="2">
              {errorMessage}
            </Text>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack gap="4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="rgba(255, 255, 255, 0.5)"
                color="gray.800"
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="rgba(255, 255, 255, 0.5)"
                color="gray.800"
                required
              />
              <Button type="submit" colorPalette="blue" width="full" isLoading={isLoading} loadingText="Signing up..." spinner={<Spinner size="sm" />}>
                Sign Up
              </Button>
            </VStack>
          </form>

          <HStack fontSize="sm">
            <Text color="gray.800">Already have an account?</Text>
            <RouterLink to="/">
              <Link color="blue.700" _hover={{ textDecoration: 'underline' }} fontWeight="medium">
                Log in
              </Link>
            </RouterLink>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
}

export default Signup;
