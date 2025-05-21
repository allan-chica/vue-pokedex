// Debounce: delays a function until after a specified delay since last call
export function debounce(fn, delay) {
	let timeoutId
	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}

// Wait: pause execution for a given number of milliseconds
export function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}