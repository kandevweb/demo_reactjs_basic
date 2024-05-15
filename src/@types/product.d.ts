interface Product {
  title: string
  thumbnail: string
  category: string
  price: number
  description: string
  id: string
}

type ProductResponse = {
  first: number
  prev: null
  next: number
  last: number
  pages: number
  items: number
  data: Product[]
}

type ProductNoId = Omit<Product, 'id'>

type ProductConfigParams = {
  _page: string
  _per_page: string
}

type ProductUpdate = {
  id: number | string
  product: ProductNoId
}
