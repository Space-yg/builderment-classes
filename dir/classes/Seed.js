/**
 * @author Space.yg
 */
import { Item } from "./Item.js";
import { extractor } from "../objects/buildings/factories.js";
/** Make a new seed */
class Seed {
    // Properties
    /** The resources in a seed */
    resources;
    /**
     * The world size of the seed
     * - Default: 100
     */
    worldSize;
    /**
     * The resource amount of the seed
     * - Default: 100
     */
    resourceAmount;
    /** The seed */
    seed;
    // Static properties
    /** Total Items that has been created */
    static #amount = 0;
    /**
     * Total Items that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }
    /** All the items that has been created */
    static #seeds = {};
    /**
     * Total Items that has been created
     * @readonly
     */
    static get seeds() { return this.#seeds; }
    /**
     * Construct a Seed object
     * @param options The Item options
     */
    constructor(options) {
        this.resources = options.resources;
        this.worldSize = options.worldSize ?? 100;
        this.resourceAmount = options.resourceAmount ?? 100;
        this.seed = options.seed;
        if (options.seed) {
            Seed.#amount++;
            Seed.#seeds[options.seed] = this;
        }
    }
    /**
     * Get the maximum amount of an item that can be made in a seed
     * @param item The item of name of the item to get the max of
     */
    getMax(item) {
        var i;
        if (typeof item === "string") {
            for (const name in Item.items)
                if (item === name) {
                    i = Item.items[item].getAmountOfBaseResources();
                    break;
                }
            if (!i)
                throw new Error("Unknown item.");
        }
        else
            i = item.getAmountOfBaseResources();
        var maximum = Number.MAX_SAFE_INTEGER;
        for (const key in i)
            maximum = Math.min(maximum, this.resources[key] * extractor.maxOutput / i[Item.variableNameToItemName[key]]);
        return maximum;
    }
}
export { Seed };
