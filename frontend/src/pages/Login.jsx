import { useState } from 'react';
import { Box, Heading, Flex, VStack, Image, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import OtpLoginForm from '../features/auth/components/OtpLoginForm';
import { useAuth } from '../features/auth/provider/AuthProvider';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');

  
  
  const { login } = useAuth();
  const navigate = useNavigate();

    const handleOtpSuccess = (email) => {
    // Mark user logged-in and go to dashboard
    login(email, '');
    navigate('/Dashboard');
  };
    /* Legacy password-based login removed
    setIsLoading(true);
    setErrorMessage('');

    try {
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

  //
// Removed legacy remember-me and password logic
  const handleRememberMeChange = (e) => {
    
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

                      <OtpLoginForm onSuccess={handleOtpSuccess} />

           checked={rememberMe} onChange={handleRememberMeChange} colorPalette='blue'>
            <Checkbox.Control />
            <Checkbox.Label color="gray.900">Remember me</Checkbox.Label> 
          }

          
            color="blue.700" 
            href="#"
            onClick={handleForgotPasswordClick}
            _hover={{ textDecoration: 'underline' }}
            fontWeight="medium"
          >
            Forgot password?
          }
            </Link>
          

          <Link color="blue.700" onClick={() => navigate('/Signup')} fontSize="sm" _hover={{ textDecoration:'underline' }}>
            Create account
          </Link>

        </VStack>
      </Box>
    </Flex>
  );
}

export default Login;