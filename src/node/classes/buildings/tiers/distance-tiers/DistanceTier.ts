/**
 * @author Space.yg
 */

// Classes
import { Tier } from "../Tier"

// Types
import type { TierParams } from "../Tier"

/**
 * Parameters for a distance tier.
 * @extends {{@link TierParams `TierParams`}
 */
export type DistanceTierParams = TierParams & {
	/** The distance at this tier. */
	distance: number
}

/**
 * A distance tier.
 * @extends {{@link Tier `Tier`}
 */
export class DistanceTier extends Tier {

	//// Object Properties

	/** The output at this tier. */
	distance: DistanceTierParams["distance"]

	//// Constructors

	/**
	 * Constructs a new {@link DistanceTier `DistanceTier`} object.
	 * @param params The distance tier parameters.
	 */
	constructor(params: DistanceTierParams)
	/**
	 * Constructs a new {@link DistanceTier `DistanceTier`} object.
	 * @param distanceTier A {@link DistanceTier `DistanceTier`} object.
	 */
	constructor(distanceTier: DistanceTier)
	/**
	 * Constructs a new {@link DistanceTier `DistanceTier`} object.
	 * @param paramsOrDistanceTier A {@link DistanceTier `DistanceTier`} object or distance tier parameters.
	 */
	constructor(paramsOrDistanceTier: DistanceTier | DistanceTierParams) {
		super(paramsOrDistanceTier)

		this.distance = paramsOrDistanceTier.distance
	}

	//// Object Methods

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param distanceTier The other {@link DistanceTier `DistanceTier`} object.
	 * @returns `true` if both {@link DistanceTier `DistanceTier`} objects are the equal in the properties that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(distanceTier: DistanceTier): boolean {
		return this.distance === distanceTier.distance
	}

	/**
	 * Determine if this {@link DistanceTier `DistanceTier`} object is equal to another {@link DistanceTier `DistanceTier`} object.
	 * @param distanceTier The other {@link DistanceTier `DistanceTier`} object.
	 * @returns `true` if both {@link DistanceTier `DistanceTier`} objects are equal, `false` otherwise.
	 */
	override equals(distanceTier: DistanceTier): boolean {
		return super.equals(distanceTier)
			&& this.similarEquals(distanceTier)
	}

	/**
	 * Determine if this {@link DistanceTier `DistanceTier`} object is strictly equal to another {@link DistanceTier `DistanceTier`} object.
	 * @param distanceTier The other {@link DistanceTier `DistanceTier`} object.
	 * @returns `true` if both {@link DistanceTier `DistanceTier`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(distanceTier: DistanceTier): boolean {
		return super.strictlyEquals(distanceTier)
			&& this.similarEquals(distanceTier)
	}
}