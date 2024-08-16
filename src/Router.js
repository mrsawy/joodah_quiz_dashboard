import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { DashboardComponent } from './main';
import Spinner from './components/Spinner';
import { Page404 } from './routes/sections';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardComponent />,
  },
  // {
  //   path: "/quiz",
  //   element: <App />,
  // },

  {
    path: '/dashboard',
    element: <DashboardComponent />,
  },
  {
    path: '/quiz/dashboard',
    element: <DashboardComponent />,
  },
  {
    path: '/quiz/*',
    element: <DashboardComponent />,
  },
  {
    path: '*',
    element: <DashboardComponent />,
  },
]);

export default router;
