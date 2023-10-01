import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
	const [debounce, setDebounce] = useState(value);
	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebounce(value);
		}, delay);
		return () => clearTimeout(timerId);
	}, [value, delay]);
	return debounce;
}

export default useDebounce;
