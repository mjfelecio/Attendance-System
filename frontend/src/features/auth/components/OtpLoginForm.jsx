import { useState } from 'react';
import { VStack, Button, Input, HStack, Text, Spinner } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/auth';

function OtpLoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email'); // 'email' | 'otp'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    if (!email) return setMessage('Email is required');
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${apiBase}/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Failed to send OTP');
      setStep('otp');
      setMessage('OTP sent to your email');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return setMessage('Please enter the OTP');
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${apiBase}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Invalid OTP');
      onSuccess(email);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack gap="4" w="100%">
      {step === 'email' && (
        <>
          <Input
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button w="full" colorScheme="blue" onClick={sendOtp} isDisabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Send OTP'}
          </Button>
        </>
      )}
      {step === 'otp' && (
        <>
          <HStack w="100%">
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button onClick={sendOtp} isDisabled={loading} variant="outline">
              Resend
            </Button>
          </HStack>
          <Button w="full" colorScheme="blue" onClick={verifyOtp} isDisabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Verify & Login'}
          </Button>
        </>
      )}
      {message && (
        <Text fontSize="sm" color="red.500" align="center">
          {message}
        </Text>
      )}
    </VStack>
  );
}

OtpLoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default OtpLoginForm;
