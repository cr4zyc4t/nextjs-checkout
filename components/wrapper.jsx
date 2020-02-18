import { useEffect } from 'react';

export default function Wrapper({ children }) {
	useEffect(() => {
		console.log('ToanVQ: Wrapper -> Wrapper', Date.now()); 
	}, [])
	return (
		<div>
			{children}
		</div>
	)
}