/**
 * @author Space.yg
 */

// Classes
import { StorageTiers } from "./StorageTiers"

// Types
import type { Price } from "@/classes/Price"
import type { StorageTiersParams } from "./StorageTiers"

/** Parameters for {@link Storage `Storage`}. */
export type StorageParams = {
	/** The name of the storage. */
	name: string
	/** The description of the storage. */
	description: string
	/** The tiers of the storage. */
	tiers: StorageTiersParams | StorageTiers
}

/**
 * Create a new storage.
 * @extends {{@link StorageTiers `StorageTiers`}
 */
export class Storage extends StorageTiers {

	//// Static properties

	/**
	 * All the transportations that has been created.
	 * @readonly
	 */
	static readonly storages: Storage[] = []

	//// Object Properties

	/** The name of the storage. */
	name: StorageParams["name"]
	/**
	 * The price of the storage.
	 * @default
	 * ```javascript
	 * new Price({
	 * 	gold: 0,
	 * 	gems: 0
	 * })
	 * ```
	 */
	price: Price
	/** The description of the storage. */
	description: StorageParams["description"]

	//// Constructors

	/**
	 * Construct a {@link Storage `Storage`} object.
	 * @param params The tier parameters.
	 */
	constructor(params: StorageParams, passByReference?: boolean)
	/**
	 * Construct a {@link Storage `Storage`} object.
	 * @param storage A {@link Storage `Storage`} object.
	 */
	constructor(storage: Storage, passByReference?: boolean)
	/**
	 * Construct a {@link Storage `Storage`} object.
	 * @param storage A {@link Storage `Storage`} object or tier parameters.
	 */
	constructor(storage: Storage | StorageParams, passByReference?: boolean)
	constructor(paramsOrStorage: Storage | StorageParams, passByReference: boolean = true) {
		super(paramsOrStorage.tiers, passByReference)

		this.name = paramsOrStorage.name
		this.price = this.tiers[this.minTierNum].price
		this.description = paramsOrStorage.description

		// Image
		if (paramsOrStorage instanceof Storage) for (const tier in this.tiers) this.tiers[tier].image = paramsOrStorage.tiers[tier].image ?? this.tiers[tier].image + `storages/${this.name} Tier ${tier}.png`
		else {
			if (paramsOrStorage.tiers instanceof StorageTiers) for (const tier in this.tiers) this.tiers[tier].image = paramsOrStorage.tiers.tiers[tier].image ?? this.tiers[tier].image + `storages/${this.name} Tier ${tier}.png`
			else for (const tier in this.tiers) this.tiers[tier].image = paramsOrStorage.tiers[tier].image ?? this.tiers[tier].image + `storages/${this.name} Tier ${tier}.png`
		}

		// Statics
		Storage.storages.push(this)
	}

	//// Object Methods

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param storage The other {@link Storage `Storage`} object.
	 * @returns `true` if both {@link Storage `Storage`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected override similarEquals(storage: Storage): boolean {
		return this.name === storage.name
			&& this.price.equals(storage.price)
			&& this.description === storage.description
	}

	/**
	 * Determine if this {@link Storage `Storage`} object is equal to another {@link Storage `Storage`} object.
	 * @param storage The other {@link Storage `Storage`} object.
	 * @returns `true` if both storages are the equal, `false` otherwise.
	 */
	override equals(storage: Storage): boolean {
		return super.equals(storage)
			&& this.similarEquals(storage)
	}

	/**
	 * Determine if this {@link Storage `Storage`} object is strictly equal to {@link Storage `Storage`} object.
	 * @param storage The other {@link Storage `Storage`} object.
	 * @returns `true` if both storages are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(storage: Storage): boolean {
		return super.strictlyEquals(storage)
			&& this.similarEquals(storage)
	}
}