import { useEffect } from "react"

export function useOutsideClick(ref: any, onClickOut: (e: any) => void, deps = []): void {
  useEffect(() => {
    const onClick = ({ target }: any): false | void => !ref?.contains(target) && onClickOut?.(target)

    document.addEventListener(`click`, onClick)

    // Remove event listener
    return (): void => document.removeEventListener(`click`, onClick)
  }, deps)
}
