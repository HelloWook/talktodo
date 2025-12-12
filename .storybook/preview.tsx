import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';
import './preview.css';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Providers } from '../src/app/providers';
import React, { useEffect, useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      const [spriteSvg, setSpriteSvg] = useState<string>('');
      const mockedRouter = {
        push: () => {},
        replace: () => {},
        refresh: () => {},
        back: () => {},
        forward: () => {},
        prefetch: () => {},
        params: {},
        searchParams: new URLSearchParams(),
        pathname: '/',
      };

      useEffect(() => {
        fetch('/sprite.svg')
          .then((res) => res.text())
          .then((text) => setSpriteSvg(text))
          .catch((err) => console.error('Failed to load sprite.svg:', err));
      }, []);

      return (
        <>
          {spriteSvg && <div dangerouslySetInnerHTML={{ __html: spriteSvg }} style={{ display: 'none' }} aria-hidden='true' />}
          <QueryClientProvider client={queryClient}>
            <AppRouterContext.Provider value={mockedRouter}>
              <Story />
            </AppRouterContext.Provider>
          </QueryClientProvider>
        </>
      );
    },
  ],
};

export default preview;
