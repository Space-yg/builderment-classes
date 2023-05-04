/**
 * @author Space.yg
 */

import { PriceOptions } from "../Base.js"
import { Tier, OptionalTiersOptions } from "./Tier.js"

/** The options of the transportation type */
interface TransportationOptions {
    /** The name of the transportation */
    name: string
    /** The description of the transportation */
    description: string
    /** The tiers of the transportation */
    tiers: OptionalTiersOptions
}

export { TransportationOptions }

/** Make a new transportation */
export class Transportation extends Tier {

    // Properties
    /** The name of the transportation */
    name: string
    /** The price of the first tier of the transportation */
    price: PriceOptions = {
        gold: 0,
        gems: 0,
    }
    /** The description of the transportation */
    description: string

    // Static properties
    /** Total transportations that has been created*/
    static #amount = 0
    /**
     * Total transportations that has been created
     * @readonly
     */
    static get amount() { return this.#amount }
    /** All the transportations that has been created */
    static #transportations: {[/** The name of the transportation */ name: string]: Transportation} = {}
    /**
     * All the transportations that has been created
     * @readonly
     */
    static get transportations() { return this.#transportations }

    /**
     * Constructs a Transportation object
     * @param options The transportation options
     */
    constructor(options: TransportationOptions) {
        super(options)
        this.name = options.name
        for (const currency in options.tiers[this.minTier].price) this.price[currency as keyof PriceOptions] = (options.tiers[this.minTier].price![currency as keyof PriceOptions] === undefined) ? 0 : options.tiers[this.minTier].price![currency as keyof PriceOptions]!
        this.description = options.description
        
        Transportation.#amount++
        Transportation.#transportations[options.name] = this
    }
}