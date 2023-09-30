import { fetchCoffeeIfNeeded } from '$lib/server/fetchCoffee'
import type { PageServerLoad } from './$types'

export const load = fetchCoffeeIfNeeded satisfies PageServerLoad
