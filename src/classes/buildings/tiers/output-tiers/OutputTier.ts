/**
 * @author Space.yg
 */

// Classes
import { Tier } from "../Tier"

// Types
import type { TierParams } from "../Tier"

/**
 * Parameters for a output tier.
 * @extends {{@link TierParams `TierParams`}
 */
export type OutputTierParams = TierParams & {
	/** The output at this tier. */
	output: number
}

/**
 * An output tier.
 * @extends {{@link Tier `Tier`}
 */
export class OutputTier extends Tier {

	//// Object Properties

	/** The output at this tier. */
	output: OutputTierParams["output"]

	//// Constructors

	/**
	 * Constructs a new {@link OutputTier `OutputTier`} object.
	 * @param params The output tier parameters.
	 */
	constructor(params: OutputTierParams)
	/**
	 * Constructs a new {@link OutputTier `OutputTier`} object.
	 * @param outputTier A {@link OutputTier `OutputTier`} object.
	 */
	constructor(outputTier: OutputTier)
	/**
	 * Constructs a new {@link OutputTier `OutputTier`} object.
	 * @param paramsOrOutputTier A {@link OutputTier `OutputTier`} object or output tier parameters.
	 */
	constructor(paramsOrOutputTier: OutputTier | OutputTierParams) {
		super(paramsOrOutputTier)

		this.output = paramsOrOutputTier.output
	}

	//// Object Methods

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param outputTier The other {@link OutputTier `OutputTier`} object.
	 * @returns `true` if both {@link OutputTier `OutputTier`} objects are the equal in the properties that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(outputTier: OutputTier): boolean {
		return this.output === outputTier.output
	}

	/**
	 * Determine if this {@link OutputTier `OutputTier`} object is equal to another {@link OutputTier `OutputTier`} object.
	 * @param outputTier The other {@link OutputTier `OutputTier`} object.
	 * @returns `true` if both {@link OutputTier `OutputTier`} objects are equal, `false` otherwise.
	 */
	override equals(outputTier: OutputTier): boolean {
		return super.equals(outputTier)
			&& this.similarEquals(outputTier)
	}

	/**
	 * Determine if this {@link OutputTier `OutputTier`} object is strictly equal to another {@link OutputTier `OutputTier`} object.
	 * @param outputTier The other {@link OutputTier `OutputTier`} object.
	 * @returns `true` if both {@link OutputTier `OutputTier`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(outputTier: OutputTier): boolean {
		return super.strictlyEquals(outputTier)
			&& this.similarEquals(outputTier)
	}
}