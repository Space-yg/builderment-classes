/**
 * @author Space.yg
 */

// Classes
import { Item } from "./Item.js"
import SelfMap from "selfmap"

// Objects
import { extractor, extractorOutputPerMin, uraniumExtractor, uraniumExtractorOutputPerMin } from "@/objects/buildings/factories.js"

// Other
import { objToString, glpk } from "@/utils/helpers.js"
import {
	Constraints,
	EX_RATE,
	EX_RATE_UR,
	NPP_RATE,
	CPP_RATE,
	NUC_BOOST,
	COAL_BOOST,
	EX_NPP,
	EX_CPP,
	EX_NPP_UR,
	EX_CPP_UR,
	InGameBaseResources,
} from "@/utils/resources.js"

// Types
import type { InputOptions } from "./Input.d.ts"
import type { LP, Options as GLPKOptions } from "glpk.js"
import type {
	InGameBaseResource,
	InGameNonBaseResource,
	InGameAltResource,
	InGameResource,
	MaxItem,
} from "@/utils/resources.js"

/** The resources type for all resources in a seed */
export type ResourcesParams = {
	/** The amount of Wood Log deposits in the seed */
	"Wood Log": number
	/** The amount of Stone deposits in the seed */
	"Stone": number
	/** The amount of Iron Ore deposits in the seed */
	"Iron Ore": number
	/** The amount of Copper Ore deposits in the seed */
	"Copper Ore": number
	/** The amount of Coal deposits in the seed */
	"Coal": number
	/** The amount of Wolframite deposits in the seed */
	"Wolframite": number
	/** The amount of Uranium Ore deposits in the seed */
	"Uranium Ore": number
}

/** The Advanced World number options for World Size and Resource Amount when creating a new seed */
export type AdvancedWorldSetting = 50 | 75 | 100 | 150 | 200

/** The parameters of the item type */
export type SeedParams = {
	/** The resources in a seed */
	resources: ResourcesParams
	/**
	 * The World Size of the seed
	 * @default 100
	 */
	worldSize?: AdvancedWorldSetting
	/**
	 * The Resource Amount of the seed
	 * @default 100
	 */
	resourceAmount?: AdvancedWorldSetting
	/** The seed */
	seed?: string
}

type BitsRange = [from: number, to: number]

/**
 * Converts an array of numbers as a hex value to decimal. Unsigned int
 * @param array The array
 * @returns The result of the array of hex numbers
 */
function hexByteValue(array: number[]): number {
	let hex = ""
	array.forEach(num => {
		let h = num.toString(16)
		hex += (h.length !== 2 ? "0" : "") + h
	})
	return parseInt(hex, 16)
}

// TODO: Add a CustomSeed<BaseResources extends string[]> class and make this Seed class extend it
/** Make a new seed. */
export class Seed {

	//// Static Properties

	/**
	 * Keep track of newly created seeds in the {@link seeds seeds} static variable
	 * @default false
	 */
	static keepTrackOfSeeds: boolean = false

	/**
	 * All the seeds that has been created with a seed.
	 * @readonly
	 */
	static readonly seeds: SelfMap<Seed, "seed"> = new SelfMap<Seed, "seed">([], "seed")

	//// Static Methods

