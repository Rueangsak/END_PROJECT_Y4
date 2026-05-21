import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createAppTheme } from './createAppTheme';

const ThemeModeContext = createContext({
  mode: 'light',
  setMode: () => {},
  toggleMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

/**
 * Root theme provider with light/dark architecture.
 * Toggle via useThemeMode().toggleMode() when UI is ready.
 */
export default function AppThemeProvider({ children, defaultMode = 'light' }) {
  const [mode, setMode] = useState(defaultMode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const toggleMode = useCallback(
    () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
    []
  );

  const value = useMemo(() => ({ mode, setMode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
