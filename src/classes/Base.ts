/**
 * @author Space.yg
 */

/** The price options */
export interface PriceOptions {
    /** The amount of gold */
    gold: number | null
    /** The amount of gems */
    gems: number | null
}

/** The base options */
export interface BaseOptions {
    /** The name */
    name: string
    /** The price */
    price: Partial<PriceOptions>
    /** The URL to the image */
    image: string
}

/** The base of some classes */
export class Base {

    // Properties
    /** The name */
    name: string
    /** The price */
    price: PriceOptions = {
        gold: 0,
        gems: 0,
    }
    /** The URL to the image */
    image: string
    
    // Static properties
    /** Total bases that has been created */
    static #amount: number = 0
    /**
     * Total bases that has been created
     * @readonly
     */
    static get amount() { return this.#amount }
    
    /** All the bases that has been created */
    static #bases: { [/** The name */ name: string]: Base[] } = {}
    /**
     * All the bases that has been created 
     * @readonly
     */
    static get bases() { return this.#bases }

    /**
     * Constructs a Base
     * @param options The Base options
     */
    constructor(options: BaseOptions) {
        this.name = options.name
        for (const currency in this.price) this.price[currency as keyof PriceOptions] = ((options.price[currency as keyof PriceOptions] === undefined) ? 0 : options.price[currency as keyof PriceOptions]!)
        this.image = options.image
        
        Base.#amount++
        if (!Base.#bases[options.name]) Base.#bases[options.name] = [this]
        else Base.#bases[options.name].push(this)
    }
}