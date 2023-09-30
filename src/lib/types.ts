export interface CoffeeBaseInfo {
	id: number
	uid: string
	blend_name: string
	origin: string
	variety: string
	notes: string
	intensifier: string
}

export interface ImageData {
	file: string
	license: string
	owner: string
	width: number
	height: number
	filter: string
	tags: string
	tagMode: string
}

export interface Coffee {
	baseInfo: CoffeeBaseInfo
	imageData: ImageData
}
