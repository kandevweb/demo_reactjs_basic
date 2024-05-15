import { useMutation } from '@tanstack/react-query'
import productApi from '~/apis/product.api'

function useMutationUpdateProduct() {
  return useMutation({
    mutationFn: (data: ProductUpdate) => productApi.updateProduct(data.id, data.product)
  })
}

export default useMutationUpdateProduct
