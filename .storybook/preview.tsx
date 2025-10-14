import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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
        <AppRouterContext.Provider value={mockedRouter}>
          <div>
            <Story />
          </div>
        </AppRouterContext.Provider>
      );
    },
  ],
};

export default preview;
