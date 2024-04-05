/**
 * @author Space.yg
 */
import { Design } from "./Design.js";
/** A Factory Splitter is a design that splits items to multiple factories */
class FactorySplitter extends Design {
    // Properties
    /** The amount of inputs of the factory splitter */
    n;
    /** The amount of outputs of the factory splitter */
    m;
    // Static properties
    /** The amount of factory splitters that has been made */
    static #amount = 0;
    /**
     * The amount of factory splitters that has been made
     * @readonly
     */
    static get amount() { return FactorySplitter.#amount; }
    /** All factory splitters that has been made */
    static #factorySplitters = {};
    /**
     * The amount of factory splitters that has been made
     * @readonly
     */
    static get factorySplitters() { return FactorySplitter.#factorySplitters; }
    /**
     * Construct a Factory Splitter
     * @param options
     */
    constructor(options) {
        super(options);
        this.n = options.n;
        this.m = options.m;
        // Add amount of factory splitters
        FactorySplitter.#amount++;
        // Add factory splitter
        if (FactorySplitter.#factorySplitters[this.category] === undefined)
            FactorySplitter.#factorySplitters[this.category] = {};
        if (FactorySplitter.#factorySplitters[this.category][this.n] === undefined)
            FactorySplitter.#factorySplitters[this.category][this.n] = {};
        if (FactorySplitter.#factorySplitters[this.category][this.n][this.m] === undefined)
            FactorySplitter.#factorySplitters[this.category][this.n][this.m] = [];
        FactorySplitter.#factorySplitters[this.category][this.n][this.m].push(this);
    }
}
export { FactorySplitter };
