//// Tests
// Classes
// import { Base } from "./index.js"
import { Item } from "./classes/Item.js"
import { Seed } from "./classes/Seed.js"

// Objects
import { earthToken, matterDuplicator, nuclearFuelCell } from "./objects/items.js"
import { advancedBelts, startingTech, earthTeleporter as earthTeleporterTechnology } from "./objects/technologies.js"
import { earthTeleporter } from "./objects/buildings/factories.js"
import { Technology } from "./index.js"
import { technologies } from "./index.js"

type BaseOptions<Extra extends object = {}> = {
	price: number
	image: string
} & Extra

class _Base {
	price: number
	image: string

	constructor(options: BaseOptions<any>) {
		this.price = options.price
		this.image = options.image

		// This will add the extra options
		// @ts-ignore
		for (const option in options) this[option] = options[option]
	}
}
// type Base<Extra extends object> = _Base & Extra;
const Base = _Base as new <Extra extends object = {}>(options: BaseOptions<Extra>) => _Base & Extra

class hi extends Base {
	constructor(options: BaseOptions<any>) {
		super(options)
	}
}

let a: keyof BaseOptions

new Base<{
	hello: string
}>({
	image: "",
	price: 2,
	hello: ""
}).hello

// Seed.constructFromFile("../New_World_1_1YVVNT_100.sav")

// // Power Plants Power
// let start = Date.now()

// console.log(earthToken.getMaxResourceAmountInSeedWithPowerPlants({
//     "Wood Log": 757,
//     Stone: 634,
//     "Iron Ore": 791,
//     "Copper Ore": 637,
//     Coal: 776,
//     Wolframite: 393,
//     "Uranium Ore": 66
// }));

// console.log(Date.now() - start);
// let start = Date.now()

// console.log(earthToken.getMaxResourceAmountInSeedWithPowerPlants({
//     "Wood Log": 748,
//     Stone: 634,
//     "Iron Ore": 772,
//     "Copper Ore": 649,
//     Coal: 792,
//     Wolframite: 347,
//     "Uranium Ore": 66
// }));
// console.log(Date.now() - start);