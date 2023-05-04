/**
 * @author Space.yg
 */
import { Base } from "../Base.js";
/** Make new a Decoration */
class Decoration extends Base {
    // Static properties
    /** Total decorations that has been created */
    static #amount = 0;
    /**
     * Total decorations that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }
    /** All the decorations that has been created */
    static #decorations = {};
    /**
     * All the decorations that has been created
     * @readonly
     */
    static get decorations() { return this.#decorations; }
    /**
     * The description of all decoration builds
     * @readonly
     */
    static get description() { return "Purely decorative, make your factory one of a kind."; }
    /**
     * Constructs a Decoration object
     * @param options The Base options
     */
    constructor(options) {
        super(options);
        Decoration.#amount++;
        if (!Decoration.#decorations[options.name])
            Decoration.#decorations[options.name] = [this];
        else
            Decoration.#decorations[options.name].push(this);
    }
}
export { Decoration };
