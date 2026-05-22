import React, { useContext, useState } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Link, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AppButton, AppCard, AppInput, FadeIn } from '../design-system';
import { formMaxWidth, layoutSpacing } from '../design-system/tokens/spacing';
import { auth } from '../firebase/firebase';
import AuthLayout from '../layout/AuthLayout';
import { AuthContext } from './Auth';

const LogIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const copy = {
    title: 'Sign in',
    subtitle: 'Use your registered email and password',
    email: 'Email',
    password: 'Password',
    submit: 'Sign in',
    signup: 'Create account',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);
    const { email, password } = e.target.elements;

    signInWithEmailAndPassword(auth, email.value, password.value)
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => setSubmitting(false));
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/work" replace />;
  }

  return (
    <AuthLayout>
      <FadeIn>
        <AppCard
          title={copy.title}
          subtitle={copy.subtitle}
          maxWidth={formMaxWidth.md}
          padding="md"
        >
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={layoutSpacing.form}>
              <Collapse in={Boolean(errorMessage)}>
                <Alert severity="error">{errorMessage}</Alert>
              </Collapse>
              <AppInput
                id="login-email"
                name="email"
                label={copy.email}
                type="email"
                required
                autoComplete="email"
              />
              <AppInput
                id="login-password"
                name="password"
                label={copy.password}
                type="password"
                required
                autoComplete="current-password"
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={layoutSpacing.formActions}>
                <AppButton type="submit" variant="contained" loading={submitting} disabled={submitting} fullWidth>
                  {copy.submit}
                </AppButton>
                <AppButton component={Link} to="/SignUp" variant="outlined" fullWidth>
                  {copy.signup}
                </AppButton>
              </Stack>
            </Stack>
          </Box>
        </AppCard>
      </FadeIn>
    </AuthLayout>
  );
};

export default LogIn;
