/**
 * @author Space.yg
 */

// Classes
import { Base } from "./Base.js"
import { Seed } from "./Seed.js"
import { Factory } from "./buildings/tiers/output-tiers/Factory.js"

// Objects
import { extractor, extractorOutputPerMin, uraniumExtractor, uraniumExtractorOutputPerMin } from "@/objects/buildings/factories.js"

// Types
import type { BaseParams } from "./Base.js"
import type { ResourcesParams } from "./Seed.js"
import type { InputOptions, InputMap } from "./Input.js"
import type { InGameResource, MaxItem } from "@/utils/resources.js"

/**
 * Parameters for {@link Item `Item`}.
 * @extends {{@link BaseParams `BaseParams`}
 */
export type ItemParams = BaseParams & {
	/** The factory that makes the item. */
	factory: Factory
	/** The resources needed to make the item. */
	resourcesNeeded: InputOptions[]
	/**
	 * The relative path or URL to the image of the recipe of the item.
	 * @default ""
	 */
	recipeImage?: string
	/** The output/min of the item in tier 1 of the factory. */
	outputPerMin: number
	/**
	 * The amount of items produces each manufacture.
	 * 
	 * Example: Copper wire's output amount is `2`.
	 * @default 1
	 */
	outputAmount?: number
}

// TODO: Add alt recipes
/**
 * Make a new item.
 * @extends {{@link Base `Base`}
 */
export class Item extends Base {

	//// Static Properties

	/**
	 * All the items that has been created. 
	 * @readonly
	 */
	static readonly items: Item[] = []

	//// Static Methods

	/**
	 * Get Item objects from a name.
	 * @param name The item to get.
	 * @returns The items if found or `undefined` if not found.
	 */
	static getItemsByName(name: string): Item[] {
		const items: Item[] = []
		// forEach method is faster than for of loop
		Item.items.forEach(item => { if (item.name === name) items.push(item) })
		return items
	}

	//// Object Properties

	/** The factory that makes the item. */
	factory: ItemParams["factory"]
	/** The image URL of the recipe of the item. */
	recipeImage: NonNullable<ItemParams["recipeImage"]>
	/** The output/min of the item in tier 1 of the factory. */
	outputPerMin: ItemParams["outputPerMin"]
	/**
	 * The amount of items produces each manufacture.
	 * 
	 * Example: Copper wire's output amount is `2`.
	 * @default 1
	 */
	outputAmount: NonNullable<ItemParams["outputAmount"]>
	/** The resources needed to make the item. */
	resourcesNeeded: InputMap
	/** The base resources needed for 1 of the item. */
	baseResources: Partial<ResourcesParams>

	//* Getters
	/** Get the max output/min of the factory to make this item. */
	get maxOutputPerMin() { return this.getOutputPerMin(this.factory.maxTierNum) }
	/** Get the resources needed to make the item at the max tier. */
	get maxResourcesNeeded() { return this.getResourcesNeeded(this.factory.maxTierNum) }

	//// Constructors

	/**
	 * Construct an {@link Item `Item`} object.
	 * @param params The item parameters.
	 */
	constructor(params: ItemParams, passByReference?: boolean)
	/**
	 * Construct an {@link Item `Item`} object from a pre-existing object.
	 * @param item An item object.
	 */
	constructor(item: Item, passByReference?: boolean)
	/**
	 * Construct an {@link Item `Item`} object.
	 * @param item The item object or item parameters.
	 */
	constructor(item: Item | ItemParams, passByReference?: boolean)
	/**
	 * Construct an {@link Item `Item`} object.
	 * @param paramsOrItem The item object or item parameters.
	 */
	constructor(paramsOrItem: Item | ItemParams, passByReference: boolean = true) {
		// Check if total inputs equals
		if (paramsOrItem.factory.inputs !== (Array.isArray(paramsOrItem.resourcesNeeded) ? paramsOrItem.resourcesNeeded.length : paramsOrItem.resourcesNeeded.size)) throw new Error("Total amount of resources needed does not equal to the amount of inputs of the factory.")

		//// Initials
		super(paramsOrItem)
		this.image = paramsOrItem.image ?? this.image + `items/${this.name}.png`
		this.recipeImage = paramsOrItem.recipeImage ?? `./resources/recipes/${this.name}.png`
		this.outputPerMin = paramsOrItem.outputPerMin
		this.outputAmount = paramsOrItem.outputAmount ?? 1

		this.resourcesNeeded = new Map()
		if (passByReference) {
			// factory
			this.factory = paramsOrItem.factory

			// resourcesNeeded
			if (paramsOrItem instanceof Item) this.resourcesNeeded = paramsOrItem.resourcesNeeded
			else for (const input of paramsOrItem.resourcesNeeded) this.resourcesNeeded.set(input.item, { amount: input.amount, inputPerMin: input.amount * this.outputPerMin })
		} else {
			// factory
			this.factory = new Factory(paramsOrItem.factory, passByReference)

			// resourcesNeeded
			if (paramsOrItem instanceof Item) for (const [inputOption, inputPerMin] of paramsOrItem.resourcesNeeded) this.resourcesNeeded.set(new Item(inputOption, passByReference), { ...inputPerMin })
			else for (const input of paramsOrItem.resourcesNeeded) this.resourcesNeeded.set(input.item, { amount: input.amount, inputPerMin: input.amount * this.outputPerMin })
		}

		this.baseResources = this.getAmountOfBaseResources()

		// Statics
		Item.items.push(this)
	}

