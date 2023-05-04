/**
 * @author Space.yg
 */

import { Item } from "./Item.js"
import { extractor } from "../objects/buildings/factories.js"

/** The resources type for all resources in a seed */
interface ResourcesOptions {
    /** The amount of Wood Log deposits in the seed */
    woodLog: number
    /** The amount of Stone deposits in the seed */
    stone: number
    /** The amount of Iron Ore deposits in the seed */
    ironOre: number
    /** The amount of Copper Ore deposits in the seed */
    copperOre: number
    /** The amount of Coal deposits in the seed */
    coal: number
    /** The amount of Wolframite deposits in the seed */
    wolframite: number
    /** The amount of Uranium Ore deposits in the seed */
    uraniumOre: number
}

/** The options of the item type */
interface SeedOptions {
    /** The resources in a seed */
    resources: ResourcesOptions
    /**
     * The world size of the seed
     * - Default: 100
    */
   worldSize?: 50 | 75 | 100 | 150 | 200
   /**
    * The resource amount of the seed
    * - Default: 100
   */
  resourceAmount?: 50 | 75 | 100 | 150 | 200
  /** The seed */
  seed?: string
}

export { ResourcesOptions, SeedOptions }

/** Make a new seed */
export class Seed {
    
    // Properties
    /** The resources in a seed */
    resources: ResourcesOptions
    /**
     * The world size of the seed
     * - Default: 100
     */
    worldSize: number
    /**
     * The resource amount of the seed
     * - Default: 100
     */
    resourceAmount: number
    /** The seed */
    seed: string | undefined

    // Static properties
    /** Total Items that has been created */
    static #amount = 0
    /**
     * Total Items that has been created
     * @readonly
     */
    static get amount() { return this.#amount }

    /** All the items that has been created */
    static #seeds: {[/** The seed */ seed: string]: Seed} = {}
    /**
     * Total Items that has been created
     * @readonly
     */
    static get seeds() { return this.#seeds }

    /**
     * Construct a Seed object
     * @param options The Item options
     */
    constructor(options: SeedOptions) {
        this.resources = options.resources
        this.worldSize = options.worldSize ?? 100
        this.resourceAmount = options.resourceAmount ?? 100
        this.seed = options.seed

        if (options.seed) {
            Seed.#amount++
            Seed.#seeds[options.seed] = this
        }
    }

    /**
     * Get the maximum amount of an item that can be made in a seed
     * @param item The item of name of the item to get the max of
     */
    getMax(item: Item | string) {
        var i: Partial<ResourcesOptions> | undefined
        if (typeof item === "string") {
            for (const name in Item.items) if (item === name) {
                i = Item.items[item].getAmountOfBaseResources()
                break
            }
            if (!i) throw new Error("Unknown item.")
        } else i = item.getAmountOfBaseResources()
        var maximum = Number.MAX_SAFE_INTEGER
        for (const key in i) maximum = Math.min(maximum, this.resources[key as keyof ResourcesOptions] * extractor.maxOutput / i[Item.variableNameToItemName[key as keyof ResourcesOptions] as keyof ResourcesOptions]!)
        return maximum
    }
}