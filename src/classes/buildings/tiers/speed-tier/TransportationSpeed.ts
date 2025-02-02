/**
 * @author Space.yg
 */

// Classes
import { SpeedTiers } from "./SpeedTiers"

// Types
import type { Price } from "@/classes/Price"
import type { SpeedTiersParams } from "./SpeedTiers"

/** Parameters for {@link TransportationSpeed `TransportationSpeed`}. */
export type TransportationSpeedParams = {
	/** The name of the transportation speed. */
	name: string
	/** The description of the transportation speed. */
	description: string
	/** The tiers of the transportation speed. */
	tiers: SpeedTiersParams | SpeedTiers
}

/**
 * Create a new transportation speed.
 * @extends {{@link SpeedTiers `SpeedTiers`}
 */
export class TransportationSpeed extends SpeedTiers {

	//// Static properties

	/**
	 * All the transportations that has been created.
	 * @readonly
	 */
	static readonly transportationSpeeds: TransportationSpeed[] = []

	//// Object Properties

	/** The name of the transportation. */
	name: TransportationSpeedParams["name"]
	/** The price of the first tier of the transportation. */
	price: Price
	/** The description of the transportation. */
	description: TransportationSpeedParams["description"]

	//// Constructors

	/**
	 * Constructs a new {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param params The transportation parameters
	 * @param passByReference Whether to pass the objects in the {@link TransportationSpeed `TransportationSpeed`} by reference or not. Default is `true`.
	 */
	constructor(params: TransportationSpeedParams, passByReference?: boolean)
	/**
	 * Constructs a new {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param transportation A {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param passByReference Whether to pass the objects in the {@link TransportationSpeed `TransportationSpeed`} by reference or not. Default is `true`.
	 */
	constructor(transportation: TransportationSpeed, passByReference?: boolean)
	/**
	 * Constructs a new {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param transportation A {@link TransportationSpeed `TransportationSpeed`} object or transportation parameters.
	 * @param passByReference Whether to pass the objects in the {@link TransportationSpeed `TransportationSpeed`} by reference or not. Default is `true`.
	 */
	constructor(transportation: TransportationSpeed | TransportationSpeedParams, passByReference?: boolean)
	constructor(paramsOrTransportation: TransportationSpeed | TransportationSpeedParams, passByReference: boolean = true) {
		super(paramsOrTransportation.tiers, passByReference)

		this.name = paramsOrTransportation.name
		this.price = this.tiers[this.minTierNum].price
		this.description = paramsOrTransportation.description

		// Image
		if (paramsOrTransportation instanceof TransportationSpeed) for (const tier in this.tiers) this.tiers[tier].image = paramsOrTransportation.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name === "Robotic Arm" ? `${this.name} Tier ${tier}` : this.name}.png`
		else {
			if (paramsOrTransportation.tiers instanceof SpeedTiers) for (const tier in this.tiers) this.tiers[tier].image = paramsOrTransportation.tiers.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name === "Robotic Arm" ? `${this.name} Tier ${tier}` : this.name}.png`
			else for (const tier in this.tiers) this.tiers[tier].image = paramsOrTransportation.tiers[tier].image ?? this.tiers[tier].image + `transportations/${this.name === "Robotic Arm" ? `${this.name} Tier ${tier}` : this.name}.png`
		}

		// Statics
		TransportationSpeed.transportationSpeeds.push(this)
	}

	//// Object Methods

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param transportationSpeed The other {@link TransportationSpeed `TransportationSpeed`} object.
	 * @returns `true` if both {@link TransportationSpeed `TransportationSpeed`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(transportationSpeed: TransportationSpeed): boolean {
		return this.name === transportationSpeed.name
			&& this.price.equals(transportationSpeed.price)
			&& this.description === transportationSpeed.description
	}

	/**
	 * Determine if this {@link TransportationSpeed `TransportationSpeed`} object is equal to another {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param transportationSpeed The other {@link TransportationSpeed `TransportationSpeed`} object.
	 * @returns `true` if both storages are the equal, `false` otherwise.
	 */
	override equals(transportationSpeed: TransportationSpeed): boolean {
		return super.equals(transportationSpeed)
			&& this.similarEquals(transportationSpeed)
	}

	/**
	 * Determine if this {@link TransportationSpeed `TransportationSpeed`} object is strictly equal to another {@link TransportationSpeed `TransportationSpeed`} object.
	 * @param transportationSpeed speed The other {@link TransportationSpeed `TransportationSpeed`} object.
	 * @returns `true` if both storages are the strictly equal, `false` otherwise.
	 */
	override strictlyEquals(transportationSpeed: TransportationSpeed): boolean {
		return super.strictlyEquals(transportationSpeed)
			&& this.similarEquals(transportationSpeed)
	}
}