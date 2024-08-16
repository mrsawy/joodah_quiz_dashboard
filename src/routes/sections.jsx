import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './../layouts/dashboard';

export const IndexPage = lazy(() => import('./../pages/app'));
export const LevelsPage = lazy(() => import('./../pages/levels'));
export const UsersPage = lazy(() => import('./../pages/user'));
export const LoginForm = lazy(() => import('./../pages/LoginForm'));
export const QuestionsPage = lazy(() => import('./../pages/questions'));
export const SiteData = lazy(() => import('./../pages/SiteData'));
export const Page404 = lazy(() => import('./../pages/page-not-found'));
export const ProtectedRoute = lazy(() => import('./ProtectedRoute'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'dashboard/users', element: <UsersPage /> },
        { path: 'quiz/dashboard/users', element: <UsersPage /> },
        { path: './quiz/dashboard/users', element: <UsersPage /> },
        { path: './dashboard/users', element: <UsersPage /> },
        { path: 'dashboard/users', element: <UsersPage /> },
        { path: 'dashboard/levels', element: <LevelsPage /> },
        { path: 'dashboard/questions', element: <QuestionsPage /> },
        { path: 'dashboard/siteData', element: <SiteData /> },
      ],
    },
    {
      path: 'dashboard/login',
      element: <LoginForm />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
