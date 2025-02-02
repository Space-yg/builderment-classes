/**
 * @author Space.yg
 */

// Classes
import { Base } from "./Base.js"
import { Seed } from "./Seed.js"
import { Factory } from "./buildings/tiers/output-tiers/Factory.js"

// Objects
import { extractor, extractorOutputPerMin, uraniumExtractor, uraniumExtractorOutputPerMin } from "@/objects/buildings/factories.js"
import { coalPowerPlant, nuclearPowerPlant } from "@/objects/buildings/power-plants.js"

// Types
import type { BaseParams } from "./Base.js"
import type { ResourcesParams, AdvancedWorldSetting } from "./Seed.js"
import type { InputOptions, InputMap } from "./Input.d.ts"

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
	/** The base resources needed of 1 of the item. */
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
			if (paramsOrItem instanceof Item) for (const [inputOption, inputPerMin] of paramsOrItem.resourcesNeeded.entries()) this.resourcesNeeded.set(new Item(inputOption, passByReference), { ...inputPerMin })
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
		if (Object.values(this.resourcesNeeded).length === 0) return false

		// Find item recursively
		return !Object.values(this.resourcesNeeded).every(resource => !resource.item.needsFunction(item, scannedItems))
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
	 * @param resources The base resources needed to make the item.
	 * @returns The amount of base resources needed to make the item.
	 */
	#getAmountOfBaseResourcesFunction(amount: number, resources: Partial<ResourcesParams> = {}): Partial<ResourcesParams> {
		if (Object.keys(this.resourcesNeeded).length) {
			for (const [item, inputPerMin] of this.resourcesNeeded.entries()) {
				amount /= this.outputAmount
				for (let i = 0; i < inputPerMin.amount; i++) {
					resources = item.#getAmountOfBaseResourcesFunction(amount, resources)
				}
			}
		} else {
			if (typeof resources[this.name as keyof ResourcesParams] === "undefined" || isNaN(resources[this.name as keyof ResourcesParams]!)) resources[this.name as keyof ResourcesParams] = amount
			else resources[this.name as keyof ResourcesParams]! += amount
		}
		return resources
	}
	/**
	 * Get the amount of base resources used to make the item.
	 * @param amount The amount of that resource. Default is 1.
	 */
	getAmountOfBaseResources(amount: number = 1): Partial<ResourcesParams> {
		const resources = this.#getAmountOfBaseResourcesFunction(amount)
		for (const resource in resources) resources[resource as keyof ResourcesParams] = Math.round(resources[resource as keyof ResourcesParams]! * 1000) / 1000
		return resources
	}

	/**
	 * Get the amount of resources needed to make the item.
	 * @param amount The amount to be added to the total of the item.
	 * @param resources The amount of resources needed to make the item.
	 * @returns The amount of resources needed to make the item.
	 */
	#getAmountOfResourcesFunction(amount: number, resources: any = {}) {
		if (isNaN(resources[this.name]!)) resources[this.name] = 0
		resources[this.name] += amount
		for (const [item, inputPerMin] of this.resourcesNeeded.entries()) {
			amount /= this.outputAmount
			for (let i = 0; i < inputPerMin.amount; i++) {
				resources = item.#getAmountOfResourcesFunction(amount, resources)
			}
		}
		return resources
	}
	/**
	 * Get the amount of resources used to make the item.
	 * @param amount The amount of that resource. Default is 1.
	 */
	getAmountOfResources(amount: number = 1) {
		const resources = this.#getAmountOfResourcesFunction(amount)
		for (const resource in resources) resources[resource] = Math.round(resources[resource] * 1000) / 1000
		return resources
	}

	/**
	 * Get the output/min based on the tier of the factory.
	 * @param tier The tier to get the output of. Default is 1.
	 */
	getOutputPerMin(tier: number = 1): number { return this.outputPerMin * this.factory.tiers[tier].output }

	/**
	 * Get the resources needed to make the item at a tier
	 * @param tier The tier to get the resources needed. Default is 1
	 */
	getResourcesNeeded(tier: number = 1): InputMap {
		const resources: InputMap = new Map()
		for (const [item, inputPerMin] of this.resourcesNeeded.entries()) resources.set(item, {
			amount: inputPerMin.amount,
			inputPerMin: this.resourcesNeeded.get(item)!.inputPerMin * this.factory.tiers[tier].output,
		})
		return resources
	}

	/**
	 * Get the maximum amount you can get of this item in a seed.
	 * 
	 * **Note:** This method only works with the normal in-game items.
	 * @param seed A {@link Seed `Seed`} object.
	 * @returns the maximum amount you can get of this item.
	 */
	getMaxResourceAmountInSeed(seed: Seed): number
	/**
	 * Get the maximum amount you can get of this item in a seed.
	 * 
	 * **Note:** This method only works with the normal in-game items.
	 * @param resources The resources in the world.
	 * @returns the maximum amount you can get of this item.
	 */
	getMaxResourceAmountInSeed(resources: ResourcesParams): number
	/**
	 * Get the maximum amount you can get of this item in a seed.
	 * 
	 * **Note:** This method only works with the normal in-game items.
	 * @param resourcesOrSeed The resources in the world or a {@link Seed `Seed`} object.
	 * @returns the maximum amount you can get of this item.
	 */
	getMaxResourceAmountInSeed(resourcesOrSeed: Seed | ResourcesParams): number {
		const resources: ResourcesParams = resourcesOrSeed instanceof Seed ? resourcesOrSeed.resources : resourcesOrSeed

		// Get Extractor speeds
		const extractorMaxOutput = extractor.maxTier.output * extractorOutputPerMin
		const uraniumExtractorMaxOutput = uraniumExtractor.maxTier.output * uraniumExtractorOutputPerMin

		let lowest = Number.MAX_SAFE_INTEGER
		for (const name in this.baseResources) lowest = Math.min(lowest, resources[name as keyof ResourcesParams] * (name === "Uranium Ore" ? uraniumExtractorMaxOutput : extractorMaxOutput) / this.baseResources[name as keyof ResourcesParams]!)
		return lowest
	}

	/**
	 * Get an approximate of the maximum amount of this item that can be produced using Power Plants.
	 * 
	 * Steps of how the process works:
	 * 1. Coal Power Plants boost Uranium Extractors.
	 * 2. Coal Power Plants boost Coal Extractors.
	 * 3. Nuclear Power Plants power the rest of the deposits' Extractors.
	 * 4. If Coal is not the limited resource, use it to boost the other resources.
	 * 5. Calculate the maximum resource amount.
	 * 
	 * **Note:** This method only works with the normal in-game items.
	 * @param seed A {@link Seed `Seed`} object.
	 * @returns The maximum amount of this item that can be produced using Power Plants.
	 */
	getMaxResourceAmountInSeedWithPowerPlants(seed: Seed): number
	/**
	 * Get an approximate of the maximum amount of this item that can be produced using Power Plants.
	 * 
	 * Steps of how the process works:
	 * 1. Coal Power Plants boost Uranium Extractors.
	 * 2. Coal Power Plants boost Coal Extractors.
	 * 3. Nuclear Power Plants power the rest of the deposits' Extractors.
	 * 4. If Coal is not the limited resource, use it to boost the other resources.
	 * 5. Calculate the maximum resource amount.
	 * 
	 * **Note:** This method only works with the normal in-game items.
	 * @param resources The resources in the world.
	 * @param resourceAmount The resource amount of the world.
	 * @returns The maximum amount of this item that can be produced using Power Plants.
	 */
	getMaxResourceAmountInSeedWithPowerPlants(resources: ResourcesParams, resourceAmount?: AdvancedWorldSetting): number
	/**
	 * Get an approximate of the maximum amount of this item that can be produced using Power Plants.
	 * 
	 * Steps of how the process works:
	 * 1. Coal Power Plants boost Uranium Extractors.
	 * 2. Coal Power Plants boost Coal Extractors.
	 * 3. Nuclear Power Plants power the rest of the deposits' Extractors.
	 * 4. If Coal is not the limited resource, use it to boost the other resources.
	 * 5. Calculate the maximum resource amount.
	 * 
	 * **Note:** This method only works with the normal in-game items.
	 * @param resourcesOrSeed A {@link Seed `Seed`} object or resources in the world.
	 * @param resourceAmount The resource amount of the world. If a {@link Seed `Seed`} object is supplied to {@link resourcesOrSeed `resourcesOrSeed`}, then this parameter is ignored.
	 * @returns The maximum amount of this item that can be produced using Power Plants.
	 */
	getMaxResourceAmountInSeedWithPowerPlants(resourcesOrSeed: ResourcesParams | Seed, resourceAmount?: AdvancedWorldSetting): number
	getMaxResourceAmountInSeedWithPowerPlants(resourcesOrSeed: Seed | ResourcesParams, resourceAmount: AdvancedWorldSetting = 100): number {

		// Steps of how the process works
		// 1. Coal Power Plants boost Uranium Extractors
		// 2. Coal Power Plants boost Coal Extractors
		// 3. Nuclear Power Plants power the rest of the deposits' Extractors
		// 4. If Coal is not the limited resource, use it to boost the other resources
		// 5. Calculate the maximum resource amount

		/** The amount of Extractors a Coal Power Plant can reach */
		let coalPowerPlantExtractorReach: number
		/** The amount of Extractors a Nuclear Power Plant can reach */
		let nuclearPowerPlantExtractorReach: number
		/** The average amount of deposits of Uranium Ore in a patch */
		let uraniumOreDepositsInPatch: number

		// Change the above variables based on Resource Amount
		// TODO: Change these values
		switch (resourcesOrSeed instanceof Seed ? resourcesOrSeed.resourceAmount : resourceAmount) {
			case 50:
				coalPowerPlantExtractorReach = NaN // TODO: Change this
				nuclearPowerPlantExtractorReach = NaN // TODO: Change this
				uraniumOreDepositsInPatch = NaN // TODO: Change this
				break
			case 75:
				coalPowerPlantExtractorReach = NaN // TODO: Change this
				nuclearPowerPlantExtractorReach = NaN // TODO: Change this
				uraniumOreDepositsInPatch = NaN // TODO: Change this
				break
			case 100:
				coalPowerPlantExtractorReach = 22
				nuclearPowerPlantExtractorReach = 36
				uraniumOreDepositsInPatch = 6.9
				break
			case 150:
				coalPowerPlantExtractorReach = NaN // TODO: Change this
				nuclearPowerPlantExtractorReach = NaN // TODO: Change this
				uraniumOreDepositsInPatch = 6.9
				break
			case 200:
				coalPowerPlantExtractorReach = 22
				nuclearPowerPlantExtractorReach = 55
				uraniumOreDepositsInPatch = 6.9
				break
		}

		/** The resources of the world before the calculation */
		const resources: ResourcesParams = resourcesOrSeed instanceof Seed ? resourcesOrSeed.resources : resourcesOrSeed
		/** The resources of the world after the calculation */
		const r: ResourcesParams = { ...resources }

		// Get Extractor speeds
		const extractorMaxOutput = extractor.maxTier.output * extractorOutputPerMin
		const uraniumExtractorMaxOutput = uraniumExtractor.maxTier.output * uraniumExtractorOutputPerMin

		/** The base resources to make a Nuclear Fuel Cell */
		const nuclearFuelCellBaseResources: Partial<ResourcesParams> = nuclearPowerPlant.input!.item.baseResources

		//// 1. Coal Power Plants boost Uranium Extractors
		r.Coal -= r["Uranium Ore"] / uraniumOreDepositsInPatch
		r["Uranium Ore"] *= coalPowerPlant.speed

		//// 2. Coal Power Plants boost Coal Extractors
		r.Coal = (r.Coal * coalPowerPlant.speed) - (r.Coal / coalPowerPlantExtractorReach * (coalPowerPlant.input!.inputPerMin / extractorMaxOutput))

		//// 3. Nuclear Power Plants power the limited the deposits' Extractors
		// While Uranium Ore has enough to make a Nuclear Fuel Cell...
		while (r["Uranium Ore"] - nuclearFuelCellBaseResources["Uranium Ore"]! / uraniumExtractorMaxOutput > 0) {
			// Minus the amount needed to make a Nuclear Fuel Cell
			for (const resource in nuclearFuelCellBaseResources) r[resource as keyof ResourcesParams] -= nuclearFuelCellBaseResources[resource as keyof ResourcesParams]! / (resource === "Uranium Ore" ? uraniumExtractorMaxOutput : extractorMaxOutput)

			// Get limited resource
			const limited = Seed.getLimitedDeposit(this, r)
			if (limited.item.name === "Coal" || limited.item.name === "Uranium Ore") break

			// Add boost to limited resource
			r[limited.item.name as keyof ResourcesParams] += nuclearPowerPlantExtractorReach * nuclearPowerPlant.speed - nuclearPowerPlantExtractorReach
		}

		//// 4. If Coal is not the limited resource, use it to boost the other resources
		// While Coal is not the limited...
		while (true) {
			// Get limited resource
			const limited = Seed.getLimitedDeposit(this, { ...r, Coal: r.Coal - coalPowerPlant.input!.inputPerMin / extractorMaxOutput })
			if (limited.item.name === "Coal" || limited.item.name === "Uranium Ore") break

			// Minus the amount needed to make a Nuclear Fuel Cell
			r.Coal -= coalPowerPlant.input!.inputPerMin / extractorMaxOutput

			// Add boost to limited resource
			r[limited.item.name as keyof ResourcesParams] += coalPowerPlantExtractorReach * coalPowerPlant.speed - coalPowerPlantExtractorReach
		}

		//// 5. Calculate the maximum resource amount
		return this.getMaxResourceAmountInSeed(r)
	}

	/**
	 * These are similarities between the equals and strictlyEquals methods.
	 * @param item The other item.
	 * @returns `true` if both items are the equal in the things that are similar between the equals and strictlyEquals methods, `false` otherwise.
	 */
	protected similarEquals(item: Item): boolean {
		return Object.keys(this.resourcesNeeded).length === Object.keys(item.resourcesNeeded).length
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
		for (const [thisResourcesNeededItem, inputPerMin] of this.resourcesNeeded.entries()) if (
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
		for (const [thisResourcesNeededItem, inputPerMin] of this.resourcesNeeded.entries()) if (
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