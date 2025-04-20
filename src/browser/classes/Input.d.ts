/**
 * @author Space.yg
 */

import { Item } from "./Item.js"

/** The options of an input. */
export type InputOptions = {
	/** The item of the input. */
	item: Item
	/** The amount needed to make the parent. */
	amount: number
}

/**
 * The options of an input with input/min.
 */
type InputPerMin = {
	/** The amount needed to make the parent. */
	amount: number
	/** Total input/min in tier 1. */
	inputPerMin: number
}

export type InputItemPerMin = InputPerMin & {
	/** The item of the input. */
	item: Item
}

/** The options of an input object. */
export type InputMap = Map<Item, InputPerMin>