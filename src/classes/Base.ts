/**
 * @author Space.yg
 */

// Classes
import { Price } from "./Price.js"

// Functions
import { objToString } from "../utils/helpers.js"

// Types
import type { PriceParams } from "./Price.js"

/** The base parameters. */
export type BaseParams = {
	/** The name. */
	name: string
	/** The price. */
	price: Price | PriceParams
	/**
	 * URL or relative path to the image.
	 * @default "./resources/"
	 */
	image?: string
}

// TODO: class Recipe
/** The base of some classes. */
export class Base {

	//// Static properties

	//* Public
	/**
	 * All the bases that has been created.
	 * @readonly
	 */
	static readonly bases: { [/** The name. */ name: string]: Base[] } = {}

	//// Object Properties

	/** The name. */
	name: BaseParams["name"]
	/** The price. */
	price: Price
	/**
	 * URL or relative path to the image.
	 * @default "./resources/"
	 */
	image: NonNullable<BaseParams["image"]>

	//// Constructors

	/**
	 * Constructs a {@link Base `Base`} object.
	 * @param params The base parameters.
	 */
	constructor(params: BaseParams)
	/**
	 * Constructs a {@link Base `Base`} object.
	 * @param base A {@link Base `Base`} object.
	 * @param passByReference Whether to pass the objects in {@link base `base`} by reference or not. Default is `true`.
	 */
	constructor(base: Base, passByReference?: boolean)
	/**
	 * Constructs a {@link Base `Base`} object.
	 * @param base A {@link Base `Base`} object or base parameters.
	 * @param passByReference Whether to pass the objects in {@link base `base`} by reference or not. Default is `true`.
	 */
	constructor(base: Base | BaseParams, passByReference?: boolean)
	constructor(baseOrParams: Base | BaseParams, passByReference: boolean = true) {
		this.name = baseOrParams.name
		if (passByReference && baseOrParams instanceof Base) this.price = baseOrParams.price
		else this.price = new Price(baseOrParams.price)
		this.image = baseOrParams.image ?? "./resources/"

		// Statics
		if (typeof Base.bases[baseOrParams.name] === "undefined") Base.bases[baseOrParams.name] = [this]
		else Base.bases[baseOrParams.name].push(this)
	}

	//// Object Methods
	/**
	 * Converts this {@link Base `Base`} object into string.
	 * @param limit The limit of how many tabs can be used. `limit` must be greater than 0. Default is 2.
	 * @returns The string.
	 */
	toString(limit: number = 2): string {
		if (limit <= 0) throw new Error("limit must be greater than 0")
		return objToString(this, limit)
	}

	/**
	 * Determine if this {@link Base `Base`} object is equal to another {@link Base `Base`} object.
	 * @param base The other {@link Base `Base`} object.
	 * @returns `true` if both {@link Base `Base`} objects are equal, `false` otherwise.
	 */
	equals(base: Base): boolean {
		if (this === base) return true
		return this.name === base.name
			&& this.price.equals(base.price)
	}

	/**
	 * Determine if this {@link Base `Base`} object is strictly equal to another {@link Base `Base`} object.
	 * @param base The other {@link Base `Base`} object.
	 * @returns `true` if both {@link Base `Base`} objects are strictly equal, `false` otherwise.
	 */
	strictlyEquals(base: Base): boolean {
		return this.equals(base)
			&& this.image === base.image
	}
}