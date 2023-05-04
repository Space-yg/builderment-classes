/**
 * @author Space.yg
 */
import { Design } from "./Design.js";
/** A Valve is a design that manages overflow of items on a belt */
class Valve extends Design {
    // Static properties
    /** The amount of valves that has been made */
    static #amount = 0;
    /**
     * The amount of valves that has been made
     * @readonly
     */
    static get amount() { return Valve.#amount; }
    /** All valves that has been made */
    static #valves = {};
    /**
     * The amount of valves that has been made
     * @readonly
     */
    static get valves() { return Valve.#valves; }
    /**
     * Construct a Valve
     * @param options
     */
    constructor(options) {
        super({
            ...options,
            category: "Valve",
        });
        // Add amount of valves
        Valve.#amount++;
        // Add valve
        if (Valve.#valves[this.requirements.roboticArmTier] === undefined)
            Valve.#valves[this.requirements.roboticArmTier] = [];
        Valve.#valves[this.requirements.roboticArmTier].push(this);
    }
}
export { Valve };
