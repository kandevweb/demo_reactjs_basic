import { useState } from 'react'
import useProductConfigParams from './hooks/useProductConfigParams'
import useQueryProducts from './hooks/useQueryProducts'
import ProductItem from './components/ProductItem'
import Pagination from './components/Pagination'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProductForm, productSchema } from '~/utils/rules'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import useMutationAddProduct from './hooks/useMutationAddProduct'
import useMutationUpdateProduct from './hooks/useMutationUpdateProduct'
import { Link, createSearchParams } from 'react-router-dom'

function Product() {
  // Hooks
  const productConfigParams = useProductConfigParams()
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [updateProduct, setUpdateProduct] = useState<Product | null>(null)

  // React Query
  const queryClient = useQueryClient()
  const { data } = useQueryProducts(productConfigParams)
  const addProductMutation = useMutationAddProduct()
  const updateProductMutation = useMutationUpdateProduct()

  // React Hooks Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<ProductForm>({
    resolver: yupResolver(productSchema)
  })

  // Functions
  const handleAddProduct = handleSubmit((product) => {
    if (!updateProduct) {
      const dataProduct = { ...product, id: new Date().toISOString() }
      addProductMutation.mutate(dataProduct, {
        onSuccess: () => {
          reset()
          queryClient.invalidateQueries({ queryKey: ['products'] })
          toast.success('Thêm sản phẩm thành công ')
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    } else {
      const data: ProductUpdate = {
        id: updateProduct.id,
        product
      }
      updateProductMutation.mutate(data, {
        onSuccess: () => {
          reset()
          setUpdateProduct(null)
          queryClient.invalidateQueries({ queryKey: ['products'] })
          toast.success('Cập nhật sản phẩm thành công ')
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    }
  })

  const startUpdateProduct = (id: number | string) => {
    const product = products.find((product) => product.id === id)

    if (product) {
      setUpdateProduct(product)

      const keys = Object.keys(product).filter((key) => key !== 'id') as [keyof ProductForm]

      keys.forEach((key) => {
        setValue(key, product[key])
        setError(key, {
          message: '',
          type: 'custom'
        })
      })
    }
  }

  const closeUpdateProduct = () => {
    setUpdateProduct(null)
    reset()
  }

  const products = data?.data.data ?? []
  const pageSize = data?.data.pages ?? 0
  const total = data?.data.items

  console.log('re-render')

  return (
    <div className='container mx-auto py-8'>
      <h2 className='text-center text-[22px] font-semibold tracking-wide text-gray-700'>
        {updateProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
      </h2>
      <form onSubmit={handleAddProduct} className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div>
          <label className='mb-2 block text-sm text-gray-600 dark:text-gray-200'>Tên sản phẩm</label>
          <input
            type='text'
            placeholder='IPhone 15 Pro Max'
            className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-[8px] text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400'
            {...register('title')}
          />
          <span className='mt-2 block text-sm text-red-500'>{errors.title?.message}</span>
        </div>
        <div>
          <label className='mb-2 block text-sm text-gray-600 dark:text-gray-200'>Hình ảnh</label>
          <input
            type='text'
            placeholder='https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/'
            className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-[8px] text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400'
            {...register('thumbnail')}
          />
          <span className='mt-2 block text-sm text-red-500'>{errors.thumbnail?.message}</span>
        </div>
        <div>
          <label className='mb-2 block text-sm text-gray-600 dark:text-gray-200'>Danh mục</label>
          <input
            type='text'
            placeholder='IPhone'
            className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-[8px] text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400'
            {...register('category')}
          />
          <span className='mt-2 block text-sm text-red-500'>{errors.category?.message}</span>
        </div>
        <div className='col-span-1'>
          <label className='mb-2 block text-sm text-gray-600 dark:text-gray-200'>Giá</label>
          <input
            type='text'
            placeholder='25.990.000đ'
            className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-[8px] text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400'
            {...register('price')}
          />
          <span className='mt-2 block text-sm text-red-500'>{errors.price?.message}</span>
        </div>
        <div className='col-span-2'>
          <label className='mb-2 block text-sm text-gray-600 dark:text-gray-200'>Mô tả</label>
          <input
            type='text'
            placeholder='Nội dung chi tiết cần mô tả ...'
            className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-[8px] text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400'
            {...register('description')}
          />
          <span className='mt-2 block text-sm text-red-500'>{errors.description?.message}</span>
        </div>
        <div className='flex items-center gap-4'>
          {updateProduct && (
            <button
              onClick={closeUpdateProduct}
              type='button'
              className='inline-flex w-[145px] justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 sm:text-sm'
            >
              Quay lại
            </button>
          )}
          <button className='flex w-[145px] transform items-center justify-between whitespace-nowrap rounded-md bg-blue-500 px-6 py-3 text-sm capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
            <span>{updateProduct ? 'Cập nhật' : 'Thêm mới'}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 rtl:-scale-x-100'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </form>

      <div className='mt-5 flex items-center justify-end'>
        <div className='relative'>
          <button onClick={() => setIsHovering(!isHovering)} className='rounded-md bg-blue-500 px-4 py-2 text-white'>
            Số lượng hiển thị
          </button>
          {isHovering && (
            <ul
              onMouseLeave={() => setIsHovering(false)}
              style={{ border: '1px solid #eee' }}
              className='absolute left-2/4 z-20 mt-2 max-h-[280px] w-[160px] -translate-x-2/4 overflow-x-hidden overflow-y-scroll rounded-md bg-white shadow-sm'
            >
              {Array(total)
                .fill(0)
                .map((_, index) => {
                  const num = index
                  if (num % 2 === 0) {
                    return (
                      <Link
                        to={{
                          pathname: '/product',
                          search: createSearchParams({
                            ...productConfigParams,
                            _per_page: num.toString()
                          }).toString()
                        }}
                        key={num + 1}
                        onClick={() => setIsHovering(false)}
                        className='block cursor-pointer px-4 py-2 hover:bg-gray-50'
                      >
                        {num + 1} sản phẩm
                      </Link>
                    )
                  }
                })}
            </ul>
          )}
        </div>
      </div>

      {/* list product */}
      <div className='mt-8 overflow-hidden rounded-lg border border-gray-200 shadow-md'>
        <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
          <thead className='bg-gray-50'>
            <tr>
              <th scope='col' className='w-[375px] px-6 py-4 font-medium text-gray-900'>
                Tên sản phẩm
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Danh mục
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Giá tiền
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Trạng thái
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Mô tả
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
            {/* Product Item */}
            {products.map((product) => (
              <ProductItem startUpdateProduct={startUpdateProduct} product={product} key={product.id} />
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <Pagination pageSize={pageSize} />
    </div>
  )
}

export default Product
