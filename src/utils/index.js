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

// Capitalize: converts the first character of a string to uppercase
export function capitalize(str) {
	if (typeof str !== 'string') return str
	return str.charAt(0).toUpperCase() + str.slice(1)
}