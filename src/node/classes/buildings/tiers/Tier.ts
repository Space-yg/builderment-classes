/**
 * @author Space.yg
 */

// Classes
import { Price } from "@/classes/Price"

// Functions
import { objToString } from "@/utils/helpers"

// Types
import type { PriceParams } from "@/classes/Price"

/** Optional parameters for a tier */
export type TierParams = {
	/**
	 * The price of that tier.
	 * @default
	 * ```javascript
	 * new Price({
	 * 	gold: 0,
	 * 	gems: 0,
	 * })
	 * ```
	*/
	price?: Price | PriceParams
	/**
	 * The relative path or URL to the image of this tier.
	 * @default "./resources/"
	 */
	image?: string
}

/** Make a new tier. */
export class Tier {

	//// Object Properties

	/**
	 * The price of that tier.
	 * @default 
	 * new Price({
	 * 	gold: 0,
	 * 	gems: 0,
	 * })
	 */
	price: Price
	/**
	 * The relative path or URL to the image of this tier.
	 * @default "./resources/"
	 */
	image: NonNullable<TierParams["image"]>

	//// Constructors

	/**
	 * Construct a {@link Tier `Tier`} object.
	 * @param params The tier parameters.
	 */
	constructor(params: TierParams)
	/**
	 * Construct a {@link Tier `Tier`} object.
	 * @param tier A {@link Tier `Tier`} object.
	 */
	constructor(tier: Tier)
	/**x
	 * Construct a {@link Tier `Tier`} object.
	 * @param tier A {@link Tier `Tier`} object or tier parameters.
	 */
	constructor(paramsOrTier: Tier | TierParams) {
		this.price = paramsOrTier.price instanceof Price ? paramsOrTier.price : typeof paramsOrTier.price === "undefined" ? new Price() : new Price(paramsOrTier.price)
		this.image = paramsOrTier.image ?? "./resources/"

		// Add the rest of the properties
		for (const param in paramsOrTier) {
			if ((["price", "image"].indexOf(param) + 1)) continue
			// @ts-ignore
			this[param as keyof Tier] = paramsOrTier[param]
		}
	}

	//// Object Methods

	/**
	 * Converts the tier into string.
	 * @param limit The limit of how many tabs can be used. `limit` must be greater than `0`. Default is `2`.
	 * @returns The string.
	 */
	toString(limit: number = 2): string {
		if (limit <= 0) throw new Error("limit must be greater than 0")
		return objToString(this, limit)
	}

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param tier The other {@link Tier `Tier`} object.
	 * @returns `true` if both {@link Tier `Tier`} objects are the equal in the properties that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	protected similarEquals(tier: Tier): boolean {
		return this.price.equals(tier.price)
	}

	/**
	 * Determine if this {@link Tier `Tier`} object is equal to another {@link Tier `Tier`} object.
	 * @param tier The other {@link Tier `Tier`} object.
	 * @returns `true` if both {@link Tier `Tier`} objects are equal, `false` otherwise.
	 */
	equals(tier: Tier): boolean {
		if (this === tier) return true

		return this.similarEquals(tier)
	}

	/**
	 * Determine if this {@link Tier `Tier`} object is strictly equal to another {@link Tier `Tier`} object.
	 * @param tier The other {@link Tier `Tier`} object.
	 * @returns `true` if both {@link Tier `Tier`} objects are strictly equal, `false` otherwise.
	 */
	strictlyEquals(tier: Tier): boolean {
		if (this === tier) return true

		return this.similarEquals(tier)
			&& this.image === tier.image
	}
}