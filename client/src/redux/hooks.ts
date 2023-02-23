import type { TypedUseSelectorHook } from 'react-redux'
// eslint-disable-next-line no-restricted-imports
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '../types/redux'

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
