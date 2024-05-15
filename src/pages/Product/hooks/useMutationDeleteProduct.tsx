import { useMutation } from '@tanstack/react-query'
import productApi from '~/apis/product.api'

function useMutationDeleteProduct() {
  return useMutation({
    mutationFn: (id: number | string) => productApi.deleteProduct(id)
  })
}

export default useMutationDeleteProduct