	//// Object Methods

	/**
	 * Check if this item needs another item in it's recipe tree.
	 * @param item The item to search for.
	 * @param scannedItems The scanned items so that they are skipped.
	 * @returns `true` if found, `false` otherwise.
	 */
	#needsFunction(item: Item, scannedItems: string[]): boolean {
		// Check if item was already seen
		if (scannedItems.includes(this.name)) return false

		// if this is the item...
		if (this === item) return true

		// Add to the seen items
		scannedItems.push(this.name)

		// if item is a raw item...
		if (this.resourcesNeeded.size === 0) return false

		// Find item recursively
		return !this.resourcesNeeded.keys().every(item => !item.#needsFunction(item, scannedItems))
	}

	/**
	 * Check if this item needs another item in it's recipe tree.
	 * @param name The name of the item to search for.
	 * @returns `true` if found, `false` otherwise.
	 */
	needs(name: string): boolean
	/**
	 * Check if this item needs another item in it's recipe tree.
	 * @param item An Item object to search for.
	 * @returns `true` if found, `false` otherwise.
	 */
	needs(item: Item): boolean
	/**
	 * Check if this item needs another item in it's recipe tree.
	 * @param itemOrName The name of the item or an Item object to search for.
	 * @returns `true` if found, `false` otherwise.
	 */
	needs(itemOrName: Item | string): boolean {
		if (typeof itemOrName === "string") {
			// Get the item
			const items = Item.getItemsByName(itemOrName)
			if (items.length === 0) return false

			// Find the item
			return items.values().every(item => this.#needsFunction(item, []))
		} else return this.#needsFunction(itemOrName, [])
	}

	/**
	 * Get the amount of base resources used to make the item.
	 * @param amount The amount to be added to the total of the item.
	 * @returns The amount of base resources needed to make the item.
	 */
	#getAmountOfBaseResourcesFunction(amount: number): { [resource: string]: number } {
		// Base resource
		if (this.resourcesNeeded.size === 0) return {
			[this.name]: amount
		}

		let resources: { [resource: string]: number } = {}

		// For each resource needed
		let r: { [resource: string]: number }
		for (const [item, inputPerMin] of this.resourcesNeeded) {
			amount /= this.outputAmount

			r = item.#getAmountOfBaseResourcesFunction(amount)
			for (const resource in r) resources[resource] = (resources[resource] ?? 0) + r[resource]! * inputPerMin.amount
		}

		return resources
	}
	/**
	 * Get the amount of base resources used to make the item.
	 * @param amount The amount of that resource. Default is 1.
	 */
	getAmountOfBaseResources(amount: number = 1): { [resource: string]: number } {
		const resources = this.#getAmountOfBaseResourcesFunction(amount)

		// Round results
		for (const resource in resources) resources[resource] = Math.round(resources[resource]! * 1_000_000) / 1_000_000

		return resources
	}

	/**
	 * Get the amount of resources needed to make the item.
	 * @param amount The amount to be added to the total of the item.
	 * @returns The amount of resources needed to make the item.
	 */
	#getAmountOfResourcesFunction(amount: number): { [resource: string]: number } {
		let resources: { [resource: string]: number } = {
			[this.name]: amount
		}

		// For each resource needed
		let r: { [resource: string]: number }
		for (const [item, inputPerMin] of this.resourcesNeeded) {
			amount /= this.outputAmount

			r = item.#getAmountOfResourcesFunction(amount)
			for (const resource in r) resources[resource] = (resources[resource] ?? 0) + r[resource]! * inputPerMin.amount
		}

