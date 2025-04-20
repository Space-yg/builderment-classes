/**
 * @author Space.yg
 */

// Classes
import { Tiers } from "../Tiers"
import { SpeedTier } from "./SpeedTier"

// Types
import type { TiersParams } from "../Tiers"
import type { SpeedTierParams } from "./SpeedTier"

/**
 * The parameters of the optional speed tiers.
 * @extends {{@link TiersParams `TiersParams`}
 */
export type SpeedTiersParams = TiersParams<SpeedTierParams, SpeedTier>

/**
 * Make a new speed tiers.
 * @extends {{@link Tiers `Tiers`}
 */
export class SpeedTiers extends Tiers {

	//// Object Properties

	declare tiers: { [/** The tiers. They must be consecutive integers. */ tier: number]: SpeedTier }
	override get maxTier(): SpeedTier { return this.tiers[this.maxTierNum] }
	override get minTier(): SpeedTier { return this.tiers[this.minTierNum] }

	//// Constructors

	/**
	 * Constructs a new {@link SpeedTiers `StorageTiers`} object.
	 * @param params The tier parameters.
	 * @param passByReference Whether to pass the objects in the {@link params `params`} by reference or not. Default is `true`.
	 */
	constructor(params: SpeedTiersParams, passByReference?: boolean)
	/**
	 * Constructs a new {@link SpeedTiers `StorageTiers`} object.
	 * @param speedTiers A {@link SpeedTiers `StorageTiers`} object.
	 * @param passByReference Whether to pass the objects in the {@link SpeedTiers `StorageTiers`} by reference or not. Default is `true`.
	 */
	constructor(speedTiers: SpeedTiers, passByReference?: boolean)
	/**
	 * Constructs a new {@link SpeedTiers `StorageTiers`} object.
	 * @param speedTiers A {@link SpeedTiers `StorageTiers`} object or tier parameters.
	 * @param passByReference Whether to pass the objects in the {@link SpeedTiers `StorageTiers`} by reference or not. Default is `true`.
	 */
	constructor(speedTiers: SpeedTiers | SpeedTiersParams, passByReference?: boolean)
	constructor(paramsOrStorageTiers: SpeedTiers | SpeedTiersParams, passByReference: boolean = true) {
		super(paramsOrStorageTiers, passByReference)

		// StorageTiers
		if (paramsOrStorageTiers instanceof SpeedTiers) {
			// Make all Tier to StorageTiers
			if (passByReference) this.tiers = paramsOrStorageTiers.tiers
			else for (const tier in this.tiers) this.tiers[tier] = new SpeedTier(paramsOrStorageTiers.tiers[tier])
		}
		// SpeedTiersParams
		else {
			// Make all Tier to StorageTiers
			for (const tier in this.tiers) {
				const t = paramsOrStorageTiers[tier]
				if (t instanceof SpeedTier) this.tiers[tier] = passByReference ? t : new SpeedTier(t)
				else this.tiers[tier] = new SpeedTier(t)
			}
		}
	}

	//// Object Methods

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param speedTiers The other {@link SpeedTiers `StorageTiers`} object.
	 * @returns `true` if both {@link SpeedTiers `StorageTiers`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(speedTiers: SpeedTiers): boolean {
		for (const tier in this.tiers) if (this.tiers[tier].speed !== speedTiers.tiers[tier].speed) return false
		return true
	}

	/**
	 * Determine if this {@link SpeedTiers `StorageTiers`} object is equal to another {@link SpeedTiers `StorageTiers`} object.
	 * @param speedTiers The other {@link SpeedTiers `StorageTiers`} object.
	 * @returns `true` if both {@link SpeedTiers `StorageTiers`} objects are equal, `false` otherwise.
	 */
	override equals(speedTiers: SpeedTiers): boolean {
		return super.equals(speedTiers)
			&& this.similarEquals(speedTiers)
	}

	/**
	 * Determine if this {@link SpeedTiers `StorageTiers`} object is strictly equal to another {@link SpeedTiers `StorageTiers`} object.
	 * @param speedTiers The other {@link SpeedTiers `StorageTiers`} object.
	 * @returns `true` if both {@link SpeedTiers `StorageTiers`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(speedTiers: SpeedTiers): boolean {
		return super.strictlyEquals(speedTiers)
			&& this.similarEquals(speedTiers)
	}
}