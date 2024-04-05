/**
 * @author Space.yg
 */
import { Tier } from "./Tier.js";
/** Make a new transportation */
class Transportation extends Tier {
    // Properties
    /** The name of the transportation */
    name;
    /** The price of the first tier of the transportation */
    price = {
        gold: 0,
        gems: 0,
    };
    /** The description of the transportation */
    description;
    // Static properties
    /** Total transportations that has been created*/
    static #amount = 0;
    /**
     * Total transportations that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }
    /** All the transportations that has been created */
    static #transportations = {};
    /**
     * All the transportations that has been created
     * @readonly
     */
    static get transportations() { return this.#transportations; }
    /**
     * Constructs a Transportation object
     * @param options The transportation options
     */
    constructor(options) {
        super(options);
        this.name = options.name;
        for (const currency in options.tiers[this.minTier].price)
            this.price[currency] = (options.tiers[this.minTier].price[currency] === undefined) ? 0 : options.tiers[this.minTier].price[currency];
        this.description = options.description;
        Transportation.#amount++;
        Transportation.#transportations[options.name] = this;
    }
}
export { Transportation };
