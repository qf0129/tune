import './index.css'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { routes } from './routes'
import { StrictMode } from 'react'
import { App, ConfigProvider, type ThemeConfig } from 'antd'

const customTheme: ThemeConfig = {
  token: {
    colorPrimary: '#0050b3',
    borderRadius: 2,
  },
}

const router = createBrowserRouter(routes)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={customTheme}>
      <App>
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  </StrictMode>
)
