import {
  OptionsObject,
  SnackbarMessage,
  SnackbarProvider,
  useSnackbar,
  VariantType,
} from 'notistack'
import { useCallback, useMemo } from 'react'

export const SnackbarQueueProvider = SnackbarProvider

export const useSnackbarQueue = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const bindVariant = useCallback(
    (variant: VariantType) =>
      (message: SnackbarMessage, options?: OptionsObject) =>
        enqueueSnackbar(message, { ...options, variant }),
    [enqueueSnackbar],
  )

  return useMemo(
    () => ({
      default: bindVariant('default'),
      error: bindVariant('error'),
      info: bindVariant('info'),
      success: bindVariant('success'),
      warning: bindVariant('warning'),
      close: closeSnackbar,
    }),
    [bindVariant, closeSnackbar],
  )
}
