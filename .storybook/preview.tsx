import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';
import './preview.css';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Providers } from '../src/app/providers';
import React from 'react';

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

      return (
        <>
          <Providers>
            <AppRouterContext.Provider value={mockedRouter}>
              <Story />
            </AppRouterContext.Provider>
          </Providers>
        </>
      );
    },
  ],
};

export default preview;
