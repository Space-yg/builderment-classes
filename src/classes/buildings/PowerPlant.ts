/**
 * @author Space.yg
 */

import { Base, BaseOptions } from "../Base.js"
import { InputPerMinOptions } from "../Input.js"

/** The new options of the power plant type */
interface PowerPlantOptions extends BaseOptions {
    /** The input needed to activate the power plant */
    input: InputPerMinOptions
    /** The boost speed that the power plant gives */
    speed: number
    /** The amount of seconds the power plant is active before needing to recharge */
    duration: number
    /** The region of the power plant boost */
    region: {
        /** The width of the region of the power plant boost */
        width: number
        /** The height of the region of the power plant boost */
        height: number
    }
}

export { PowerPlantOptions }

/** Make a new power plant */
export class PowerPlant extends Base {

    // Properties
    /** The input needed to activate the power plant */
    input: InputPerMinOptions
    /** The boost speed that the power plant gives */
    speed: number
    /** The amount of seconds the power plant is active before needing to recharge */
    duration: number
    /** The region of the power plant boost */
    region: {
        /** The width of the region of the power plant boost */
        width: number
        /** The height of the region of the power plant boost */
        height: number
    }

    // Static properties
    /** Total power plants that has been created */
    static #amount = 0
    /**
     * Total power plants that has been created
     * @readonly
     */
    static get amount() { return this.#amount }
    /** All the power plants that has been created */
    static #powerPlants: {[/** The name of the power plant */name: string]: PowerPlant} = {}
    /** 
     * All the power plants that has been created
     * @readonly
     */
    static get powerPlants() { return this.#powerPlants }
    /**
     * The description of all power plants
     * @readonly
     */
    static get description() { return "Increases the speed of nearby factories while consuming the input items. Effect does not stack with other power plants." }

    /**
     * Constructs a Power Plant object
     * @param options The Item options
     */
    constructor(options: PowerPlantOptions) {
        super(options)
        this.input = options.input
        this.speed = options.speed
        this.duration = options.duration
        this.region = options.region

        PowerPlant.#amount++
        PowerPlant.#powerPlants[options.name] = this
    }
}