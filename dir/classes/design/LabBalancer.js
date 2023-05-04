/**
 * @author Space.yg
 */
import { Design } from "./Design.js";
/** A Lab Balancer is a design that balances items to a Research Lab or Gold Vault */
class LabBalancer extends Design {
    // Static properties
    /** The amount of lab balancers that has been made */
    static #amount = 0;
    /**
     * The amount of lab balancers that has been made
     * @readonly
     */
    static get amount() { return LabBalancer.#amount; }
    /** All lab balancers that has been made */
    static #labBalancers = {};
    /**
     * The amount of lab balancers that has been made
     * @readonly
     */
    static get labBalancers() { return LabBalancer.#labBalancers; }
    /**
     * Construct a Lab Balancer
     * @param options
     */
    constructor(options) {
        super({
            ...options,
            category: "Lab Balancer",
        });
        // Add amount of lab balancers
        LabBalancer.#amount++;
        // Add lab balancer
        if (LabBalancer.#labBalancers[this.requirements.roboticArmTier] === undefined)
            LabBalancer.#labBalancers[this.requirements.roboticArmTier] = [];
        LabBalancer.#labBalancers[this.requirements.roboticArmTier].push(this);
    }
}
export { LabBalancer };
