/**
 * @author Space.yg
 */

// Classes
import { Base } from "./Base"

// Types
import type { BaseParams } from "./Base"

/**
 * Parameters for {@link Currency `Currency`}.
 * @extends {{@link BaseParams `BaseParams`}
 */
export type CurrencyParams = BaseParams & {}

// TODO: I could try to combine this with Price
/** Create a new currency */
export class Currency extends Base {
	//// Static Properties

	/**
	 * All the currencies that has been created.
	 * @readonly
	*/
	static readonly currencies: Currency[] = []

	//// Constructors

	/**
	 * Constructs a new {@link Currency `Currency`} object.
	 * @param params The currency parameters.
	 */
	constructor(params: CurrencyParams)
	/**
	 * Constructs a new {@link Currency `Currency`} object.
	 * @param currency A {@link Currency `Currency`} object.
	 */
	constructor(currency: Currency)
	/**
	 * Constructs a new {@link Currency `Currency`} object.
	 * @param currency A {@link Currency `Currency`} object or currency parameters.
	 */
	constructor(paramsOrCurrency: Currency | CurrencyParams) {
		super(paramsOrCurrency)

		// Image
		this.image = paramsOrCurrency.image ?? this.image + `currencies/${this.name}.png`

		// Statics
		Currency.currencies.push(this)
	}
}