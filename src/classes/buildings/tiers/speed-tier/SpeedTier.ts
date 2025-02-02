/**
 * @author Space.yg
 */

// Classes
import { Tier } from "../Tier"

// Types
import type { TierParams } from "../Tier"

/**
 * Parameters for a speed tier.
 * @extends {{@link TierParams `TierParams`}
 */
export type SpeedTierParams = TierParams & {
	/** The speed at this tier. */
	speed: number
}

/**
 * A speed tier.
 * @extends {{@link Tier `Tier`}
 */
export class SpeedTier extends Tier {

	//// Object Properties

	/** The speed at this tier. */
	speed: SpeedTierParams["speed"]

	//// Constructors

	/**
	 * Constructs a new {@link SpeedTier `SpeedTier`} object.
	 * @param params The speed tier parameters.
	 */
	constructor(params: SpeedTierParams)
	/**
	 * Constructs a new {@link SpeedTier `SpeedTier`} object.
	 * @param speedTier A {@link SpeedTier `SpeedTier`} object.
	 */
	constructor(speedTier: SpeedTier)
	/**
	 * Constructs a new {@link SpeedTier `SpeedTier`} object.
	 * @param paramsOrSpeedTier A {@link SpeedTier `SpeedTier`} object or speed tier parameters.
	 */
	constructor(paramsOrSpeedTier: SpeedTier | SpeedTierParams) {
		super(paramsOrSpeedTier)

		this.speed = paramsOrSpeedTier.speed
	}

	//// Object Methods

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param speedTier The other {@link SpeedTier `SpeedTier`} object.
	 * @returns `true` if both {@link SpeedTier `SpeedTier`} objects are the equal in the properties that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(speedTier: SpeedTier): boolean {
		return this.speed === speedTier.speed
	}

	/**
	 * Determine if this {@link SpeedTier `SpeedTier`} object is equal to another {@link SpeedTier `SpeedTier`} object.
	 * @param speedTier The other {@link SpeedTier `SpeedTier`} object.
	 * @returns `true` if both {@link SpeedTier `SpeedTier`} objects are equal, `false` otherwise.
	 */
	override equals(speedTier: SpeedTier): boolean {
		return super.equals(speedTier)
			&& this.similarEquals(speedTier)
	}

	/**
	 * Determine if this {@link SpeedTier `SpeedTier`} object is strictly equal to another {@link SpeedTier `SpeedTier`} object.
	 * @param speedTier The other {@link SpeedTier `SpeedTier`} object.
	 * @returns `true` if both {@link SpeedTier `SpeedTier`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(speedTier: SpeedTier): boolean {
		return super.strictlyEquals(speedTier)
			&& this.similarEquals(speedTier)
	}
}