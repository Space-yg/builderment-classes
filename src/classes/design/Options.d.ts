/**
 * @author Space.yg
 */

import { DesignOptions } from "./Design";

export interface NToMOptions extends Omit<DesignOptions, "category" | "name"> {
    /** The amount of inputs */
    n: number
    /** The amount of outputs */
    m: number
}