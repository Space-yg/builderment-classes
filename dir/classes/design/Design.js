/**
 * @author Space.yg
 */
import { Base } from '../Base.js';
/** A Design is a set of buildings */
class Design extends Base {
    // Properties
    /** The category of the design */
    category;
    /** The width of the design */
    width;
    /** The height of the design */
    height;
    /** Is the design symmetrical? */
    symmetrical;
    /** The requirements of the design */
    requirements;
    /** The blueprint code of the design */
    blueprint;
    /** A note about the design */
    note;
    // Static properties
    /** The amount of design that have been made */
    static #amount = 0;
    /**
     * The amount of design that have been made
     * @readonly
     */
    static get amount() { return Design.#amount; }
    /** All designs that have been made */
    static #designs = {};
    /**
     * The designs that have been made
     * @readonly
     */
    static get designs() { return Design.#designs; }
    /**
     * Construct a Design
     * @param options The options
     */
    constructor(options) {
        super(options);
        this.category = options.category;
        this.width = options.width;
        this.height = options.height;
        this.symmetrical = options.symmetrical;
        this.requirements = options.requirements;
        this.note = options.note;
        this.blueprint = options.blueprint;
        // Add amount of design
        Design.#amount++;
        // Add design
        if (Design.#designs[this.category] === undefined)
            Design.#designs[this.category] = {};
        if (Design.#designs[this.category][this.name] === undefined)
            Design.#designs[this.category][this.name] = [];
        Design.#designs[this.category][this.name].push(this);
    }
    /**
     * Get the blueprint URL
     * @readonly
     */
    get blueprintURL() { return "https://builderment.com/blueprint/" + this.blueprint; }
}
export { Design };
