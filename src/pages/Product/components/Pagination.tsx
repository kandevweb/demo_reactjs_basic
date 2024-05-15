import { Link, createSearchParams } from 'react-router-dom'
import useProductConfigParams from '../hooks/useProductConfigParams'
import classNames from 'classnames'

interface Props {
  pageSize: number
}

function Pagination({ pageSize }: Props) {
  const productConfigParams = useProductConfigParams()
  const currentPage = +productConfigParams._page

  const renderPagination = () => {
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = ++index

        return (
          <Link
            to={{
              pathname: '/product',
              search: createSearchParams({
                ...productConfigParams,
                _page: pageNumber.toString()
              }).toString()
            }}
            key={pageNumber}
            className={classNames('cursor-pointer rounded-md px-[10px] py-1 text-sm text-gray-600', {
              'bg-gray-100': currentPage === pageNumber,
              'bg-white': currentPage !== pageNumber
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-6 flex items-center justify-between'>
      <Link
        to={{
          pathname: '/product',
          search: createSearchParams({
            ...productConfigParams,
            _page: '1'
          }).toString()
        }}
        className='flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-5 w-5 rtl:-scale-x-100'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
        </svg>
        <span>First</span>
      </Link>
      <div className='hidden items-center gap-x-3 md:flex'>{renderPagination()}</div>
      <Link
        to={{
          pathname: '/product',
          search: createSearchParams({
            ...productConfigParams,
            _page: pageSize.toString()
          }).toString()
        }}
        className='flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
      >
        <span>Last</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-5 w-5 rtl:-scale-x-100'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
        </svg>
      </Link>
    </div>
  )
}

export default Pagination
