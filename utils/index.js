import { useEffect, useState } from 'react'

export function isServer() {
	return typeof window === 'undefined'
}

export function useClient(content) {
	const [ready, setReady] = useState(false)
	useEffect(() => setReady(true), [])

	if (ready) {
		return content
	}
	return null;
}