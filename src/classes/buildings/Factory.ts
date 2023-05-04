/**
 * @author Space.yg
 */

import { PriceOptions } from "../Base.js"
import { Tier, OptionalTiersOptions } from "./Tier.js"

/** The options of the input type */
interface FactoryOptions {
    /** The name of the factory */
    name: string
    /** The amount of inputs of the factory */
    inputs: number
    /** The description of the factory */
    description: string
    /** The tiers of the factory */
    tiers: OptionalTiersOptions
}

export { FactoryOptions }

/** Make a new factory */
export class Factory extends Tier {
    
    // Properties
    /** The name of the factory */
    name: string
    /** The price of the first tier of the factory */
    price: PriceOptions = {
        gold: 0,
        gems: 0
    }
    /** The amount of inputs of the factory */
    inputs: number
    /** The description of the factory */
    description: string

    // Static properties
    /** Total factories that has been created */
    static #amount = 0
    /**
     * Total factories that has been created
     * @readonly
     */
    static get amount() { return this.#amount }
    /** All the factories that has been created */
    static #factories: {[/** The name of the factory */ name: string]: Factory} = {}
    /** 
     * All the factories that has been created 
     * @readonly
     */
    static get factories() { return this.#factories }

    /**
     * Constructs a Factory object
     * @param options The factory options
     */
    constructor(options: FactoryOptions) {
        super(options)
        this.name = options.name
        for (const currency in options.tiers[this.minTier].price) this.price[currency as keyof PriceOptions] = (options.tiers[this.minTier].price![currency as keyof PriceOptions] === undefined) ? 0 : options.tiers[this.minTier].price![currency as keyof PriceOptions]!
        this.inputs = options.inputs
        this.description = options.description

        Factory.#amount++
        Factory.#factories[options.name] = this
    }
}