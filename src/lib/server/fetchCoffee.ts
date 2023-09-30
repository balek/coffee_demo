import type { Coffee, ImageData, CoffeeBaseInfo } from '$lib/types'

async function fetchCoffeeBaseInfo() {
	const res = await fetch('https://random-data-api.com/api/coffee/random_coffee')
	const json = (await res.json()) as CoffeeBaseInfo // TODO: parse

	return json
}

async function fetchImageData() {
	const res = await fetch('https://loremflickr.com/json/500/500/coffee,bean')
	const json = (await res.json()) as ImageData // TODO: parse
	return json
}

async function fetchCoffeeForced() {
	const [baseInfo, imageData] = await Promise.all([fetchCoffeeBaseInfo(), fetchImageData()])

	return { baseInfo, imageData }
}

let loadingPromise: Promise<Coffee> | undefined
let cachedResult: Coffee | undefined

export async function fetchCoffee() {
	if (loadingPromise) {
		return loadingPromise
	}

	loadingPromise = fetchCoffeeForced()
	try {
		cachedResult = await loadingPromise
		return cachedResult
	} finally {
		loadingPromise = undefined
	}
}

export async function fetchCoffeeIfNeeded() {
	return cachedResult ?? fetchCoffee()
}
