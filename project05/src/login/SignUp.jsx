import { useContext, useState } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link, Navigate } from 'react-router-dom';
import { AppButton, AppCard, AppInput, FadeIn } from '../design-system';
import { formMaxWidth, layoutSpacing } from '../design-system/tokens/spacing';
import { auth, db } from '../firebase/firebase';
import AuthLayout from '../layout/AuthLayout';
import { AuthContext } from './Auth';

const SignUp = () => {
  const { currentUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);
    const { email, password, name } = e.target.elements;

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() =>
        setDoc(doc(db, 'email', auth.currentUser.uid), {
          email: email.value,
          name: name.value,
          uid: auth.currentUser.uid,
        })
      )
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setSubmitting(false));
  };

  if (currentUser) {
    return <Navigate to="/work" replace />;
  }

  return (
    <AuthLayout>
      <FadeIn>
        <AppCard
          title="Create account"
          subtitle="Create an account to start building presentations"
          maxWidth={formMaxWidth.lg}
          padding="md"
        >
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={layoutSpacing.form}>
              <Collapse in={Boolean(errorMessage)}>
                <Alert severity="error">{errorMessage}</Alert>
              </Collapse>
              <AppInput
                id="signup-email"
                name="email"
                label="Email"
                type="email"
                required
                autoComplete="email"
              />
              <AppInput
                id="signup-password"
                name="password"
                label="Password"
                type="password"
                required
                autoComplete="new-password"
              />
              <AppInput id="signup-name" name="name" label="Full name" type="text" required autoComplete="name" />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={layoutSpacing.formActions}>
                <AppButton type="submit" variant="contained" loading={submitting} disabled={submitting} fullWidth>
                  Create account
                </AppButton>
                <AppButton component={Link} to="/login" variant="outlined" fullWidth>
                  Sign in
                </AppButton>
              </Stack>
            </Stack>
          </Box>
        </AppCard>
      </FadeIn>
    </AuthLayout>
  );
};

export default SignUp;