		return resources
	}
	/**
	 * Get the amount of resources used to make the item.
	 * @param amount The amount of that resource. Default is 1.
	 */
	getAmountOfResources(amount: number = 1): { [resource: string]: number } {
		const resources = this.#getAmountOfResourcesFunction(amount)

		// Round results
		for (const resource in resources) resources[resource] = Math.round(resources[resource] * 1_000_000) / 1_000_000

		return resources
	}

	/**
	 * Get the output/min based on the tier of the factory.
	 * @param tier The tier to get the output of. Default is 1.
	 */
	getOutputPerMin(tier: number = 1): number {
		// Check if tier is valid
		this.factory.hasN(tier, true)

		return this.outputPerMin * this.factory.tiers[tier].output
	}

	/**
	 * Get the resources needed to make the item at a tier
	 * @param tier The tier to get the resources needed. Default is 1
	 */
	getResourcesNeeded(tier: number = 1): InputMap {
		// Check if tier is valid
		this.factory.hasN(tier, true)

		const resources: InputMap = new Map()
		for (const [item, inputPerMin] of this.resourcesNeeded) resources.set(item, {
			amount: inputPerMin.amount,
			inputPerMin: this.resourcesNeeded.get(item)!.inputPerMin * this.factory.tiers[tier].output,
		})
		return resources
	}

	/**
	 * **Note: This method only works with the normal in-game _base_ items. It does not work with any custom _base_ items.**
	 * 
	 * Get the maximum amount you can get of this item in a seed.
	 * @param seed A {@link Seed `Seed`} object.
	 * @returns the maximum amount you can get of this item.
	 */
	getMaxAmount(seed: Seed): number
	/**
	 * **Note: This method only works with the normal in-game _base_ items. It does not work with any custom _base_ items.**
	 * 
	 * Get the maximum amount you can get of this item in a seed.
	 * @param resources The resources in the world.
	 * @returns the maximum amount you can get of this item.
	 */
	getMaxAmount(resources: ResourcesParams): number
	/**
	 * **Note: This method only works with the normal in-game _base_ items. It does not work with any custom _base_ items.**
	 * 
	 * Get the maximum amount you can get of this item in a seed.
	 * @param resourcesOrSeed The resources in the world or a {@link Seed `Seed`} object.
	 * @returns the maximum amount you can get of this item.
	 */
	getMaxAmount(resourcesOrSeed: Seed | ResourcesParams): number {
		const resources: ResourcesParams = resourcesOrSeed instanceof Seed ? resourcesOrSeed.resources : resourcesOrSeed

		// Get Extractor speeds
		const extractorMaxOutput = extractor.maxTier.output * extractorOutputPerMin
		const uraniumExtractorMaxOutput = uraniumExtractor.maxTier.output * uraniumExtractorOutputPerMin

		let lowest = Number.MAX_SAFE_INTEGER
		for (const name in this.baseResources) lowest = Math.min(lowest, resources[name as keyof ResourcesParams] * (name === "Uranium Ore" ? uraniumExtractorMaxOutput : extractorMaxOutput) / this.baseResources[name as keyof ResourcesParams]!)
		return lowest
	}

	/**
	 * **Note: This method only works with the normal in-game items. It does not work with custom items.**
	 * 
	 * Calculate the maximum amount of this item that can be made in a seed.
	 * 
	 * @param resources The resources of a seed
	 * @param boost Whether to calculate with power plant boosts taken in mind or not
	 * @param alt Whether to calculate with alt resources taken in mind or not
	 * 
	 * @template Boost Whether to calculate with power plant boosts taken in mind or not
	 * @template Alts Whether to calculate with alt resources taken in mind or not
	 * 
	 * @author Human-Crow
	 */
	getMaxInGameItemAmount<Boost extends boolean = false, Alt extends boolean = false>(resources: ResourcesParams, boost?: Boost, alt?: Alt): Promise<MaxItem<Boost, Alt>>
	/**
	 * **Note: This method only works with the normal in-game items. It does not work with custom items.**
	 * 
	 * Calculate the maximum amount of this item that can be made in a seed.
	 * 
	 * @param seed A seed
	 * @param boost Whether to calculate with power plant boosts taken in mind or not
	 * @param alt Whether to calculate with alt resources taken in mind or not
	 * 
	 * @template Boost Whether to calculate with power plant boosts taken in mind or not
	 * @template Alts Whether to calculate with alt resources taken in mind or not
	 * 
	 * @author Human-Crow
	 */
	getMaxInGameItemAmount<Boost extends boolean = false, Alt extends boolean = false>(seed: Seed, boost?: Boost, alt?: Alt): Promise<MaxItem<Boost, Alt>>
	/**
	 * **Note: This method only works with the normal in-game items. It does not work with custom items.**
	 * 
	 * Calculate the maximum amount of this item that can be made in a seed.
	 * 
	 * @param seed A seed or resources
	 * @param boost Whether to calculate with power plant boosts taken in mind or not
	 * @param alt Whether to calculate with alt resources taken in mind or not
	 * 
	 * @template Boost Whether to calculate with power plant boosts taken in mind or not
	 * @template Alts Whether to calculate with alt resources taken in mind or not
	 * 
	 * @author Human-Crow
	 */
	getMaxInGameItemAmount<Boost extends boolean = false, Alt extends boolean = false>(seed: Seed | ResourcesParams, boost?: Boost, alt?: Alt): Promise<MaxItem<Boost, Alt>>
	/**
	 * **Note: This method only works with the normal in-game items. It does not work with custom items.**
	 * 
	 * Calculate the maximum amount of this item that can be made in a seed.
	 * 
	 * @param resourcesOrSeed A seed or resources
	 * @param boost Whether to calculate with power plant boosts taken in mind or not
	 * @param alt Whether to calculate with alt resources taken in mind or not
	 * 
	 * @template Boost Whether to calculate with power plant boosts taken in mind or not
	 * @template Alts Whether to calculate with alt resources taken in mind or not
	 * 
	 * @author Human-Crow
	 */
	async getMaxInGameItemAmount<Boost extends boolean, Alt extends boolean>(resourcesOrSeed: Seed | ResourcesParams, boost: Boost = false as Boost, alt: Alt = false as Alt): Promise<MaxItem<Boost, Alt>> {
		return Seed.getMaxInGameItem(resourcesOrSeed, this.name as InGameResource, boost, alt)
	}

	/**
	 * These are similarities between the equals and strictlyEquals methods.
	 * @param item The other item.
	 * @returns `true` if both items are the equal in the things that are similar between the equals and strictlyEquals methods, `false` otherwise.
	 */
	protected similarEquals(item: Item): boolean {
		return this.resourcesNeeded.size === item.resourcesNeeded.size
			&& this.outputAmount === item.outputAmount
			&& this.outputPerMin === item.outputPerMin
	}

	/**
	 * Determine if this {@link Item `Item`} object and another {@link Item `Item`} object are equal.
	 * @param item The other {@link Item `Item`} object.
	 * @returns `true` if both items are the equal, `false` otherwise.
	 */
	override equals(item: Item): boolean {
		if (this === item) return true

		// Compare resourcesNeeded
		for (const [thisResourcesNeededItem, inputPerMin] of this.resourcesNeeded) if (
			inputPerMin.amount !== item.resourcesNeeded.get(thisResourcesNeededItem)!.amount ||										// Check amount
			inputPerMin.inputPerMin !== item.resourcesNeeded.get(thisResourcesNeededItem)!.inputPerMin ||							// Check inputPerMin
			!item.resourcesNeeded.keys().some(itemResourceNeededItem => thisResourcesNeededItem.equals(itemResourceNeededItem))		// Check item
		) return false

		return super.equals(item)
			&& this.similarEquals(item)
			&& this.factory.equals(item.factory)
	}

	/**
	 * Determine if this {@link Item `Item`} object and another {@link Item `Item`} object are strictly equal.
	 * @param item The other {@link Item `Item`} object.
	 * @returns `true` if both items are the strictly equal, `false` otherwise.
	 */
	override strictlyEquals(item: Item): boolean {
		if (this === item) return true

		// Compare resourcesNeeded
		for (const [thisResourcesNeededItem, inputPerMin] of this.resourcesNeeded) if (
			inputPerMin.amount !== item.resourcesNeeded.get(thisResourcesNeededItem)!.amount ||											// Check amount
			inputPerMin.inputPerMin !== item.resourcesNeeded.get(thisResourcesNeededItem)!.inputPerMin ||								// Check inputPerMin
			!item.resourcesNeeded.keys().some(itemResourceNeededItem => thisResourcesNeededItem.strictlyEquals(itemResourceNeededItem))	// Check item
		) return false

		return super.strictlyEquals(item)
			&& this.similarEquals(item)
			&& this.factory.strictlyEquals(item.factory)
			&& this.recipeImage === item.recipeImage
	}
}