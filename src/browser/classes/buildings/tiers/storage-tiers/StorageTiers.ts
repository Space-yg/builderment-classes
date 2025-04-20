/**
 * @author Space.yg
 */

// Classes
import { Tiers } from "../Tiers"
import { StorageTier } from "./StorageTier"

// Types
import type { TiersParams } from "../Tiers"
import type { StorageTierParams } from "./StorageTier"

/**
 * The parameters of the optional storage tiers.
 * @extends {{@link TiersParams `TiersParams`}
 */
export type StorageTiersParams = TiersParams<StorageTierParams, StorageTier>

/**
 * Make a new {@link StorageTier `StorageTier`}.
 * @extends {{@link Tiers `Tiers`}
 */
export class StorageTiers extends Tiers {

	//// Object Properties

	declare tiers: { [/** The tiers. They must be consecutive integers. */ tier: number]: StorageTier }
	override get maxTier(): StorageTier { return this.tiers[this.maxTierNum] }
	override get minTier(): StorageTier { return this.tiers[this.minTierNum] }

	//// Constructors

	/**
	 * Constructs a new {@link StorageTiers `StorageTiers`} object.
	 * @param params The tier parameters.
	 * @param passByReference Whether to pass the objects in the {@link params `params`} by reference or not. Default is `true`.
	 */
	constructor(params: StorageTiersParams, passByReference?: boolean)
	/**
	 * Constructs a new {@link StorageTiers `StorageTiers`} object.
	 * @param storageTiers A {@link StorageTiers `StorageTiers`} object.
	 * @param passByReference Whether to pass the objects in the {@link StorageTiers `StorageTiers`} by reference or not. Default is `true`.
	 */
	constructor(storageTiers: StorageTiers, passByReference?: boolean)
	/**
	 * Constructs a new {@link StorageTiers `StorageTiers`} object.
	 * @param storageTiers A {@link StorageTiers `StorageTiers`} object or tier parameters.
	 * @param passByReference Whether to pass the objects in the {@link StorageTiers `StorageTiers`} by reference or not. Default is `true`.
	 */
	constructor(storageTiers: StorageTiers | StorageTiersParams, passByReference?: boolean)
	constructor(paramsOrStorageTiers: StorageTiers | StorageTiersParams, passByReference: boolean = true) {
		super(paramsOrStorageTiers, passByReference)

		// StorageTiers
		if (paramsOrStorageTiers instanceof StorageTiers) {
			// Make all Tier to StorageTiers
			if (passByReference) this.tiers = paramsOrStorageTiers.tiers
			else for (const tier in this.tiers) this.tiers[tier] = new StorageTier(paramsOrStorageTiers.tiers[tier])
		}
		// StorageTiersParams
		else {
			// Make all Tier to StorageTiers
			for (const tier in this.tiers) {
				const t = paramsOrStorageTiers[tier]
				if (t instanceof StorageTier) this.tiers[tier] = passByReference ? t : new StorageTier(t)
				else this.tiers[tier] = new StorageTier(t)
			}
		}
	}

	//// Object Methods

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param storageTiers The other {@link StorageTiers `StorageTiers`} object.
	 * @returns `true` if both {@link StorageTiers `StorageTiers`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(storageTiers: StorageTiers): boolean {
		for (const tier in this.tiers) if (this.tiers[tier].storage !== storageTiers.tiers[tier].storage) return false
		return true
	}

	/**
	 * Determine if this {@link StorageTiers `StorageTiers`} object is equal to another {@link StorageTiers `StorageTiers`} object.
	 * @param storageTiers The other {@link StorageTiers `StorageTiers`} object.
	 * @returns `true` if both {@link StorageTiers `StorageTiers`} objects are equal, `false` otherwise.
	 */
	override equals(storageTiers: StorageTiers): boolean {
		return super.equals(storageTiers)
			&& this.similarEquals(storageTiers)
	}

	/**
	 * Determine if this {@link StorageTiers `StorageTiers`} object is strictly equal to another {@link StorageTiers `StorageTiers`} object.
	 * @param storageTiers The other {@link StorageTiers `StorageTiers`} object.
	 * @returns `true` if both {@link StorageTiers `StorageTiers`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(storageTiers: StorageTiers): boolean {
		return super.strictlyEquals(storageTiers)
			&& this.similarEquals(storageTiers)
	}
}