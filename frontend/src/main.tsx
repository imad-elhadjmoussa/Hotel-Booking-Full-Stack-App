import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider } from './contexts/AppContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
)
