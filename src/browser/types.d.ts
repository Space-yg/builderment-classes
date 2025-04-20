/**
 * @author Space.yg
 */

/**
 * Show all properties in a type.
 * @template T The type.
 */
export type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}

/**
 * Removes all functions from {@link T `T`}.
 * @template T The type to remove all functions from.
 */
export type RemoveFunctions<T> = {
	[P in keyof T as T[P] extends Function ? never : P]: T[P]
}