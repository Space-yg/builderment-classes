/**
 * @author Space.yg
 */
import { Tier } from "./Tier.js";
/** Make a new factory */
class Factory extends Tier {
    // Properties
    /** The name of the factory */
    name;
    /** The price of the first tier of the factory */
    price = {
        gold: 0,
        gems: 0
    };
    /** The amount of inputs of the factory */
    inputs;
    /** The description of the factory */
    description;
    // Static properties
    /** Total factories that has been created */
    static #amount = 0;
    /**
     * Total factories that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }
    /** All the factories that has been created */
    static #factories = {};
    /**
     * All the factories that has been created
     * @readonly
     */
    static get factories() { return this.#factories; }
    /**
     * Constructs a Factory object
     * @param options The factory options
     */
    constructor(options) {
        super(options);
        this.name = options.name;
        for (const currency in options.tiers[this.minTier].price)
            this.price[currency] = (options.tiers[this.minTier].price[currency] === undefined) ? 0 : options.tiers[this.minTier].price[currency];
        this.inputs = options.inputs;
        this.description = options.description;
        Factory.#amount++;
        Factory.#factories[options.name] = this;
    }
}
export { Factory };
