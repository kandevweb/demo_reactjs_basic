import { keepPreviousData, useQuery } from '@tanstack/react-query'
import productApi from '~/apis/product.api'

function useQueryProducts(productConfigParams: ProductConfigParams) {
  const _page = productConfigParams._page
  const _per_page = productConfigParams._per_page

  return useQuery({
    queryKey: ['products', productConfigParams],
    queryFn: () => productApi.fetchAllProducts(_page, _per_page),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData
  })
}

export default useQueryProducts
