import useQueryParams from '~/hooks/useQueryParams'

function useProductConfigParams() {
  const urlQueryParams = useQueryParams()
  const productConfigParams: ProductConfigParams = {
    _page: urlQueryParams['_page'] || '1',
    _per_page: urlQueryParams['_per_page'] || '2'
  }
  return productConfigParams
}

export default useProductConfigParams
