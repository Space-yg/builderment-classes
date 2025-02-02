/**
 * @author Space.yg
 */

// Classes
import { Currency } from "../classes/Currency"

/** Gold */
export const gold = new Currency({
	name: "Gold",
	price: {
		gold: 1,
		gems: null,
	},
})

/** Gem */
export const gem = new Currency({
	name: "Gem",
	price: {
		gold: null,
		gems: 1,
	},
})