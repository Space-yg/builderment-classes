/**
 * @author Space.yg
 */

import { Base, BaseOptions, PriceOptions } from "./Base.js"
import { Tier } from "./buildings/Tier.js"
import { InputOptions } from "./Input.js"
import { Factory } from "./buildings/Factory.js"
import { Transportation } from "./buildings/Transportation.js"
import { storage, goldVault, researchLab } from "../objects/buildings/other.js"

interface TechnologyOptions extends BaseOptions {
    /** The items needed to unlock this technology */
    resourcesNeeded: InputOptions[]
    /** The items, factories, or builds that this technology unlocks */
    unlocks: (Base | Tier | typeof storage | typeof goldVault | typeof researchLab | {
        /** The factory that will unlock it's tier */
        build: Factory | Transportation | typeof storage
        /** The tier of the factory it will be unlocked at */
        tier: number
    })[]
    /** The technologies that this technology unlocks */
    unlocksTechnologies: Technology[] | undefined
    /** The technology needed to unlock this technology */
    technologyNeeded?: Technology | null
}

export { TechnologyOptions }

export class Technology extends Base {

    // Properties
    /** The technology needed to unlock this technology */
    technologyNeeded: Technology | null | undefined
    /** The items needed to unlock this technology */
    resourcesNeeded: InputOptions[]
    /** The items, factories, or builds that this technology unlocks */
    unlocks: (Base | Tier | typeof storage | typeof goldVault | typeof researchLab | {
        /** The factory that will unlock it's tier */
        build: Factory | Transportation | typeof storage
        /** The tier of the factory it will be unlocked at */
        tier: number
    })[]
    /** The technologies that this technology unlocks */
    unlocksTechnologies: Technology[] | undefined

    // Static properties
    /** Total technologies that has been created */
    static #amount = 0
    /**
     * Total technologies that has been created
     * @readonly
     */
    static get amount() { return this.#amount }

    /** All the technologies that has been created */
    static #technologies: {[/** The name of the technology */ name: string]: Technology[]} = {}
    /**
     * All the technologies that has been created
     * @readonly
     */
    static get technologies() { return this.#technologies }

    /**
     * The image URl of the Tech-tree
     * @readonly
     */
    static get tree() { return "https://static.wikia.nocookie.net/builderment/images/b/be/Tech_tree2.png" }

    /**
     * Total price of all technologies
     * @readonly
     */
    static get totalPrice(): PriceOptions {
        var total: PriceOptions = { gold: 0, gems: 0 }
        for (const technologies in this.#technologies) for (const technology of this.#technologies[technologies]) for (const currency in total) total[currency as keyof PriceOptions]! += technology.price[currency as keyof PriceOptions] ?? 0
        return total
    }

    /**
     * Constructs a Technology object
     * @param options The Item options
     */
    constructor(options: TechnologyOptions) {
        super(options)
        this.technologyNeeded = options.technologyNeeded
        this.resourcesNeeded = options.resourcesNeeded
        this.unlocks = options.unlocks
        this.unlocksTechnologies = options.unlocksTechnologies
        
        Technology.#amount++
        if (!Technology.#technologies[options.name]) Technology.#technologies[options.name] = [this]
        else Technology.#technologies[options.name].push(this)
    }

    /**
     * Get the total price to get to this technology
     * @readonly
     */
    get totalPrice(): PriceOptions {
        if (this.price === null || this.technologyNeeded === null) return { gold: 0, gems: 0 }
        if (this.technologyNeeded === undefined) throw new Error(`Technology "${this.name}" does not have a technologyNeeded`)
        var total: PriceOptions = {...this.price}
        var previousPrice: PriceOptions = this.technologyNeeded.totalPrice
        for (const currency in total) total[currency as keyof PriceOptions]! += previousPrice[currency as keyof PriceOptions] ?? 0
        return total;
    }
}