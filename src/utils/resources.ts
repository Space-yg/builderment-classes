/** All in game base resources */
export const InGameBaseResources = [
	"Wood Log",
	"Stone",
	"Iron Ore",
	"Copper Ore",
	"Coal",
	"Wolframite",
	"Uranium Ore",
] as const

/** An in game base resource */
export type InGameBaseResource = typeof InGameBaseResources[number]

/** All in game non-base resources */
export const InGameNonBaseResources = [
	"Atomic Locator",
	"Battery",
	"Carbon Fiber",
	"Computer",
	"Concrete",
	"Condenser Lens",
	"Copper Ingot",
	"Copper Wire",
	"Coupler",
	"Earth Token",
	"Electric Motor",
	"Electromagnet",
	"Electron Microscope",
	"Empty Fuel Cell",
	"Energy Cube",
	"Enriched Uranium",
	"Glass",
	"Graphite",
	"Gyroscope",
	"Heat Sink",
	"Industrial Frame",
	"Iron Gear",
	"Iron Ingot",
	"Iron Plating",
	"Logic Circuit",
	"Magnetic Field Generator",
	"Matter Compressor",
	"Matter Duplicator",
	"Metal Frame",
	"Nano Wire",
	"Nuclear Fuel Cell",
	"Particle Glue",
	"Quantum Entangler",
	"Rotor",
	"Sand",
	"Silicon",
	"Stabilizer",
	"Steel",
	"Steel Rod",
	"Super Computer",
	"Tank",
	"Tungsten Carbide",
	"Tungsten Ore",
	"Turbocharger",
	"Wood Frame",
	"Wood Plank",
] as const

/** An in game none-base resource */
export type InGameNonBaseResource = typeof InGameNonBaseResources[number]

/** All in game resources */
export const InGameResources = [...InGameBaseResources, ...InGameNonBaseResources] as const

/** An in game resource */
export type InGameResource = typeof InGameResources[number]

/** All in game alt resources */
export const InGameAltResources = [
	"Concrete",
	"Copper Wire",
	"Electric Motor",
	"Electromagnet",
	"Industrial Frame",
	"Iron Gear",
	"Logic Circuit",
	"Rotor",
	"Steel",
	"Super Computer",
	"Tungsten Carbide",
	"Turbocharger",
] as const

/** An in game alt resource */
export type InGameAltResource = typeof InGameAltResources[number]

/** The maximum amount of an item */
export type MaxItem<Boost extends boolean = false, Alt extends boolean = false> = {
	/** The maximum amount to make that resource */
	maxAmount: number
	/** The resources needed to make the maximum of that resource */
	resources: Partial<Record<InGameNonBaseResource, number>>
	/** The base resources needed to make the maximum of that resource */
	baseResources: Record<InGameBaseResource, number>
}
	& (
		Boost extends true ? {
			/** The number of extractors to boost of each base resource */
			boosts: Record<InGameBaseResource, number>
		} : {}
	)
	& (
		Alt extends true ? {
			/** The amount of alt items needed to make */
			alts: Partial<Record<InGameAltResource, number>>
		} : {}
	)

