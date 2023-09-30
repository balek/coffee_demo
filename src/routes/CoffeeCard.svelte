<script lang="ts">
	import loadingGif from '$lib/images/loading.gif'
	import type { Coffee } from '$lib/types'
	import { receive } from './transition'

	export let item: Coffee

	const COLORS = ['#fff895', '#edffdf', '#9b3724', '#e6e6e6']

	let imgLoaded = false
	const syncLoaded = (node: HTMLImageElement) => {
		imgLoaded = node.complete
		node.addEventListener('load', () => {
			imgLoaded = true
		})
	}
</script>

<article class="root" in:receive={{ key: 'test' }}>
	<div class="imageContainer">
		<img class="loadingIndicator" alt="loading..." class:active={!imgLoaded} src={loadingGif} />
		<img
			use:syncLoaded
			class="image"
			class:loaded={imgLoaded}
			src={item.imageData.file}
			alt={item.imageData.tags}
		/>
	</div>
	<div class="intensifier">{item.baseInfo.intensifier}</div>
	<div class="details">
		<div class="origin">{item.baseInfo.origin}</div>
		<div class="blendName">{item.baseInfo.blend_name}</div>
		<div class="variety">{item.baseInfo.variety}</div>
		<ul class="notes">
			{#each item.baseInfo.notes.split(',') as note, index}
				<li class="note" style={`background: ${COLORS[index % COLORS.length]}`}>{note}</li>
			{/each}
		</ul>
	</div>
</article>

<style>
	.root {
		display: flex;
		flex-direction: column;
		position: relative;
		max-width: 500px;
		width: 100%;
		margin-top: 50px;
		background: white;
		border-radius: 3px;
	}

	.intensifier {
		position: absolute;
		top: 20px;
		right: 15px;
		font-size: 2em;
	}

	.imageContainer {
		height: 400px;
		position: relative;
	}

	.loadingIndicator {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: none;
	}

	.loadingIndicator.active {
		display: block;
	}

	.image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.3s ease-in;
	}

	.loaded {
		opacity: 1;
	}

	.details {
		padding-top: 20px;
	}

	.origin,
	.blendName,
	.variety {
		padding-left: 30px;
	}

	.origin {
		color: grey;
		font-size: 1.2em;
	}

	.blendName {
		font-size: 1.8em;
		font-weight: 700;
		margin-top: 10px;
	}

	.variety {
		margin-top: 5px;
		font-size: 1.2em;
	}

	.notes {
		/* display: flex; */
		overflow-x: auto;
		list-style: none;
		padding: 0 0 10px 30px;
		margin: 20px 0;
		white-space: nowrap;
	}

	.note {
		display: inline-block;
		min-width: 100px;
		padding: 0 15px;
		line-height: 25px;
		text-align: center;
		border-radius: 5px;
		margin-right: 20px;
	}

	.note:last-child {
		margin-right: 30px;
	}
</style>
