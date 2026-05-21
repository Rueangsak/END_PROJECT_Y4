import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AppButton, AppModal } from '../primitives';

const FeedbackContext = createContext({
  notifySuccess: () => {},
  notifyError: () => {},
  notifyInfo: () => {},
  confirm: () => Promise.resolve(false),
});

export function useAppFeedback() {
  return useContext(FeedbackContext);
}

/**
 * Global snackbars + accessible confirm dialog (replaces alert/confirm).
 */
export default function AppFeedbackProvider({ children }) {
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [confirmState, setConfirmState] = useState({
    open: false,
    title: 'Confirm',
    message: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    destructive: false,
    resolve: null,
  });

  const closeSnack = () => setSnack((s) => ({ ...s, open: false }));

  const notifySuccess = useCallback((message) => {
    setSnack({ open: true, message, severity: 'success' });
  }, []);

  const notifyError = useCallback((message) => {
    setSnack({ open: true, message, severity: 'error' });
  }, []);

  const notifyInfo = useCallback((message) => {
    setSnack({ open: true, message, severity: 'info' });
  }, []);

  const confirm = useCallback(
    ({ title = 'Confirm', message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', destructive = false }) =>
      new Promise((resolve) => {
        setConfirmState({
          open: true,
          title,
          message,
          confirmLabel,
          cancelLabel,
          destructive,
          resolve,
        });
      }),
    []
  );

  const closeConfirm = (result) => {
    confirmState.resolve?.(result);
    setConfirmState((s) => ({ ...s, open: false, resolve: null }));
  };

  const value = useMemo(
    () => ({ notifySuccess, notifyError, notifyInfo, confirm }),
    [notifySuccess, notifyError, notifyInfo, confirm]
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={closeSnack}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeSnack} severity={snack.severity} variant="filled" sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
      <AppModal
        open={confirmState.open}
        onClose={() => closeConfirm(false)}
        title={confirmState.title}
        maxWidth="xs"
      >
        <Stack spacing={2}>
          <Typography variant="body2">{confirmState.message}</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-end">
            <AppButton variant="outlined" onClick={() => closeConfirm(false)}>
              {confirmState.cancelLabel}
            </AppButton>
            <AppButton
              variant="contained"
              color={confirmState.destructive ? 'error' : 'primary'}
              onClick={() => closeConfirm(true)}
            >
              {confirmState.confirmLabel}
            </AppButton>
          </Stack>
        </Stack>
      </AppModal>
    </FeedbackContext.Provider>
  );
}
