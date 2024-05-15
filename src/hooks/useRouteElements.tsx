import { useRoutes, Navigate } from 'react-router-dom'
import Product from '~/pages/Product'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate to='/product' replace />
    },
    {
      path: '/product',
      element: <Product />
    }
  ])

  return routeElements
}

export default useRouteElements
