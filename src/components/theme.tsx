'use client';
import { createTheme } from '@mui/material/styles';
export function makeTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: { mode, primary: { main: mode === 'light' ? 'hsl(210, 60%, 20%)' : 'hsl(210, 65%, 72%)' }, background: { default: mode === 'light' ? '#f7f9fc' : '#0e141d', paper: mode === 'light' ? '#ffffff' : '#151d28' }, text: { primary: mode === 'light' ? '#192a3d' : '#e5edf7', secondary: mode === 'light' ? '#617084' : '#9aaabd' }, success: { main: mode === 'light' ? '#267259' : '#81bba5' }, divider: mode === 'light' ? '#e5eaf0' : '#293442' },
    typography: { fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', button: { textTransform: 'none', fontWeight: 600 } },
    shape: { borderRadius: 10 },
    components: { MuiCssBaseline: { styleOverrides: { body: { '--muted': mode === 'light' ? '#617084' : '#9aaabd', '--border': mode === 'light' ? '#e5eaf0' : '#293442', '--accent-soft': mode === 'light' ? '#eaf1f9' : '#1d3045', '--amber': mode === 'light' ? '#997125' : '#d1b57b' } } }, MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { borderRadius: 8, padding: '10px 18px' } } }, MuiDialog: { styleOverrides: { paper: { backgroundImage: 'none' } } } },
  });
}
