/**
 * @author Space.yg
 */

import { Item } from "./Item.js"

/** The options of the input type */
interface InputOptions {
    /** The item of the input */
    item: Item
    /** The amount needed to make the parent */
    amount: number
}

/** The options of the input with input/min type */
interface InputPerMinOptions extends InputOptions {
    /** Total input/min in tier 1 */
    inputPerMin: number
}

/** The options of the input object type */
interface InputOptionsObject {
    [/** The name of the input */ name: string]: InputPerMinOptions
}

export {InputOptions, InputPerMinOptions, InputOptionsObject}