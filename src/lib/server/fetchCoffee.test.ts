import { beforeEach, expect, it, vi } from 'vitest'
import { fetchCoffee, fetchCoffeeIfNeeded } from './fetchCoffee'

const fetchMock = vi.fn()
global.fetch = fetchMock

beforeEach(() => {
	fetchMock.mockClear()
	fetchMock.mockResolvedValue({ json: () => Promise.resolve({}) })
})

it('cache updates', async () => {
	const res1 = await fetchCoffeeIfNeeded()
	expect(fetchMock).toBeCalledTimes(2)

	const res2 = await fetchCoffeeIfNeeded()
	expect(fetchMock).toBeCalledTimes(2)
	expect(res1).toBe(res2)

	const res3 = await fetchCoffee()
	expect(fetchMock).toBeCalledTimes(4)
	expect(res2).not.toBe(res3)

	const res4 = await fetchCoffeeIfNeeded()
	expect(fetchMock).toBeCalledTimes(4)
	expect(res3).toBe(res4)
})

it('do not send parallel queries', async () => {
	const res = await Promise.all([fetchCoffee(), fetchCoffee(), fetchCoffee()])

	expect(fetchMock).toBeCalledTimes(2)
	expect(res[0]).toBe(res[1])
	expect(res[1]).toBe(res[2])
})
