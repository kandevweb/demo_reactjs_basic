import { useMutation } from '@tanstack/react-query'
import productApi from '~/apis/product.api'

function useMutationAddProduct() {
  return useMutation({
    mutationFn: (product: Product) => productApi.addNewProduct(product)
  })
}

export default useMutationAddProduct
