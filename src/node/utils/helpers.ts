/**
 * @author Space.yg
 */

import GLPKConstructor from "glpk.js"

/** GNU Linear Programming Kit */
export const glpk = GLPKConstructor()

/**
 * Capitalize the first letters in a string and remove any unnecessary spacings.
 * @param string The string.
 * @returns The string with capitalized first letters.
 */
export function capitalizeFirstLetters(string: string): string {
	let i = string.split(" ")
	for (let index = i.length - 1; index >= 0; index--) {
		if (i[index] === "") {
			i.splice(index)
			continue
		}
		i[index] = i[index][0].toUpperCase() + i[index].substring(1).toLowerCase()
	}
	return i.join(" ")
}

/**
 * Coverts anything to string. This is a helper method.
 * @param any Anything.
 * @param tabs The amount of tabs.
 * @param limit The limit of how many tabs can be there.
 * @returns The string.
 */
function toString(any: any, tabs: string, limit: number): string {
	// If object...
	if (typeof any === "object") {
		if (tabs.length === limit) return "[object " + any.constructor.name + "]"
		else if (Array.isArray(any)) return arrayToString(any, limit, tabs + "\t")
		else return objToString(any, limit, tabs + "\t")
	}
	// If string...
	else if (typeof any === "string") return `"${any}"`
	// If bigint...
	else if (typeof any === "bigint") return any + "n"
	// If anything else...
	return any
}

/**
 * Converts an array to a string.
 * @param arr The array.
 * @param limit The limit of how many tabs.
 * @param tabs The amount of tabs (\t).
 * @returns The string.
 */
export function arrayToString(arr: any[], limit: number = 1, tabs: string = "\t") {
	let string: string = "[\n"

	for (const value of arr) {
		// Add tabs
		string += tabs

		// Add string
		string += toString(value, tabs, limit)

		// Next line
		string += ",\n"
	}

	string = string.slice(0, string.length - 2) + "\n"
	string += (tabs.length > 1 ? tabs.slice(0, tabs.length - 1) : "") + "]"
	if (arr.length === 0) return "[]"
	return string
}

/**
 * Converts an object to a string.
 * @param obj The object.
 * @param limit The limit of how many tabs.
 * @param tabs The amount of tabs (\t).
 * @returns The string.
 */
export function objToString(obj: any, limit: number = 1, tabs: string = "\t"): string {
	let string: string = (obj.constructor.name === "Object" ? "" : obj.constructor.name + " ") + "{\n"

	// Go through each object
	for (const key in obj) {
		// Add tabs
		string += tabs + key + ": "

		// Add string
		string += toString(obj[key], tabs, limit)

		// Next line
		string += ",\n"
	}

	string = string.slice(0, string.length - 2) + "\n"
	string += tabs.slice(0, tabs.length - 1) + "}"
	return string
}