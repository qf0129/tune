import { Navigate, type RouteObject } from 'react-router'
import RootLayout from './layout/RootLayout'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import AppList from './pages/app/AppList'
import ConsoleLayout from './layout/ConsoleLayout'
import App from './pages/console/App'
import Env from './pages/console/Env'
import GitAccount from './pages/console/GitAccount'
import Image from './pages/console/Image'
import Release from './pages/console/Release'
import User from './pages/console/User'

export const consoleRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="app" replace /> },
  { path: 'app', index: true, element: <App />, handle: { title: '应用列表' } },
  { path: 'image', element: <Image />, handle: { title: '应用镜像' } },
  { path: 'release', element: <Release />, handle: { title: '发布列表' } },
  { path: 'env', element: <Env />, handle: { title: '发布环境' } },
  { path: 'git-account', element: <GitAccount />, handle: { title: 'GIT账号' } },
  { path: 'user', element: <User />, handle: { title: '用户列表' } },
]

export const routes: RouteObject[] = [
  { index: true, element: <Navigate to="/app" replace /> },
  { path: 'signin', element: <SignIn /> },
  { path: 'signup', element: <SignUp /> },
  {
    element: <RootLayout />,
    children: [
      { path: 'app', element: <AppList /> },
      { path: 'console', element: <ConsoleLayout />, children: consoleRoutes },
    ],
  },
]
