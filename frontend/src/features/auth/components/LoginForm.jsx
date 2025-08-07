import { VStack, Input, Button, Spinner } from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import { useState } from 'react';
import PropTypes from 'prop-types';

function LoginForm({ onSubmit, isLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <VStack gap='4'>
        <Field.Root width='100%'>
          <Field.Label htmlFor='email-input' color='gray.700' fontWeight='medium'>Email address</Field.Label>
          <Input
            id='email-input'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg='rgba(255, 255, 255, 0.5)' // Semi-transparent background for input
            borderColor='rgba(255, 255, 255, 0.7)'
            _hover={{ borderColor: 'rgba(255, 255, 255, 0.9)' }}
            _focus={{ 
              borderColor: 'blue.300', 
              bg: 'rgba(255, 255, 255, 0.7)', 
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-300)' 
            }}
            placeholder='Enter your email'
            color='gray.800'
            _placeholder={{ color: 'gray.500' }}
          />
        </Field.Root>

        <Field.Root width='100%'>
          <Field.Label htmlFor='password-input' color='gray.700' fontWeight='medium'>Password</Field.Label>
          <Input
            id='password-input'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg='rgba(255, 255, 255, 0.5)' // Semi-transparent background for input
            borderColor='rgba(255, 255, 255, 0.7)'
            _hover={{ borderColor: 'rgba(255, 255, 255, 0.9)' }}
            _focus={{ 
              borderColor: 'blue.300', 
              bg: 'rgba(255, 255, 255, 0.7)', 
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-300)' 
            }}
            placeholder='Enter your password'
            color='gray.800'
            _placeholder={{ color: 'gray.500' }}
          />
        </Field.Root>

        <Button
          type='submit'
          colorPalette='blue'
          width='full'
          isLoading={isLoading}
          loadingText='Logging in...'
          spinner={<Spinner size='sm' />}
        >
          Login
        </Button>
      </VStack>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default LoginForm;