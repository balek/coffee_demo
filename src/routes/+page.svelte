<script lang="ts">
	import { browser } from '$app/environment'
	import loadingGif from '$lib/images/loading.gif'
	import CoffeeCard from './CoffeeCard.svelte'
	import './styles.css'
	import { send } from './transition'

	export let data

	const TIMEOUT = 30000

	const feed = [data]

	let loading = false
	let timer = browser ? setTimeout(fetchMore, TIMEOUT) : undefined
	async function fetchMore() {
		clearTimeout(timer)
		loading = true
		try {
			const res = await fetch('/api/coffee')
			feed[feed.length] = await res.json()
		} finally {
			loading = false
		}
		timer = setTimeout(fetchMore, TIMEOUT)
	}
</script>

<svelte:head>
	<title>Coffee feed</title>
	<meta name="description" content="Coffee feed app" />
</svelte:head>

<main>
	{#each feed as item, index (item)}
		<CoffeeCard {item} />

		<!-- Place button here and position it absolute for crossfade animation -->
		{#if index == feed.length - 1}
			<div class="fetchMoreButtonContainer">
				<button
					type="button"
					class="fetchMoreButton"
					on:click={fetchMore}
					disabled={loading}
					out:send={{ key: 'test' }}
				>
					{#if loading}<img src={loadingGif} class="loadingIndicator" alt="..." />{:else}+{/if}
				</button>
			</div>
		{/if}
	{/each}
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		align-items: center;
		padding-bottom: 200px;
	}

	.fetchMoreButtonContainer {
		position: relative;
	}

	.fetchMoreButton {
		position: absolute;
		transform: translateX(-50%);
		margin-top: 60px;
		width: 50px;
		height: 50px;
		background: #f24726;
		border-radius: 25px;
		border: none;
		font-size: 3em;
		color: white;
		text-align: center;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loadingIndicator {
		width: 70%;
		height: 70%;
		object-fit: contain;
	}
</style>