	// TODO: This can be remade to make it more efficient
	/**
	 * Get the amount of each raw resource needed for it to NOT be the limited resource
	 * @param item The {@link Item `Item`} object to calculate the limited resource based on the base resource of that item
	 * @param resources The resources of the seed to calculate the limited resources
	 * @returns The amount of each raw resource needed for it to NOT be the limited resource
	 */
	static getLimitedDeposits(item: Item, resources: ResourcesParams): InputOptions[] {
		// Get the base resources of the item
		let baseResources = item.getAmountOfBaseResources()

		// Calculate the ratios
		const limitedAmounts: { [name: string]: number } = {}
		for (const key in baseResources) {
			const k = key as keyof ResourcesParams
			if (!resources[k]) throw new Error(`Resource (${k}) cannot be 0, null, or undefined`)

			// Calculate the ratios
			limitedAmounts[k] = resources[k] / baseResources[k]!
		}

		// Arrange them
		const amounts: InputOptions[] = []
		for (let i = Object.keys(limitedAmounts).length; i > 0; i--) {
			const min = Math.min(...Object.values(limitedAmounts))
			const name = Object.keys(limitedAmounts).find(key => limitedAmounts[key] === min)!
			delete limitedAmounts[name]
			amounts.push({
				item: Item.getItemsByName(name)[0],
				amount: min,
			})
		}

		// Calculate the amount needed to NOT be the limited resource
		for (let i = 0; i < amounts.length - 1; i++) {
			amounts[i].amount = amounts[i + 1].amount * baseResources[amounts[i].item.name as keyof ResourcesParams]! - resources[amounts[i].item.name as keyof ResourcesParams]
		}
		amounts[amounts.length - 1].amount = 0

		return amounts
	}

	/**
	 * Get the resource that limits making more of the item in the seed
	 * @param item The {@link Item `Item`} object to get the resources that limits making more of this item
	 * @param resources The resources in the seed
	 * @returns The limited resource
	 */
	static getLimitedDeposit(item: Item, resources: ResourcesParams): InputOptions { return Seed.getLimitedDeposits(item, resources)[0] }

