/**
 * @author Space.yg
 */

// Classes
import { Tier } from "../Tier"

// Types
import type { TierParams } from "../Tier"

/**
 * Parameters for a storage tier.
 * @extends {{@link TierParams `TierParams`}
 */
export type StorageTierParams = TierParams & {
	/** The storage at this tier. */
	storage: number
}

/**
 * A distance tier.
 * @extends {{@link Tier `Tier`}
 */
export class StorageTier extends Tier {

	//// Object Properties

	/** The output at this tier. */
	storage: StorageTierParams["storage"]

	//// Constructors

	/**
	 * Constructs a new {@link StorageTier `StorageTier`} object.
	 * @param params The storage tier parameters.
	 */
	constructor(params: StorageTierParams)
	/**
	 * Constructs a new {@link StorageTier `StorageTier`} object.
	 * @param storageTier A {@link StorageTier `StorageTier`} object.
	 */
	constructor(storageTier: StorageTier)
	/**
	 * Constructs a new {@link StorageTier `StorageTier`} object.
	 * @param storageTier A {@link StorageTier `StorageTier`} object or storage tier parameters.
	 */
	constructor(paramsOrStorageTier: StorageTier | StorageTierParams) {
		super(paramsOrStorageTier)

		this.storage = paramsOrStorageTier.storage
	}

	//// Object Methods

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param distanceTier The other {@link StorageTier `StorageTier`} object.
	 * @returns `true` if both {@link StorageTier `StorageTier`} objects are the equal in the properties that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(storageTier: StorageTier): boolean {
		return this.storage === storageTier.storage
	}

	/**
	 * Determine if this {@link StorageTier `StorageTier`} object is equal to another {@link StorageTier `StorageTier`} object.
	 * @param storageTier The other {@link StorageTier `StorageTier`} object.
	 * @returns `true` if both {@link StorageTier `StorageTier`} objects are equal, `false` otherwise.
	 */
	override equals(storageTier: StorageTier): boolean {
		return super.equals(storageTier)
			&& this.similarEquals(storageTier)
	}

	/**
	 * Determine if this {@link StorageTier `StorageTier`} object is strictly equal to another {@link StorageTier `StorageTier`} object.
	 * @param storageTier The other {@link StorageTier `StorageTier`} object.
	 * @returns `true` if both {@link StorageTier `StorageTier`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(storageTier: StorageTier): boolean {
		return super.strictlyEquals(storageTier)
			&& this.similarEquals(storageTier)
	}
}