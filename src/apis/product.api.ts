import http from '~/utils/http'

class ProductApi {
  fetchAllProducts(_page: number | string, _per_page: number | string) {
    return http.get<ProductResponse>('products', {
      params: {
        _page,
        _per_page
      }
    })
  }

  addNewProduct(product: Product) {
    return http.post<Product>('products', product)
  }

  deleteProduct(id: number | string) {
    return http.delete<Product>(`products/${id}`)
  }

  updateProduct(id: number | string, product: ProductNoId) {
    return http.put<Product>(`products/${id}`, product)
  }
}

export default new ProductApi()
