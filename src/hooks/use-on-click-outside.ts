import { RefObject, useEffect } from 'react'

type Event = MouseEvent | TouchEvent

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: (event: Event) => void
) => {
	useEffect(() => {
		const listener = (event: Event) => {
			const el = ref?.current
			if (!el || el.contains((event?.target as Node) || null)) {
				return
			}

			handler(event) // Вызывается обработчик только в том случае, если щелчок происходит за пределами переданного элемента.
		}

		document.addEventListener('mousedown', listener)
		document.addEventListener('touchstart', listener)

		return () => {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
	}, [ref, handler]) // Перезагрузка только при изменении ссылки или обработчика
}