/** Constraints used to calculate the max amount of an item */
export const Constraints = {
	RECIPES: {
		"Atomic Locator": [["Atomic Locator", 1], ["Super Computer", -2], ["Electron Microscope", -2], ["Concrete", -24], ["Copper Wire", -50]],
		"Battery": [["Battery", 1], ["Electromagnet", -8], ["Graphite", -8]],
		"Carbon Fiber": [["Carbon Fiber", 1], ["Graphite", -4]],
		"Computer": [["Computer", 1], ["Metal Frame", -1], ["Heat Sink", -3], ["Logic Circuit", -3]],
		"Concrete STD": [["Concrete STD", 1], ["Sand", -10], ["Steel Rod", -1]],
		"Concrete ALT": [["Concrete ALT", 1], ["Stone", -20], ["Wood Frame", -4]],
		"Condenser Lens": [["Condenser Lens", 1], ["Glass", -3]],
		"Copper Ingot": [["Copper Ingot", 1], ["Copper Ore", -1]],
		"Copper Wire STD": [["Copper Wire STD", 2], ["Copper Ingot", -3]],
		"Copper Wire ALT": [["Copper Wire ALT", 8], ["Carbon Fiber", -1]],
		"Coupler": [["Coupler", 1], ["Tungsten Carbide", -1]],
		"Earth Token": [["Earth Token", 1], ["Matter Duplicator", -1]],
		"Electric Motor STD": [["Electric Motor STD", 1], ["Battery", -1], ["Iron Gear", -4], ["Rotor", -2]],
		"Electric Motor ALT": [["Electric Motor ALT", 1], ["Electromagnet", -6], ["Steel", -6], ["Empty Fuel Cell", -1]],
		"Electromagnet STD": [["Electromagnet STD", 1], ["Copper Wire", -6], ["Iron Ingot", -2]],
		"Electromagnet ALT": [["Electromagnet ALT", 12], ["Nano Wire", -1], ["Steel Rod", -1]],
		"Electron Microscope": [["Electron Microscope", 1], ["Nano Wire", -2], ["Electromagnet", -8], ["Condenser Lens", -4], ["Metal Frame", -2]],
		"Empty Fuel Cell": [["Empty Fuel Cell", 1], ["Tungsten Carbide", -3], ["Glass", -5]],
		"Energy Cube": [["Energy Cube", 1], ["Battery", -2], ["Industrial Frame", -1]],
		"Enriched Uranium": [["Enriched Uranium", 1], ["Uranium Ore", -30]],
		"Glass": [["Glass", 1], ["Sand", -4]],
		"Graphite": [["Graphite", 1], ["Coal", -3], ["Wood Log", -3]],
		"Gyroscope": [["Gyroscope", 1], ["Copper Wire", -12], ["Rotor", -2]],
		"Heat Sink": [["Heat Sink", 1], ["Copper Ingot", -5]],
		"Industrial Frame STD": [["Industrial Frame STD", 1], ["Concrete", -6], ["Metal Frame", -2], ["Tungsten Carbide", -8]],
		"Industrial Frame ALT": [["Industrial Frame ALT", 1], ["Steel", -18], ["Iron Plating", -10], ["Carbon Fiber", -4]],
		"Iron Gear STD": [["Iron Gear STD", 1], ["Iron Ingot", -2]],
		"Iron Gear ALT": [["Iron Gear ALT", 8], ["Steel", -1]],
		"Iron Ingot": [["Iron Ingot", 1], ["Iron Ore", -1]],
		"Iron Plating": [["Iron Plating", 2], ["Iron Ingot", -4]],
		"Logic Circuit STD": [["Logic Circuit STD", 1], ["Copper Wire", -3], ["Silicon", -2]],
		"Logic Circuit ALT": [["Logic Circuit ALT", 1], ["Iron Plating", -1], ["Heat Sink", -1]],
		"Magnetic Field Generator": [["Magnetic Field Generator", 1], ["Stabilizer", -1], ["Industrial Frame", -1], ["Electromagnet", -10], ["Nano Wire", -10]],
		"Matter Compressor": [["Matter Compressor", 1], ["Industrial Frame", -1], ["Turbocharger", -2], ["Electric Motor", -2], ["Tank", -1]],
		"Matter Duplicator": [["Matter Duplicator", 1], ["Atomic Locator", -4], ["Quantum Entangler", -2], ["Energy Cube", -5], ["Particle Glue", -100]],
		"Metal Frame": [["Metal Frame", 1], ["Wood Frame", -1], ["Iron Plating", -4]],
		"Nano Wire": [["Nano Wire", 1], ["Carbon Fiber", -2], ["Glass", -4]],
		"Nuclear Fuel Cell": [["Nuclear Fuel Cell", 1], ["Empty Fuel Cell", -1], ["Steel Rod", -1], ["Enriched Uranium", -1]],
		"Particle Glue": [["Particle Glue", 10], ["Matter Compressor", -1]],
		"Quantum Entangler": [["Quantum Entangler", 1], ["Magnetic Field Generator", -1], ["Stabilizer", -2]],
		"Rotor STD": [["Rotor STD", 1], ["Steel Rod", -1], ["Iron Plating", -2]],
		"Rotor ALT": [["Rotor ALT", 1], ["Copper Ingot", -18], ["Iron Plating", -18]],
		"Sand": [["Sand", 1], ["Stone", -1]],
		"Silicon": [["Silicon", 1], ["Sand", -2]],
		"Stabilizer": [["Stabilizer", 1], ["Computer", -1], ["Electric Motor", -1], ["Gyroscope", -2]],
		"Steel STD": [["Steel STD", 1], ["Graphite", -1], ["Iron Ore", -6]],
		"Steel ALT": [["Steel ALT", 1], ["Iron Ore", -4], ["Coal", -4]],
		"Steel Rod": [["Steel Rod", 1], ["Steel", -3]],
		"Super Computer STD": [["Super Computer STD", 1], ["Computer", -2], ["Heat Sink", -8], ["Turbocharger", -1], ["Coupler", -8]],
		"Super Computer ALT": [["Super Computer ALT", 2], ["Computer", -2], ["Silicon", -40], ["Gyroscope", -2], ["Industrial Frame", -1]],
		"Tank": [["Tank", 1], ["Glass", -2], ["Concrete", -4], ["Tungsten Carbide", -4]],
		"Tungsten Carbide STD": [["Tungsten Carbide STD", 1], ["Tungsten Ore", -2], ["Graphite", -1]],
		"Tungsten Carbide ALT": [["Tungsten Carbide ALT", 2], ["Tungsten Ore", -1], ["Steel", -1]],
		"Tungsten Ore": [["Tungsten Ore", 1], ["Wolframite", -5]],
		"Turbocharger STD": [["Turbocharger STD", 1], ["Iron Gear", -8], ["Logic Circuit", -4], ["Nano Wire", -2], ["Coupler", -4]],
		"Turbocharger ALT": [["Turbocharger ALT", 1], ["Heat Sink", -4], ["Computer", -1], ["Gyroscope", -1], ["Tungsten Carbide", -1]],
		"Wood Frame": [["Wood Frame", 1], ["Wood Plank", -4]],
		"Wood Plank": [["Wood Plank", 1], ["Wood Log", -1]]
	} as { [resource: string]: [string, number][] },

	ALT_RECIPES: [
		"Concrete", "Copper Wire", "Electric Motor", "Electromagnet",
		"Industrial Frame", "Iron Gear", "Logic Circuit", "Rotor", "Steel",
		"Super Computer", "Tungsten Carbide", "Turbocharger"
	],

	add_recipe: function(needed_recipes: Set<string>, alt: boolean, resource: string) {
		if (this.ALT_RECIPES.includes(resource)) {
			needed_recipes.add(JSON.stringify(this.RECIPES[resource + " STD"]))
			if (alt) {
				needed_recipes.add(JSON.stringify(this.RECIPES[resource + " ALT"]))
			}
		} else {
			if (resource in this.RECIPES) {
				needed_recipes.add(JSON.stringify(this.RECIPES[resource]))
			}
		}
	},

	add_constraint: function(constraints: { [resource: string]: { name: string, coef: number }[] }, alt: boolean, resource: string) {
		if (alt && this.ALT_RECIPES.includes(resource) && !(resource + " SUM" in constraints)) {
			constraints[resource + " SUM"] = [
				{ name: resource, coef: 1 },
				{ name: resource + " STD", coef: -1 },
				{ name: resource + " ALT", coef: -1 }
			]
		}
	},

	get: function(resource: string, alt: boolean = false, boost: boolean = false) {
		let needed_recipes = new Set<string>()
		let constraints: { [resource: string]: { name: string, coef: number }[] } = {}
		if (boost) {
			needed_recipes.add(JSON.stringify(this.RECIPES["Nuclear Fuel Cell"]))
		}
		this.add_recipe(needed_recipes, alt, resource)
		this.add_constraint(constraints, alt, resource)

		for (const rec_str of needed_recipes) {
			let rec = JSON.parse(rec_str)
			for (const item of rec.slice(1)) {
				this.add_recipe(needed_recipes, alt, item[0])
				this.add_constraint(constraints, alt, item[0])

				let cons_name = rec[0][0]
				if (!alt && cons_name.endsWith(" STD")) {
					cons_name = cons_name.slice(0, -4)
				}
				let new_part = { name: cons_name, coef: item[1] / rec[0][1] }
				if (item[0] in constraints) {
					constraints[item[0]].push(new_part)
				} else {
					constraints[item[0]] = [{ name: item[0], coef: 1 }, new_part]
				}
			}
		}
		return Object.values(constraints)
	}
}

export const EX_RATE = 30 as const
export const EX_RATE_UR = 10 as const
export const NPP_RATE = 0.5 as const
export const CPP_RATE = 10 as const
export const NUC_BOOST = 1.4 as const
export const COAL_BOOST = 1.2 as const

export const EX_NPP = 44 as const
export const EX_CPP = 11 as const
export const EX_NPP_UR = 8.5 as const
export const EX_CPP_UR = 6.5 as const