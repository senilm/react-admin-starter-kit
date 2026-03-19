import { RouterProvider } from 'react-router';
import { router } from '@/routes';
import { Badge } from './components/ui/badge';
import { Providers } from './providers';

export const App = () => {
  return (
    <>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
      {import.meta.env.VITE_ENVIRONMENT !== 'production' && (
        <Badge className="z-30 fixed bottom-16 right-4">{import.meta.env.VITE_ENVIRONMENT}</Badge>
      )}
    </>
  );
};
