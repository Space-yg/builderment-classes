/**
 * @author Space.yg
 */
import { Base } from "./Base.js";
class Technology extends Base {
    // Properties
    /** The technology needed to unlock this technology */
    technologyNeeded;
    /** The items needed to unlock this technology */
    resourcesNeeded;
    /** The items, factories, or builds that this technology unlocks */
    unlocks;
    /** The technologies that this technology unlocks */
    unlocksTechnologies;
    // Static properties
    /** Total technologies that has been created */
    static #amount = 0;
    /**
     * Total technologies that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }
    /** All the technologies that has been created */
    static #technologies = {};
    /**
     * All the technologies that has been created
     * @readonly
     */
    static get technologies() { return this.#technologies; }
    /**
     * The image URl of the Tech-tree
     * @readonly
     */
    static get tree() { return "https://static.wikia.nocookie.net/builderment/images/b/be/Tech_tree2.png"; }
    /**
     * Total price of all technologies
     * @readonly
     */
    static get totalPrice() {
        var total = { gold: 0, gems: 0 };
        for (const technologies in this.#technologies)
            for (const technology of this.#technologies[technologies])
                for (const currency in total)
                    total[currency] += technology.price[currency] ?? 0;
        return total;
    }
    /**
     * Constructs a Technology object
     * @param options The Item options
     */
    constructor(options) {
        super(options);
        this.technologyNeeded = options.technologyNeeded;
        this.resourcesNeeded = options.resourcesNeeded;
        this.unlocks = options.unlocks;
        this.unlocksTechnologies = options.unlocksTechnologies;
        Technology.#amount++;
        if (!Technology.#technologies[options.name])
            Technology.#technologies[options.name] = [this];
        else
            Technology.#technologies[options.name].push(this);
    }
    /**
     * Get the total price to get to this technology
     * @readonly
     */
    get totalPrice() {
        if (this.price === null || this.technologyNeeded === null)
            return { gold: 0, gems: 0 };
        if (this.technologyNeeded === undefined)
            throw new Error(`Technology "${this.name}" does not have a technologyNeeded`);
        var total = { ...this.price };
        var previousPrice = this.technologyNeeded.totalPrice;
        for (const currency in total)
            total[currency] += previousPrice[currency] ?? 0;
        return total;
    }
}
export { Technology };
