import { useRef, useLayoutEffect } from 'react'

/**
 * Hook for zooming content to fit within container
 */
export const useZoom = <
  T extends HTMLElement,
>(): React.MutableRefObject<T | null> => {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const onResize = () => {
      if (ref.current == null) {
        return
      }
      const parent = ref.current.parentNode as HTMLElement

      const wd = parent.clientWidth / ref.current.clientWidth
      const hd = parent.clientHeight / ref.current.clientHeight
      const zoom = (
        parent.clientWidth > parent.clientHeight ? hd : wd
      ).toString()

      ref.current.style.zoom = zoom
    }

    window.addEventListener('resize', onResize)

    onResize()

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return ref
}
