import { fetchCoffee } from '$lib/server/fetchCoffee.js'
import { json } from '@sveltejs/kit'

export const GET = async () => json(await fetchCoffee())