	/**
	 * **Note: This method only works with the normal in-game items. It does not work with custom items.**
	 * 
	 * Calculate the maximum amount of an item that can be made in a seed.
	 * 
	 * @param resources The resources of a seed
	 * @param item The item to calculate the maximum for
	 * @param boost Whether to calculate with power plant boosts taken in mind or not
	 * @param alt Whether to calculate with alt resources taken in mind or not
	 * 
	 * @template Boost Whether to calculate with power plant boosts taken in mind or not
	 * @template Alts Whether to calculate with alt resources taken in mind or not
	 * 
	 * @author Human-Crow
	 */
	static getMaxInGameItem<Boost extends boolean = false, Alt extends boolean = false>(resources: ResourcesParams, item: InGameResource, boost?: Boost, alt?: Alt): MaxItem<Boost, Alt>
	/**
	 * **Note: This method only works with the normal in-game items. It does not work with custom items.**
	 * 
	 * Calculate the maximum amount of an item that can be made in a seed.
	 * 
	 * @param seed A seed
	 * @param item The item to calculate the maximum for
	 * @param boost Whether to calculate with power plant boosts taken in mind or not
	 * @param alt Whether to calculate with alt resources taken in mind or not
	 * 
	 * @template Boost Whether to calculate with power plant boosts taken in mind or not
	 * @template Alts Whether to calculate with alt resources taken in mind or not
	 * 
	 * @author Human-Crow
	 */
	static getMaxInGameItem<Boost extends boolean = false, Alt extends boolean = false>(seed: Seed, item: InGameResource, boost?: Boost, alt?: Alt): MaxItem<Boost, Alt>
	/**
	 * **Note: This method only works with the normal in-game items. It does not work with custom items.**
	 * 
	 * Calculate the maximum amount of an item that can be made in a seed.
	 * 
	 * @param seed A seed or resources
	 * @param item The item to calculate the maximum for
	 * @param boost Whether to calculate with power plant boosts taken in mind or not
	 * @param alt Whether to calculate with alt resources taken in mind or not
	 * 
	 * @template Boost Whether to calculate with power plant boosts taken in mind or not
	 * @template Alts Whether to calculate with alt resources taken in mind or not
	 * 
	 * @author Human-Crow
	 */
	static getMaxInGameItem<Boost extends boolean = false, Alt extends boolean = false>(seed: Seed | ResourcesParams, item: InGameResource, boost?: Boost, alt?: Alt): MaxItem<Boost, Alt>
	/**
	 * **Note: This method only works with the normal in-game items. It does not work with custom items.**
	 * 
	 * Calculate the maximum amount of an item that can be made in a seed.
	 * 
	 * @param resourcesOrSeed A seed or resources
	 * @param item The item to calculate the maximum for
	 * @param boost Whether to calculate with power plant boosts taken in mind or not
	 * @param alt Whether to calculate with alt resources taken in mind or not
	 * 
	 * @template Boost Whether to calculate with power plant boosts taken in mind or not
	 * @template Alts Whether to calculate with alt resources taken in mind or not
	 * 
	 * @author Human-Crow
	 */
	static getMaxInGameItem<Boost extends boolean, Alt extends boolean>(resourcesOrSeed: Seed | ResourcesParams, item: InGameResource, boost: Boost = false as Boost, alt: Alt = false as Alt): MaxItem<Boost, Alt> {
		const resources: ResourcesParams = resourcesOrSeed instanceof Seed ? resourcesOrSeed.resources : resourcesOrSeed

		const boostCons = [
			{
				vars: [
					{ name: "Wood Log Coal Ex", coef: 1.0 },
					{ name: "Wood Log Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Wood Log"] * 0.95, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Stone Coal Ex", coef: 1.0 },
					{ name: "Stone Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Stone * 0.95, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Iron Ore Coal Ex", coef: 1.0 },
					{ name: "Iron Ore Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Iron Ore"] * 0.95, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Copper Ore Coal Ex", coef: 1.0 },
					{ name: "Copper Ore Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Copper Ore"] * 0.95, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Coal Coal Ex", coef: 1.0 },
					{ name: "Coal Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Coal * 0.95, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Wolframite Coal Ex", coef: 1.0 },
					{ name: "Wolframite Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Wolframite * 0.95, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Uranium Ore Coal Ex", coef: 1.0 },
					{ name: "Uranium Ore Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Uranium Ore"] * 0.95, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Wood Log Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Wood Log"] * 0.9, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Stone Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Stone * 0.9, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Iron Ore Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Iron Ore"] * 0.9, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Copper Ore Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Copper Ore"] * 0.9, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Coal Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Coal * 0.9, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Wolframite Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Wolframite * 0.9, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Uranium Ore Nuc Ex", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Uranium Ore"] * 0.2, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Coal Power Plant", coef: 1.0 },
					{ name: "Wood Log Coal Ex", coef: -1.0 / EX_CPP },
					{ name: "Stone Coal Ex", coef: -1.0 / EX_CPP },
					{ name: "Iron Ore Coal Ex", coef: -1.0 / EX_CPP },
					{ name: "Copper Ore Coal Ex", coef: -1.0 / EX_CPP },
					{ name: "Coal Coal Ex", coef: -1.0 / EX_CPP },
					{ name: "Wolframite Coal Ex", coef: -1.0 / EX_CPP },
					{ name: "Uranium Ore Coal Ex", coef: -1.0 / EX_CPP_UR },
				],
				bnds: { type: glpk.GLP_FX, ub: 0.0, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Nuclear Fuel Cell", coef: 1.0 },
					{ name: "Wood Log Nuc Ex", coef: -NPP_RATE / EX_NPP },
					{ name: "Stone Nuc Ex", coef: -NPP_RATE / EX_NPP },
					{ name: "Iron Ore Nuc Ex", coef: -NPP_RATE / EX_NPP },
					{ name: "Copper Ore Nuc Ex", coef: -NPP_RATE / EX_NPP },
					{ name: "Coal Nuc Ex", coef: -NPP_RATE / EX_NPP },
					{ name: "Wolframite Nuc Ex", coef: -NPP_RATE / EX_NPP },
					{ name: "Uranium Ore Nuc Ex", coef: -NPP_RATE / EX_NPP_UR },
				],
				bnds: { type: glpk.GLP_FX, ub: 0.0, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Wood Log", coef: 1.0 },
					{ name: "Wood Log Coal Ex", coef: (1 - COAL_BOOST) * EX_RATE },
					{ name: "Wood Log Nuc Ex", coef: (1 - NUC_BOOST) * EX_RATE },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Wood Log"] * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Stone", coef: 1.0 },
					{ name: "Stone Coal Ex", coef: (1 - COAL_BOOST) * EX_RATE },
					{ name: "Stone Nuc Ex", coef: (1 - NUC_BOOST) * EX_RATE },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Stone * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Iron Ore", coef: 1.0 },
					{ name: "Iron Ore Coal Ex", coef: (1 - COAL_BOOST) * EX_RATE },
					{ name: "Iron Ore Nuc Ex", coef: (1 - NUC_BOOST) * EX_RATE },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Iron Ore"] * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Copper Ore", coef: 1.0 },
					{ name: "Copper Ore Coal Ex", coef: (1 - COAL_BOOST) * EX_RATE },
					{ name: "Copper Ore Nuc Ex", coef: (1 - NUC_BOOST) * EX_RATE },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Copper Ore"] * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Coal", coef: 1.0 },
					{ name: "Coal Power Plant", coef: CPP_RATE },
					{ name: "Coal Coal Ex", coef: (1 - COAL_BOOST) * EX_RATE },
					{ name: "Coal Nuc Ex", coef: (1 - NUC_BOOST) * EX_RATE },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Coal * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Wolframite", coef: 1.0 },
					{ name: "Wolframite Coal Ex", coef: (1 - COAL_BOOST) * EX_RATE },
					{ name: "Wolframite Nuc Ex", coef: (1 - NUC_BOOST) * EX_RATE },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Wolframite * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Uranium Ore", coef: 1.0 },
					{ name: "Uranium Ore Coal Ex", coef: (1 - COAL_BOOST) * EX_RATE_UR },
					{ name: "Uranium Ore Nuc Ex", coef: (1 - NUC_BOOST) * EX_RATE_UR },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Uranium Ore"] * EX_RATE_UR, lb: 0.0 },
			}
		]
		const nonBoostCons = [
			{
				vars: [
					{ name: "Wood Log", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Wood Log"] * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Stone", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Stone * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Iron Ore", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Iron Ore"] * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Copper Ore", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Copper Ore"] * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Coal", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Coal * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Wolframite", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources.Wolframite * EX_RATE, lb: 0.0 },
			},
			{
				vars: [
					{ name: "Uranium Ore", coef: 1.0 },
				],
				bnds: { type: glpk.GLP_UP, ub: resources["Uranium Ore"] * EX_RATE_UR, lb: 0.0 },
			}
		]

		let allConstraints = boost ? boostCons : nonBoostCons
		const constraints = Constraints.get(item, alt, boost)
		for (const constraint of constraints) {
			allConstraints.push(
				{
					vars: constraint,
					bnds: { type: glpk.GLP_FX, ub: 0.0, lb: 0.0 }
				}
			)
		}

		const lp: LP = {
			name: "LP",
			// @ts-ignore
			objective: {
				direction: glpk.GLP_MAX,
				vars: [
					{ name: item, coef: 1.0 },
				],
			},
			// @ts-ignore
			subjectTo: allConstraints,
		}
		const opt: GLPKOptions = {
			msglev: glpk.GLP_MSG_OFF,
		}

		const lpRes = glpk.solve(lp, opt)

		const results: MaxItem<Boost, Alt> = {
			maxAmount: lpRes.result.z,
			resources: {},
			baseResources: {
				"Copper Ore": 0,
				"Iron Ore": 0,
				"Uranium Ore": 0,
				"Wood Log": 0,
				Coal: 0,
				Stone: 0,
				Wolframite: 0,
			},
			alts: {},
			boosts: {
				"Copper Ore": 0,
				"Iron Ore": 0,
				"Uranium Ore": 0,
				"Wood Log": 0,
				Coal: 0,
				Stone: 0,
				Wolframite: 0,
			},
		}

		// @ts-ignore
		if (!alt) delete results.alts
		// @ts-ignore
		if (!boost) delete results.boosts

		for (const resource in lpRes.result.vars) {
			// Round resource
			lpRes.result.vars[resource] = Math.round(lpRes.result.vars[resource] * 1_000_000) / 1_000_000

			// Boosts
			if (boost && resource.endsWith(" Coal Ex") || resource.endsWith(" Nuc Ex")) {
				const r = (resource.endsWith(" Coal Ex") ? resource.slice(0, resource.indexOf(" Coal Ex")) : resource.slice(0, resource.indexOf(" Nuc Ex"))) as InGameBaseResource
				results.boosts![r] = lpRes.result.vars[resource]
			}

			// Base resources
			else if (InGameBaseResources.includes(resource as InGameBaseResource)) results.baseResources[resource as InGameBaseResource] = lpRes.result.vars[resource]

			// Remove any resources equal to 0
			// This will remove it from alts and resources, so don't move this condition
			else if (lpRes.result.vars[resource] === 0) continue

			// Alts
			else if (alt && resource.endsWith(" ALT")) {
				const r = resource.slice(0, resource.indexOf(" ALT")) as InGameAltResource
				results.alts![r] = lpRes.result.vars[resource]
			}

			// Standard resources
			else if (resource.endsWith(" STD")) {
				const r = resource.slice(0, resource.indexOf(" STD")) as InGameNonBaseResource
				results.resources[r] = lpRes.result.vars[resource]
			}

			// Other resources
			else results.resources[resource as InGameNonBaseResource] = lpRes.result.vars[resource]
		}

		return results
	}

	// TODO: Add support for constructing Seed object from .sav file
	/**
	 * **This function is incomplete. Do not use.**
	 * 
	 * Construct a {@link Seed} object from a world save file
	 * @param path The path to the world save file
	 * @returns A {@link Seed} object
	 */
	static async constructFromFile(path: string): Promise<Seed> {
		//// Get data from file
		const data: Uint8Array = new Uint8Array(await (await fetch(path)).arrayBuffer())
		console.log(data)

		//// Get resource data part
		/**
		 * The location of the number of the start of the deposits information
		 * @readonly
		 */
		const depositsInfoLocationByte: BitsRange = [22, 26]
		/** The location of the deposits information */
		const depositsInfoLocation: BitsRange = [0, 0]
		const seedParams: SeedParams = {
			resources: {
				"Copper Ore": 0,
				"Iron Ore": 0,
				"Uranium Ore": 0,
				"Wood Log": 0,
				Coal: 0,
				Stone: 0,
				Wolframite: 0,
			},
		}

		console.log(data.slice(...depositsInfoLocationByte))
		depositsInfoLocation[0] = hexByteValue([...data.slice(...depositsInfoLocationByte)]) + 1
		depositsInfoLocation[1] = depositsInfoLocation[0] + 71
		console.log(depositsInfoLocation)

		return new Seed(seedParams)
	}

	//// Object Properties

	/** The resources in a seed. */
	resources: SeedParams["resources"]
	/**
	 * The world size of the seed.
	 * @default 100
	 */
	worldSize: NonNullable<SeedParams["worldSize"]>
	/**
	 * The resource amount of the seed.
	 * @default 100
	 */
	resourceAmount: NonNullable<SeedParams["resourceAmount"]>
	/** The seed. */
	seed?: SeedParams["seed"]

	//// Constructors

	/**
	 * Construct a {@link Seed} object.
	 * @param params The seed parameters.
	 */
	constructor(params: SeedParams)
	/**
	 * Construct a {@link Seed} object.
	 * @param seed A {@link Seed} object.
	 * @param passByReference Whether to pass the objects in {@link seed `seed`} by reference or not. Default is `true.`
	 */
	constructor(seed: Seed, passByReference?: boolean)
	/**
	 * Construct a {@link Seed} object.
	 * @param seed A {@link Seed} object or seed parameters.
	 * @param passByReference Whether to pass the objects in {@link seed `seed`} by reference or not. Default is `true.`
	 */
	constructor(seed: Seed | SeedParams, passByReference?: boolean)
	constructor(seedOrParams: Seed | SeedParams, passByReference: boolean = true) {
		if (passByReference) this.resources = seedOrParams.resources
		else this.resources = { ...seedOrParams.resources }
		this.worldSize = seedOrParams.worldSize ?? 100
		this.resourceAmount = seedOrParams.resourceAmount ?? 100
		this.seed = seedOrParams.seed

		if (Seed.keepTrackOfSeeds && typeof seedOrParams.seed !== "undefined") Seed.seeds.add(this)
	}

	//// Object Methods

	/**
	 * Converts the seed into string
	 * @param limit The limit of how many tabs can be used. `limit` must be greater than 0. Default is 2
	 * @returns The string
	 */
	toString(limit: number = 2): string {
		if (limit <= 0) throw new Error("limit must be greater than 0")
		return objToString(this, limit)
	}

	/**
	 * Get the amount of each raw resource needed for it to NOT be the limited resource
	 * @param item The {@link Item `Item`} object to calculate the limited resource based on the base resource of that item
	 * @returns The amount of each raw resource needed for it to NOT be the limited resource
	 */
	getLimitedDeposits(item: Item): InputOptions[] { return Seed.getLimitedDeposits(item, this.resources) }

	/**
	 * Get the resource that limits making more of the item in the seed
	 * @param item The {@link Item `Item`} object to get the resources that limits making more of this item
	 * @returns The limited resource
	 */
	getLimitedDeposit(item: Item): InputOptions { return Seed.getLimitedDeposit(item, this.resources) }

	/**
	 * Get the maximum amount to make an item in the seed
	 * @param item The {@link Item `Item`} object to get the max of
	 * @returns The maximum amount to make the item in the seed
	 */
	getMax(item: Item): number {
		const extractorMaxOutput = extractor.maxTier.output * extractorOutputPerMin
		const uraniumExtractorMaxOutput = uraniumExtractor.maxTier.output * uraniumExtractorOutputPerMin
		let maximum = Number.MAX_SAFE_INTEGER
		for (const key in item.baseResources) maximum = Math.min(maximum, this.resources[key as keyof ResourcesParams] * (key === "Uranium Ore" ? uraniumExtractorMaxOutput : extractorMaxOutput) / item.baseResources[key as keyof ResourcesParams]!)
		return maximum
	}

	/**
	 * **Note: This method only works with the normal in-game items. It does not work with custom items.**
	 * 
	 * Calculate the maximum amount of an item that can be made in a seed.
	 * 
	 * @param item The item to calculate the maximum for
	 * @param boost Whether to calculate with power plant boosts taken in mind or not
	 * @param alt Whether to calculate with alt resources taken in mind or not
	 * 
	 * @author Human-Crow
	 */
	getMaxInGameItem<Boost extends boolean = false, Alt extends boolean = false>(item: InGameResource, boost: Boost = false as Boost, alt: Alt = false as Alt): MaxItem<Boost, Alt> {
		return Seed.getMaxInGameItem(this, item, boost, alt)
	}

	/**
	 * Determine if this seed and another seed are the equal
	 * @param seed The other seed
	 * @returns true if both seeds are the equal, false otherwise
	 */
	equals(seed: Seed): boolean {
		if (this === seed) return true
		for (const resource in this.resources) if (this.resources[resource as keyof ResourcesParams] !== seed.resources[resource as keyof ResourcesParams]) return false
		return this.resourceAmount === seed.resourceAmount
			&& this.worldSize === seed.worldSize
	}

	/**
	 * Determine if this seed and another seed are the strictly equal
	 * @param seed The other seed
	 * @returns true if both seeds are the strictly equal, false otherwise
	 */
	strictlyEquals(seed: Seed): boolean {
		return this.equals(seed)
			&& this.seed === seed.seed
	}
}