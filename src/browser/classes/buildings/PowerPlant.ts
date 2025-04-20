/**
 * @author Space.yg
 */

// Classes
import { Area } from "@/classes/Area.js"
import { Base } from "@/classes/Base.js"

// Types
import type { AreaParams } from "@/classes/Area.js"
import type { BaseParams } from "@/classes/Base.js"
import type { InputItemPerMin } from "@/classes/Input.js"

/**
 * Parameters for {@link PowerPlant `PowerPlant`}.
 * @extends {{@link BaseParams `BaseParams`}
 */
export type PowerPlantParams = BaseParams & {
	/** The input needed to activate the power plant. */
	input?: InputItemPerMin
	/** The boost speed that the power plant gives. */
	speed: number
	/** The amount of seconds the power plant is active before needing to recharge. */
	duration: number
	/** The region of the power plant boost. */
	region: AreaParams | Area
}

// TODO: Try to resolve the input in power plant
/**
 * Create a power plant.
 * @extends {{@link Base `Base`}
 */
export class PowerPlant extends Base {

	//// Static Properties

	/** 
	 * All the power plants that has been created.
	 * @readonly
	 */
	static readonly powerPlants: PowerPlant[] = []

	/**
	 * The description of all power plants.
	 * @readonly
	 */
	static get description(): string { return "Increases the speed of nearby factories while consuming the input items. Effect does not stack with other power plants." }

	//// Object Properties
	/** The input needed to activate the power plant. */
	input: PowerPlantParams["input"]
	/** The boost speed that the power plant gives. */
	speed: PowerPlantParams["speed"]
	/** The amount of seconds the power plant is active before needing to recharge. */
	duration: PowerPlantParams["duration"]
	/** The region of the power plant boost. */
	region: Area

	//// Constructors
	/**
	 * Constructs a new {@link PowerPlant `PowerPlant`} object.
	 * @param params The power plant parameters.
	 * @param passByReference Whether to pass the objects in {@link params `params`} by reference or not. Default is `true`.
	 */
	constructor(params: PowerPlantParams, passByReference?: boolean)
	/**s
	 * Constructs a new {@link PowerPlant `PowerPlant`} object.
	 * @param powerPlant A {@link PowerPlant `PowerPlant`} object.
	 * @param passByReference Whether to pass the objects in {@link powerPlant `powerPlant`} by reference or not. Default is `true`.
	 */
	constructor(powerPlant: PowerPlant, passByReference?: boolean)
	/**
	 * Constructs a new {@link PowerPlant `PowerPlant`} object.
	 * @param powerPlant A {@link PowerPlant `PowerPlant`} object or power plant parameters.
	 * @param passByReference Whether to pass the objects in {@link powerPlant `powerPlant`} by reference or not. Default is `true`.
	 */
	constructor(powerPlant: PowerPlant | PowerPlantParams, passByReference?: boolean)
	constructor(paramsOrPowerPlant: PowerPlant | PowerPlantParams, passByReference: boolean = true) {
		super(paramsOrPowerPlant, passByReference)

		this.image = paramsOrPowerPlant.image ?? this.image + `power-plants/${this.name}.png`
		this.input = paramsOrPowerPlant.input
		this.speed = paramsOrPowerPlant.speed
		this.duration = paramsOrPowerPlant.duration
		this.region = passByReference && paramsOrPowerPlant.region instanceof Area ? paramsOrPowerPlant.region : new Area(paramsOrPowerPlant.region)

		// Static
		PowerPlant.powerPlants.push(this)
	}

	//// Object Methods
	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param powerPlant The other {@link PowerPlant `PowerPlant`} object.
	 * @returns `true` if both {@link PowerPlant `PowerPlant`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected similarEquals(powerPlant: PowerPlant): boolean {
		if (typeof this.input === "undefined") { if (typeof powerPlant.input !== "undefined") return false }
		else if (typeof powerPlant.input === "undefined") return false
		return this.input!.amount === powerPlant.input!.amount
			&& this.input!.inputPerMin === powerPlant.input!.inputPerMin
			&& this.speed === powerPlant.speed
			&& this.duration === powerPlant.duration
			&& this.region.width === powerPlant.region.width
			&& this.region.height === powerPlant.region.height
	}

	/**
	 * Determine if this {@link PowerPlant `PowerPlant`} object is equal to another {@link PowerPlant `PowerPlant`} object.
	 * @param powerPlant The other {@link PowerPlant `PowerPlant`} object.
	 * @returns `true` if both {@link PowerPlant `PowerPlant`} objects are equal, `false` otherwise.
	 */
	override equals(powerPlant: PowerPlant): boolean {
		return super.equals(powerPlant)
			&& this.similarEquals(powerPlant)
			&& this.input!.item.equals(powerPlant.input!.item)
	}

	/**
	 * Determine if this {@link PowerPlant `PowerPlant`} object is strictly equal to another {@link PowerPlant `PowerPlant`} object.
	 * @param powerPlant The other {@link PowerPlant `PowerPlant`} object.
	 * @returns `true` if both {@link PowerPlant `PowerPlant`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(powerPlant: PowerPlant): boolean {
		return super.strictlyEquals(powerPlant)
			&& this.similarEquals(powerPlant)
			&& this.input!.item.strictlyEquals(powerPlant.input!.item)
	}
}