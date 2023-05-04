/**
 * @author Space.yg
 */
import { Base } from "./Base.js";
import { extractor, uraniumExtractor } from "../objects/buildings/factories.js";
/** Make a new item */
class Item extends Base {
    // Properties
    /** The factory that makes the item */
    factory;
    /** The image URL of the recipe of the item */
    recipeImage;
    /** The output/min of the item in tier 1 of the factory */
    outputPerMin;
    /**
     * The amount of items produces each manufacture.
     * - Default: 1
     * - Example: Copper wire's output amount is 2
     */
    outputAmount;
    /** The resources needed to make the item */
    resourcesNeeded;
    /** The base resources needed of 1 of the item */
    baseResources;
    // Static properties
    /** Total items that has been created */
    static #amount = 0;
    /**
     * Total items that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }
    /** All the items that has been created */
    static #items = {};
    /**
     * All the items that has been created
     * @readonly
     */
    static get items() { return this.#items; }
    /** Convert variable name to item name */
    static get variableNameToItemName() {
        return {
            woodLog: "Wood Log",
            stone: "Stone",
            ironOre: "Iron Ore",
            copperOre: "Copper Ore",
            coal: "Coal",
            wolframite: "Wolframite",
            uraniumOre: "Uranium Ore",
        };
    }
    /** Convert item name to variable name */
    static get itemNameToVariableName() {
        return {
            "Wood Log": "woodLog",
            Stone: "stone",
            "Iron Ore": "ironOre",
            "Copper Ore": "copperOre",
            Coal: "coal",
            Wolframite: "wolframite",
            "Uranium Ore": "uraniumOre",
        };
    }
    /**
     * Construct an Item
     * @param options The Item options
     */
    constructor(options) {
        // Check if total inputs equals
        if (options.factory.inputs !== options.resourcesNeeded.length)
            throw new Error("Total amount of resources needed does not equal to the amount of inputs of the factory.");
        //// Initials
        super(options);
        this.factory = options.factory;
        this.recipeImage = options.recipeImage;
        this.outputPerMin = options.outputPerMin;
        this.outputAmount = options.outputAmount ?? 1;
        this.resourcesNeeded = {};
        for (const input of options.resourcesNeeded)
            this.resourcesNeeded[input.item.name] = { ...input, inputPerMin: input.amount * this.outputPerMin };
        this.baseResources = this.getAmountOfBaseResources();
        Item.#amount++;
        Item.#items[options.name] = this;
    }
    /**
     * Get the amount of base resources used to make the item
     * @param amount The amount to be added to the total of the item
     * @param resources The base resources needed to make the item
     * @returns The amount of base resources needed to make the item
     */
    getAmountOfBaseResourcesFunction(amount, resources = {}) {
        if (Object.keys(this.resourcesNeeded).length) {
            for (const name in this.resourcesNeeded) {
                amount /= this.outputAmount;
                for (let i = 0; i < this.resourcesNeeded[name].amount; i++) {
                    resources = this.resourcesNeeded[name].item.getAmountOfBaseResourcesFunction(amount, resources);
                }
            }
        }
        else {
            if (typeof resources[this.name] === "undefined" || isNaN(resources[this.name]))
                resources[this.name] = amount;
            else
                resources[this.name] += amount;
        }
        return resources;
    }
    /**
     * Get the amount of base resources used to make the item
     * @param amount The amount of that resource. Default is 1
     */
    getAmountOfBaseResources(amount = 1) {
        const resources = this.getAmountOfBaseResourcesFunction(amount);
        for (const resource in resources)
            resources[resource] = Math.round(resources[resource] * 1000) / 1000;
        return resources;
    }
    /**
     * Get the amount of resources needed to make the item
     * @param amount The amount to be added to the total of the item
     * @param resources The amount of resources needed to make the item
     * @returns The amount of resources needed to make the item
     */
    getAmountOfResourcesFunction(amount, resources = {}) {
        if (isNaN(resources[this.name]))
            resources[this.name] = 0;
        resources[this.name] += amount;
        for (const name in this.resourcesNeeded) {
            amount /= this.outputAmount;
            for (let i = 0; i < this.resourcesNeeded[name].amount; i++) {
                resources = this.resourcesNeeded[name].item.getAmountOfResourcesFunction(amount, resources);
            }
        }
        return resources;
    }
    /**
     * Get the amount of resources used to make the item
     * @param amount The amount of that resource. Default is 1
     */
    getAmountOfResources(amount = 1) {
        const resources = this.getAmountOfResourcesFunction(amount);
        for (const resource in resources)
            resources[resource] = Math.round(resources[resource] * 1000) / 1000;
        return resources;
    }
    /**
     * Get the production based on the tier
     * @param tier The tier to get the output of. Default is 1
     */
    getOutputPerMin(tier = 1) { return this.outputPerMin * this.factory.getTotalOutput(tier); }
    /** Get the max production of the item */
    get maxOutputPerMin() { return this.getOutputPerMin(this.factory.maxTier); }
    /**
     * Get the resources needed to make the item at a tier
     * @param tier The tier to get the resources needed. Default is 1
     */
    getResourcesNeeded(tier = 1) {
        const resources = [];
        for (const name in this.resourcesNeeded)
            resources.push({
                item: this.resourcesNeeded[name].item,
                amount: this.resourcesNeeded[name].amount,
                inputPerMin: this.resourcesNeeded[name].inputPerMin * this.factory.getTotalOutput(tier),
            });
        return resources;
    }
    /** Get the resources needed to make the item at the max tier */
    get maxResourcesNeeded() { return this.getResourcesNeeded(this.factory.maxTier); }
    // METHODS THAT ONLY WORK WITH NORMAL GAME ITEMS
    /**
     * Get the maximum amount you can get of this item in a seed. Only works with normal game items
     * @param resources The resources in the world
     * @returns the maximum amount you can get of this item
     */
    getMaxResourceAmountInSeed(resources) {
        const maxOutput = extractor.maxOutput * 7.5;
        const uraniumMaxOutput = uraniumExtractor.maxOutput * 10;
        var lowest = Number.MAX_SAFE_INTEGER;
        // fix this plz. It works, but change syntax
        for (const name in this.baseResources)
            lowest = Math.min(lowest, resources[Item.itemNameToVariableName[name]] * ((name === "Uranium Ore") ? uraniumMaxOutput : maxOutput) / this.baseResources[name]);
        return lowest;
    }
}
export { Item };
