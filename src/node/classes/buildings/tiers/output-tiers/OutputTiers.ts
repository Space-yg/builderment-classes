/**
 * @author Space.yg
 */

// Classes
import { Tiers } from "../Tiers"
import { OutputTier } from "./OutputTier"

// Types
import type { TiersParams } from "../Tiers"
import type { OutputTierParams } from "./OutputTier"

/**
 * The parameters of the optional output tiers.
 * @extends {{@link TiersParams `TiersParams`}
 */
export type OutputTiersParams = TiersParams<OutputTierParams, OutputTier>

/**
 * Make a new output tier.
 * @extends {{@link Tiers `Tiers`}
 */
export class OutputTiers extends Tiers {

	//// Object Properties

	declare tiers: { [/** The tiers. They must be consecutive integers. */ tier: number]: OutputTier }
	override get maxTier(): OutputTier { return this.tiers[this.maxTierNum] }
	override get minTier(): OutputTier { return this.tiers[this.minTierNum] }

	//// Constructors

	/**
	 * Constructs a new {@link OutputTiers `OutputTiers`} object.
	 * @param params The output tier parameters.
	 * @param passByReference Whether to pass the objects in the {@link params `params`} by reference or not. Default is `true`.
	 */
	constructor(params: OutputTiersParams, passByReference?: boolean)
	/**
	 * Constructs a new {@link OutputTiers `OutputTiers`} object.
	 * @param outputTiers An {@link OutputTiers `OutputTiers`} object.
	 * @param passByReference Whether to pass the objects in the {@link outputTiers `outputTiers`} by reference or not. Default is `true`.
	 */
	constructor(outputTiers: OutputTiers, passByReference?: boolean)
	/**
	 * Constructs a new {@link OutputTiers `OutputTiers`} object.
	 * @param outputTiers An {@link OutputTiers `OutputTiers`} object or output tier parameters.
	 * @param passByReference Whether to pass the objects in the {@link outputTiers `outputTiers`} by reference or not. Default is `true`.
	 */
	constructor(outputTiers: OutputTiers | OutputTiersParams, passByReference?: boolean)
	constructor(paramsOrOutputTiers: OutputTiers | OutputTiersParams, passByReference: boolean = true) {
		super(paramsOrOutputTiers, passByReference)

		// Make all Tier to OutputTier
		// OutputTiers
		if (paramsOrOutputTiers instanceof OutputTiers) {
			if (passByReference) this.tiers = paramsOrOutputTiers.tiers
			else for (const tier in this.tiers) this.tiers[tier] = new OutputTier(paramsOrOutputTiers.tiers[tier])
		}
		// OutputTiersParams
		else {
			for (const tier in this.tiers) {
				const t = paramsOrOutputTiers[tier]
				if (t instanceof OutputTier) this.tiers[tier] = passByReference ? t : new OutputTier(t)
				else this.tiers[tier] = new OutputTier(t)
			}
		}
	}

	//// Object Methods

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param outputTiers The other {@link OutputTiers `OutputTiers`} object.
	 * @returns `true` if both {@link OutputTiers `OutputTiers`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(outputTiers: OutputTiers): boolean {
		for (const tier in this.tiers) if (this.tiers[tier].output !== outputTiers.tiers[tier].output) return false
		return true
	}

	/**
	 * Determine if this {@link OutputTiers `OutputTiers`} object is equal to another {@link OutputTiers `OutputTiers`} object.
	 * @param outputTiers The other {@link OutputTiers `OutputTiers`} object.
	 * @returns `true` if both {@link OutputTiers `OutputTiers`} objects are equal, `false` otherwise.
	 */
	override equals(outputTiers: OutputTiers): boolean {
		return super.equals(outputTiers)
			&& this.similarEquals(outputTiers)
	}

	/**
	 * Determine if this {@link OutputTiers `OutputTiers`} object is strictly equal to another {@link OutputTiers `OutputTiers`} object.
	 * @param outputTiers The other {@link OutputTiers `OutputTiers`} object.
	 * @returns `true` if both {@link OutputTiers `OutputTiers`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(outputTiers: OutputTiers): boolean {
		return super.strictlyEquals(outputTiers)
			&& this.similarEquals(outputTiers)
	}
}