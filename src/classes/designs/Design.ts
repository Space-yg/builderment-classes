/**
 * @author Space.yg
 */

import { Base, BaseOptions } from '../Base.js'
import { Requirements } from './Requirements.js'

/** The options for the {@link Design} class */
export interface DesignOptions extends BaseOptions {
    /** The category of the design */
    category: string
    /** The width of the design */
    width: number
    /** The height of the design */
    height: number
    /** Is the design symmetrical? */
    symmetrical: boolean
    /** The requirements of the design */
    requirements: Requirements
    /** The blueprint code of the design */
    blueprint: string
    /** A note about the design */
    note?: string
}

/** A Design is a set of buildings */
export class Design extends Base {
    
    // Properties
    /** The category of the design */
    category: DesignOptions["category"]
    /** The width of the design */
    width: DesignOptions["width"]
    /** The height of the design */
    height: DesignOptions["height"]
    /** Is the design symmetrical? */
    symmetrical: DesignOptions["symmetrical"]
    /** The requirements of the design */
    requirements: DesignOptions["requirements"]
    /** The blueprint code of the design */
    blueprint: DesignOptions["blueprint"]
    /** A note about the design */
    note: DesignOptions["note"]

    // Static properties
    /** The amount of design that have been made */
    static #amount: number = 0
    /**
     * The amount of design that have been made
     * @readonly
     */
    static get amount() { return Design.#amount }

    /** All designs that have been made */
    static #designs: {[/** The name of the design */ name: string]: { [/** The category of the design */ category: string]: Design[] }} = {}
    /**
     * The designs that have been made
     * @readonly
     */
    static get designs() { return Design.#designs }

    /**
     * Construct a Design
     * @param options The options
     */
    constructor(options: DesignOptions) {
        super(options)
        this.category = options.category
        this.width = options.width
        this.height = options.height
        this.symmetrical = options.symmetrical
        this.requirements = options.requirements
        this.note = options.note
        if (options.blueprint.length !== 6) throw new Error(`Blueprint of ${this.name} (${options.blueprint}) must be 6 characters long`)
        this.blueprint = options.blueprint

        // Add amount of design
        Design.#amount++

        // Add design
        if (Design.#designs[this.category] === undefined) Design.#designs[this.category] = {}
        if (Design.#designs[this.category][this.name] === undefined) Design.#designs[this.category][this.name] = []
        Design.#designs[this.category][this.name].push(this)
    }

    /**
     * Get the blueprint URL
     * @readonly
     */
    get blueprintURL() { return "https://builderment.com/blueprint/" + this.blueprint }
}