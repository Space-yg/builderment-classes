/**
 * @author Space.yg
 */

// Classes
import { Tiers } from "../Tiers"
import { DistanceTier } from "./DistanceTier"

// Types
import type { TiersParams } from "../Tiers"
import type { DistanceTierParams } from "./DistanceTier"

/**
 * The parameters of the optional distance tiers.
 * @extends {{@link TiersParams `TiersParams`}
 */
export type DistanceTiersParams = TiersParams<DistanceTierParams, DistanceTier>

/**
 * Make a new {@link DistanceTier `StorageTier`}.
 * @extends {{@link Tiers `Tiers`}
 */
export class DistanceTiers extends Tiers {

	//// Object Properties

	declare tiers: { [/** The tiers. They must be consecutive integers */ tier: number]: DistanceTier }

	//// Constructors

	/**
	 * Constructs a new {@link DistanceTiers `DistanceTiers`} object.
	 * @param params The tier parameters.
	 * @param passByReference Whether to pass the objects in the {@link params `params`} by reference or not. Default is `true`.
	 */
	constructor(params: DistanceTiersParams, passByReference?: boolean)
	/**
	 * Constructs a new {@link DistanceTiers `DistanceTiers`} object.
	 * @param distanceTier A {@link DistanceTiers `DistanceTiers`} object.
	 * @param passByReference Whether to pass the objects in the {@link DistanceTiers `DistanceTiers`} by reference or not. Default is `true`.
	 */
	constructor(distanceTier: DistanceTiers, passByReference?: boolean)
	/**
	 * Constructs a new {@link DistanceTiers `DistanceTiers`} object.
	 * @param distanceTier A {@link DistanceTiers `DistanceTiers`} object or tier parameters.
	 * @param passByReference Whether to pass the objects in the {@link DistanceTiers `DistanceTiers`} by reference or not. Default is `true`.
	 */
	constructor(distanceTier: DistanceTiers | DistanceTiersParams, passByReference?: boolean)
	constructor(paramsOrDistanceTiers: DistanceTiers | DistanceTiersParams, passByReference: boolean = true) {
		super(paramsOrDistanceTiers, passByReference)

		// DistanceTiers
		if (paramsOrDistanceTiers instanceof DistanceTiers) {
			// Make all Tier to DistanceTiers
			if (passByReference) this.tiers = paramsOrDistanceTiers.tiers
			else for (const tier in this.tiers) this.tiers[tier] = new DistanceTier(paramsOrDistanceTiers.tiers[tier])
		}
		// DistanceTiersParams
		else {
			// Make all Tier to DistanceTiers
			for (const tier in this.tiers) {
				const t = paramsOrDistanceTiers[tier]
				if (t instanceof DistanceTier) this.tiers[tier] = passByReference ? t : new DistanceTier(t)
				else this.tiers[tier] = new DistanceTier(t)
			}
		}
	}

	//// Object Methods

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param distanceTier The other {@link DistanceTiers `DistanceTiers`} object.
	 * @returns `true` if both {@link DistanceTiers `DistanceTiers`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(distanceTier: DistanceTiers): boolean {
		for (const tier in this.tiers) if (this.tiers[tier].distance !== distanceTier.tiers[tier].distance) return false
		return true
	}

	/**
	 * Determine if this {@link DistanceTiers `DistanceTiers`} object is equal to another {@link DistanceTiers `DistanceTiers`} object.
	 * @param distanceTier The other {@link DistanceTiers `DistanceTiers`} object.
	 * @returns `true` if both {@link DistanceTiers `DistanceTiers`} objects are equal, `false` otherwise.
	 */
	override equals(distanceTier: DistanceTiers): boolean {
		return super.equals(distanceTier)
			&& this.similarEquals(distanceTier)
	}

	/**
	 * Determine if this {@link DistanceTiers `DistanceTiers`} object is strictly equal to another {@link DistanceTiers `DistanceTiers`} object.
	 * @param distanceTier The other {@link DistanceTiers `DistanceTiers`} object.
	 * @returns `true` if both {@link DistanceTiers `DistanceTiers`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(distanceTier: DistanceTiers): boolean {
		return super.strictlyEquals(distanceTier)
			&& this.similarEquals(distanceTier)
	}
}