import { create } from 'zustand'

interface State {
  countProduct: number
}

interface Action {
  setCountProduct: (newCount: number) => void
}

const useProductStore = create<State & Action>((set) => ({
  countProduct: 1,
  setCountProduct: (newCount) => set(() => ({ countProduct: newCount }))
}))

export default useProductStore
