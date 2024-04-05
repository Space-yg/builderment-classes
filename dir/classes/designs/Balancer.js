/**
 * @author Space.yg
 */
import { Design } from "./Design.js";
/** A Balancer is a design that balances items */
class Balancer extends Design {
    // Properties
    /** The amount of inputs of the balancer */
    n;
    /** The amount of outputs of the balancer */
    m;
    // Static properties
    /** The amount of balancers that has been made */
    static #amount = 0;
    /**
     * The amount of balancers that has been made
     * @readonly
     */
    static get amount() { return Balancer.#amount; }
    /** All balancers that has been made */
    static #balancers = {};
    /**
     * The amount of balancers that has been made
     * @readonly
     */
    static get balancers() { return Balancer.#balancers; }
    /**
     * Construct a Balancer
     * @param options
     */
    constructor(options) {
        super({
            ...options,
            category: "Balancer",
            name: `${options.n}:${options.m}`,
        });
        this.n = options.n;
        this.m = options.m;
        // Add amount of balancers
        Balancer.#amount++;
        // Add balancer
        if (Balancer.#balancers[this.n] === undefined)
            Balancer.#balancers[this.n] = {};
        if (Balancer.#balancers[this.n][this.m] === undefined)
            Balancer.#balancers[this.n][this.m] = [];
        Balancer.#balancers[this.n][this.m].push(this);
    }
}
export { Balancer };
