/**
 * @author Space.yg
 */
import { Base } from "../Base.js";
/** Make a new power plant */
class PowerPlant extends Base {
    // Properties
    /** The input needed to activate the power plant */
    input;
    /** The boost speed that the power plant gives */
    speed;
    /** The amount of seconds the power plant is active before needing to recharge */
    duration;
    /** The region of the power plant boost */
    region;
    // Static properties
    /** Total power plants that has been created */
    static #amount = 0;
    /**
     * Total power plants that has been created
     * @readonly
     */
    static get amount() { return this.#amount; }
    /** All the power plants that has been created */
    static #powerPlants = {};
    /**
     * All the power plants that has been created
     * @readonly
     */
    static get powerPlants() { return this.#powerPlants; }
    /**
     * The description of all power plants
     * @readonly
     */
    static get description() { return "Increases the speed of nearby factories while consuming the input items. Effect does not stack with other power plants."; }
    /**
     * Constructs a Power Plant object
     * @param options The Item options
     */
    constructor(options) {
        super(options);
        this.input = options.input;
        this.speed = options.speed;
        this.duration = options.duration;
        this.region = options.region;
        PowerPlant.#amount++;
        PowerPlant.#powerPlants[options.name] = this;
    }
}
export { PowerPlant };
