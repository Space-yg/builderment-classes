/**
 * @author Space.yg
 */

// Classes
import { Base } from "../Base.js"

// Types
import type { BaseParams } from "../Base.js"

/**
 * Parameters for {@link Decoration `Decoration`}.
 * @extends {{@link BaseParams `BaseParams`}
 */
export type DecorationParams = BaseParams & {}

/**
 * Create a new {@link Decoration `Decoration`}.
 * @extends {{@link Base `Base`}
 */
export class Decoration extends Base {

	//// Static Properties

	/**
	 * All the decorations that has been created.
	 * @readonly
	*/
	static readonly decorations: Decoration[] = []

	/**
	 * The description of all decoration builds.
	 * @readonly
	 */
	static get description(): string { return "Purely decorative, make your factory one of a kind." }

	//// Constructor

	/**
	 * Constructs a new {@link Decoration `Decoration`} object.
	 * @param params The decoration parameters.
	 */
	constructor(params: DecorationParams)
	/**
	 * Constructs a new {@link Decoration `Decoration`} object.
	 * @param decoration A {@link Decoration `Decoration`} object.
	 */
	constructor(decoration: Decoration)
	/**
	 * Constructs a new {@link Decoration `Decoration`} object.
	 * @param decoration A {@link Decoration `Decoration`} object or decoration parameters.
	 */
	constructor(paramsOrDecoration: Decoration | DecorationParams) {
		super(paramsOrDecoration)

		// Image
		this.image = paramsOrDecoration.image ?? this.image + `decorations/${this.name}.png`

		// Statics
		Decoration.decorations.push(this)
	}
}