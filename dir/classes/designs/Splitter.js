/**
 * @author Space.yg
 */
import { Design } from "./Design.js";
/** A Splitter is a design that splits items */
class Splitter extends Design {
    // Properties
    /** The amount of inputs of the splitter */
    n;
    /** The amount of outputs of the splitter */
    m;
    // Static properties
    /** The amount of splitters that has been made */
    static #amount = 0;
    /**
     * The amount of splitters that has been made
     * @readonly
     */
    static get amount() { return Splitter.#amount; }
    /** All splitters that has been made */
    static #splitters = {};
    /**
     * The amount of splitters that has been made
     * @readonly
     */
    static get splitters() { return Splitter.#splitters; }
    /**
     * Construct a Splitter
     * @param options
     */
    constructor(options) {
        super({
            ...options,
            category: "Splitter",
            name: `${options.n}:${options.m}`,
        });
        this.n = options.n;
        this.m = options.m;
        // Add amount of splitters
        Splitter.#amount++;
        // Add splitter
        if (Splitter.#splitters[this.n] === undefined)
            Splitter.#splitters[this.n] = {};
        if (Splitter.#splitters[this.n][this.m] === undefined)
            Splitter.#splitters[this.n][this.m] = [];
        Splitter.#splitters[this.n][this.m].push(this);
    }
}
export { Splitter };
