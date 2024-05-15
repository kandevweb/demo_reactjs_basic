import { useSearchParams } from 'react-router-dom'

function useQueryParams() {
  const [urlQueryParams] = useSearchParams()
  return Object.fromEntries([...urlQueryParams])
}

export default useQueryParams
