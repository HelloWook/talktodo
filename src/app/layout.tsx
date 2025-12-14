import fs from 'fs';
import path from 'path';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import { Suspense } from 'react';

import AlertContainer from '@/components/Alert/AlertContainer';
import DialogContainer from '@/components/DialogManager/DialogContainer';
import MemoDrawerContainer from '@/components/MemoDrawer/MemoDrawerContainer';
import ServiceWorkerRegistration from '@/components/PWA/ServiceWorkerRegistration';
import ToastContainer from '@/components/Toast/ToastContainer';
import ToastHandler from '@/components/Toast/ToastHandler';
import UserProvider from '@/components/UserProvider/UserProvider';
import NetworkStatusMonitor from '@/error/NetworkStatusMonitor';

import { Providers } from './providers';

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '톡투두',
  description: 'ai 챗봇을 활용한 할 일 관리 서비스',
  manifest: '/manifest.json',
  themeColor: '#8f3fff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '톡투두',
  },
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
  },
};

const spriteSvg = fs.readFileSync(path.join(process.cwd(), 'public', 'sprite.svg'), 'utf-8');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} antialiased`}>
        <div dangerouslySetInnerHTML={{ __html: spriteSvg }} style={{ display: 'none' }} aria-hidden='true' />
        <Providers>
          <UserProvider />
          <NetworkStatusMonitor />
          <ServiceWorkerRegistration />
          {children}

          <div id='toast-root' />
          <div id='alert-root' />
          <div id='dialog-root' />
          <div id='memo-drawer-root' />
          <Suspense fallback={null}>
            <ToastHandler />
          </Suspense>
          <ToastContainer />
          <AlertContainer />
          <DialogContainer />
          <MemoDrawerContainer />
        </Providers>
      </body>
    </html>
  );
}
