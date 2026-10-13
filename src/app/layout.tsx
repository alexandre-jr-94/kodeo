import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kodeo — Seu próximo passo começa aqui',
  description: 'Sua jornada de aprendizado em programação e cibersegurança.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><AppRouterCacheProvider>{children}</AppRouterCacheProvider></body></html>;
}
