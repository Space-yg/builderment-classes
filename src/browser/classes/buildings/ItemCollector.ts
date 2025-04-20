/**
 * @author Space.yg
 */

// Classes
import { Base } from "@/classes/Base.js"

// Types
import type { BaseParams } from "@/classes/Base.js"

/**
 * Options for {@link ItemCollector `ItemCollector`}.
 * @extends {{@link BaseParams `BaseOptions`}
 */
export type ItemCollectorParams = BaseParams & {
	/** The description of the build. */
	description: string
	/** The limit how many of the build can be build. */
	limit: number
	/** The amount of inputs of the build. */
	inputs: number
}

/**
 * An item collector.
 * @extends {{@link Base `Base`}
 */
export class ItemCollector extends Base {

	//// Static Properties

	/**
	 * All the item collectors that has been created.
	 * @readonly
	 */
	static readonly itemCollectors: ItemCollector[] = []

	//// Object Properties

	/** The description of the build. */
	description: ItemCollectorParams["description"]
	/** The limit how many of the build can be build. */
	limit: ItemCollectorParams["limit"]
	/** The amount of inputs of the build. */
	inputs: ItemCollectorParams["inputs"]

	//// Constructors

	/**
	 * Construct an {@link ItemCollector `ItemCollector`} object.
	 * @param options The item collector options.
	 */
	constructor(options: ItemCollectorParams)
	/**
	 * Construct an {@link ItemCollector `ItemCollector`} object.
	 * @param itemCollector An {@link ItemCollector `ItemCollector`} object.
	 */
	constructor(itemCollector: ItemCollector)
	/**
	 * Construct an {@link ItemCollector `ItemCollector`} object.
	 * @param itemCollector an {@link ItemCollector `ItemCollector`} object or item collector options.
	 */
	constructor(itemCollector: ItemCollector | ItemCollectorParams)
	constructor(itemCollectorOrOptions: ItemCollector | ItemCollectorParams) {
		super(itemCollectorOrOptions)

		this.image = itemCollectorOrOptions.image ?? this.image + `item-collectors/${this.name}.png`
		this.description = itemCollectorOrOptions.description
		this.limit = itemCollectorOrOptions.limit
		this.inputs = itemCollectorOrOptions.inputs

		// Static
		ItemCollector.itemCollectors.push(this)
	}

	//// Object Methods

	/**
	 * These are similarities between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods.
	 * @param itemCollector The other {@link ItemCollector `ItemCollector`} object.
	 * @returns `true` if both {@link ItemCollector `ItemCollector`} objects are the equal in the things that are similar between the {@link equals `equals`} and {@link strictlyEquals `strictlyEquals`} methods, `false` otherwise.
	 */
	private similarEquals(itemCollector: ItemCollector): boolean {
		return this.description === itemCollector.description
			&& this.limit === itemCollector.limit
			&& this.inputs === itemCollector.inputs
	}

	/**
	 * Determine if this {@link ItemCollector `ItemCollector`} object is equal to another {@link ItemCollector `ItemCollector`} object.
	 * @param itemCollector The other {@link ItemCollector `ItemCollector`} object.
	 * @returns `true` if both {@link ItemCollector `ItemCollector`} objects are equal, `false` otherwise.
	 */
	override equals(itemCollector: ItemCollector): boolean {
		return super.equals(itemCollector)
			&& this.similarEquals(itemCollector)
	}

	/**
	 * Determine if this {@link ItemCollector `ItemCollector`} object is strictly equal to another {@link ItemCollector `ItemCollector`} object.
	 * @param itemCollector The other {@link ItemCollector `ItemCollector`} object.
	 * @returns `true` if both {@link ItemCollector `ItemCollector`} objects are strictly equal, `false` otherwise.
	 */
	override strictlyEquals(itemCollector: ItemCollector): boolean {
		return super.strictlyEquals(itemCollector)
			&& this.similarEquals(itemCollector)
	}
}