/**
 * @author Space.yg
 */

// Classes
import { Price } from "./Price"
import { Base } from "./Base"
import { Item } from "./Item"
import { ItemCollector } from "./buildings/ItemCollector"
import { Tiers } from "./buildings/tiers/Tiers"
import { OutputTiers } from "./buildings/tiers/output-tiers/OutputTiers"
import { Factory } from "./buildings/tiers/output-tiers/Factory"
import { StorageTiers } from "./buildings/tiers/storage-tiers/StorageTiers"
import { Storage } from "./buildings/tiers/storage-tiers/Storage"
import { DistanceTiers } from "./buildings/tiers/distance-tiers/DistanceTiers"
import { TransportationDistance } from "./buildings/tiers/distance-tiers/TransportationDistance"

// Types
import type { BaseParams } from "./Base"
import type { PriceParams } from "./Price"
import type { InputOptions } from "./Input"

/** The build and tier of the build. */
export type BuildTierOptions = {
	/** The build that will unlock it's tier */
	build: Tiers
	/** The tier of the factory it will be unlocked at */
	tier: number
}

/**
 * The technology parameters to make a new Technology.
 * @extends {{@link BaseParams `BaseParams`}
 */
export type TechnologyParams = BaseParams & {
	/** The items needed to unlock this technology. */
	resourcesNeeded: InputOptions[]
	/** The items, factories, or builds that this technology unlocks. */
	unlocks: (Base | ItemCollector | BuildTierOptions)[]
	/**
	 * The technologies that this technology unlocks.
	 * @default []
	 */
	unlocksTechnologies?: Technology[]
	/**
	 * The technology needed to unlock this technology.
	 * @default null
	 */
	technologyNeeded?: Technology | null
}

/**
 * This class helps you make a new Technology.
 * @extends {{@link BaseParams `BaseOptions`}
 */
export class Technology extends Base {

	//// Static Properties

	/**
	 * All the technologies that has been created
	 * @readonly
	 */
	static readonly technologies: Technology[] = []

	/**
	 * The image path of the Tech-tree.
	 * @readonly
	 */
	static get treeImage(): string { return "./resources/technologies/Tech Tree.png" }

	/**
	 * Total price of all technologies
	 * @readonly
	 */
	static get totalPrice(): PriceParams {
		let total: PriceParams = { gold: 0, gems: 0 }
		for (const technology of Technology.technologies) for (const currency in total) total[currency as keyof PriceParams]! += technology.price[currency as keyof PriceParams] ?? 0
		return total
	}

	//// Static Methods
	/**
	 * Get a {@link Technology `Technology`} object.
	 * @param name A technology name.
	 * @returns An array of {@link Technology `Technology`} objects if found, else `undefined`.
	 */
	static getTechnologiesByName(name: string): Technology[] {
		const technologies: Technology[] = []
		Technology.technologies.forEach(technology => { if (technology.name === name) technologies.push(technology) })
		return technologies
	}

	//// Object Properties

	/** The items needed to unlock this technology */
	resourcesNeeded: TechnologyParams["resourcesNeeded"]
	/** The items, factories, or builds that this technology unlocks. */
	unlocks: TechnologyParams["unlocks"]
	/**
	 * The technologies that this technology unlocks.
	 * @default []
	*/
	unlocksTechnologies: NonNullable<TechnologyParams["unlocksTechnologies"]>
	/**
	 * The technology needed to unlock this technology.
	 * @default null
	 */
	technologyNeeded: NonNullable<TechnologyParams["technologyNeeded"]> | null

	/**
	 * Get the total price to get to this technology.
	 * @readonly
	 */
	get totalPrice(): Price {
		if (this.technologyNeeded === null) return new Price()
		return Price.add(this.price, this.technologyNeeded.totalPrice)
	}

	//// Constructors

	/**
	 * Constructs a {@link Technology `Technology`} object.
	 * @param params The technology parameters.
	 * @param passByReference Whether to pass the objects in the {@link technology `technology`} by reference or not. Default is `true`.
	 */
	constructor(params: TechnologyParams, passByReference?: boolean)
	/**
	 * Constructs a {@link Technology `Technology`} object.
	 * @param technology A {@link Technology `Technology`} object.
	 * @param passByReference Whether to pass the objects in the {@link technology `technology`} by reference or not. Default is `true`.
	 */
	constructor(technology: Technology, passByReference?: boolean)
	/**
	 * Constructs a {@link Technology `Technology`} object.
	 * @param technology A {@link Technology `Technology`} object or technology parameters.
	 * @param passByReference Whether to pass the objects in the {@link technology `technology`} by reference or not. Default is `true`.
	 */
	constructor(technology: Technology | TechnologyParams, passByReference?: boolean)
	constructor(technologyOrOptions: Technology | TechnologyParams, passByReference: boolean = true) {
		super(technologyOrOptions)

		// Image
		const firstUnlock = technologyOrOptions.unlocks[0]
		this.image = technologyOrOptions.image ?? this.image + `technologies/${this.name}` + (
			// is BuildTierOptions
			Object.hasOwn(firstUnlock, "build") ?
				// is Transportation and underground belt upgrade
				(<BuildTierOptions> firstUnlock).build instanceof TransportationDistance && (<TransportationDistance> (<BuildTierOptions> firstUnlock).build).name === "Underground Belt Upgrade" ?
					` ${(<BuildTierOptions> firstUnlock).tier}` :
					` Tier ${(<BuildTierOptions> firstUnlock).tier}` :
				""
		) + ".png"

		// passByReference
		if (passByReference) {
			this.technologyNeeded = typeof technologyOrOptions.technologyNeeded === "undefined" ? null : technologyOrOptions.technologyNeeded
			this.resourcesNeeded = technologyOrOptions.resourcesNeeded
			this.unlocks = technologyOrOptions.unlocks
			this.unlocksTechnologies = technologyOrOptions.unlocksTechnologies ?? []
		}
		// NOT passByReference
		else {
			// technologyNeeded
			this.technologyNeeded = typeof technologyOrOptions.technologyNeeded === "undefined" || technologyOrOptions.technologyNeeded === null ? null : new Technology(technologyOrOptions.technologyNeeded)

			// resourcesNeeded
			this.resourcesNeeded = []
			for (const resourceNeeded of technologyOrOptions.resourcesNeeded) this.resourcesNeeded.push({
				amount: resourceNeeded.amount,
				item: new Item(resourceNeeded.item)
			})

			// unlocks
			this.unlocks = []
			for (const unlock of technologyOrOptions.unlocks) this.unlocks.push(unlock instanceof Base ? new Base(unlock) : unlock instanceof ItemCollector ? new ItemCollector(unlock) : <BuildTierOptions> {
				tier: unlock.tier,
				build:
					unlock.build instanceof Factory ?
						new Factory(unlock.build) :
						unlock.build instanceof TransportationDistance ?
							new TransportationDistance(unlock.build) :
							unlock.build instanceof Storage ?
								new Storage(unlock.build) :
								unlock.build instanceof OutputTiers ?
									new OutputTiers(unlock.build) :
									unlock.build instanceof StorageTiers ?
										new StorageTiers(unlock.build) :
										unlock.build instanceof DistanceTiers ?
											new DistanceTiers(unlock.build) :
											new Tiers(unlock.build)
			})

			// unlocksTechnologies
			this.unlocksTechnologies = []
			if (typeof technologyOrOptions.unlocksTechnologies !== "undefined") for (const unlocksTechnology of technologyOrOptions.unlocksTechnologies) this.unlocksTechnologies.push(unlocksTechnology)
		}

		// Statics
		Technology.technologies.push(this)
	}

	//// Object Methods
	/**
	 * Check if a {@link Technology `Technology`} object is needed to unlock this {@link Technology `Technology`} object.
	 * @param technology The {@link Technology `Technology`} object to check if it is needed to unlock this {@link Technology `Technology`} object.
	 * @returns `true` if {@link technology `technology`} is needed, `false` otherwise.
	 */
	private needsFunction(technology: Technology): boolean {
		// if this is the technology...
		if (this === technology) return true

		// if technology is very first technology...
		if (typeof this.technologyNeeded === "undefined" || this.technologyNeeded === null) return false

		// Find technology recursively
		return this.technologyNeeded.needsFunction(technology)
	}

	/**
	 * Check if a {@link Technology `Technology`} object is needed to unlock this {@link Technology `Technology`} object.
	 * @param technology The {@link Technology `Technology`} object to check if it is needed to unlock this {@link Technology `Technology`} object.
	 * @returns `true` if {@link technology `technology`} is needed, `false` otherwise.
	 */
	needs(technology: Technology): boolean
	/**
	 * Check if a {@link Technology `Technology`} object is needed to unlock this {@link Technology `Technology`} object.
	 * @param name The technology name to check if it is needed to unlock this {@link Technology `Technology`} object.
	 * @returns `true` if {@link name `technology`} is needed, `false` otherwise.
	 */
	needs(name: string): boolean
	/**
	 * Check if a {@link Technology `Technology`} object is needed to unlock this {@link Technology `Technology`} object.
	 * @param technology The {@link Technology `Technology`} object or technology name to check if it is needed to unlock this {@link Technology `Technology`} object.
	 * @returns `true` if {@link technology `technology`} is needed, `false` otherwise.
	 */
	needs(technology: Technology | string): boolean
	needs(technologyOrName: Technology | string): boolean {
		if (typeof technologyOrName === "string") {
			// Get the technology
			const technologies = Technology.getTechnologiesByName(technologyOrName)
			if (technologies.length === 0) return false

			// Find technology recursively
			return technologies.values().every(technology => this.needsFunction(technology))
		} else return this.needsFunction(technologyOrName)
	}

	/**
	 * Determine if this technology and another technology are the equal
	 * @param technology The other technology
	 * @returns true if both technologies are the equal, false otherwise
	 */
	override equals(technology: Technology): boolean {
		return super.equals(technology)

			// resourcesNeeded
			&& this.resourcesNeeded.length === technology.resourcesNeeded.length
			&& this.resourcesNeeded.every(input => technology.resourcesNeeded.some(otherInput => input.amount === otherInput.amount && input.item.equals(otherInput.item)))

			// unlocks
			&& this.unlocks.every(unlock => technology.unlocks.some(otherUnlock => {
				if (typeof otherUnlock === "undefined") return false

				// Base | ItemCollector
				if (unlock instanceof Base) {
					if (!(otherUnlock instanceof Base)) return false

					if (unlock instanceof ItemCollector) return otherUnlock instanceof ItemCollector && unlock.equals(otherUnlock)
					else return !(otherUnlock instanceof ItemCollector) && unlock.equals(otherUnlock)
				}
				// BuildTierOptions
				else {
					if (otherUnlock instanceof Base) return false

					// Tier
					if (unlock.tier !== otherUnlock.tier) return false

					// Build
					// @ts-ignore
					if (Object.getPrototypeOf(unlock.build).constructor.name === Object.getPrototypeOf(otherUnlock.build).constructor.name) return unlock.build.equals(otherUnlock.build)
					else return false
				}
			}))
			&& this.unlocks.length === technology.unlocks.length

			// unlocksTechnologies
			&& (
				typeof this.unlocksTechnologies === "undefined" ?
					typeof technology.unlocksTechnologies === "undefined" :
					typeof technology.unlocksTechnologies === "undefined" ?
						false :
						this.unlocksTechnologies.every(tech => technology.unlocksTechnologies!.some(otherTech => tech.equals(otherTech)))
			)
	}

	/**
	 * Determine if this technology and another technology are the strictly equal
	 * @param technology The other technology
	 * @returns true if both technologies are the strictly equal, false otherwise
	 */
	override strictlyEquals(technology: Technology): boolean {
		return super.strictlyEquals(technology)

			// resourcesNeeded
			&& this.resourcesNeeded.length === technology.resourcesNeeded.length
			&& this.resourcesNeeded.every(input => technology.resourcesNeeded.some(otherInput => input.amount === otherInput.amount && input.item.strictlyEquals(otherInput.item)))

			// unlocks
			&& this.unlocks.every(unlock => technology.unlocks.some(otherUnlock => {
				if (typeof otherUnlock === "undefined") return false

				// Base | ItemCollector
				if (unlock instanceof Base) {
					if (!(otherUnlock instanceof Base)) return false

					if (unlock instanceof ItemCollector) return otherUnlock instanceof ItemCollector && unlock.strictlyEquals(otherUnlock)
					else return !(otherUnlock instanceof ItemCollector) && unlock.strictlyEquals(otherUnlock)
				}
				// BuildTierOptions
				else {
					if (otherUnlock instanceof Base) return false

					// Tier
					if (unlock.tier !== otherUnlock.tier) return false

					// Build
					// @ts-ignore
					if (Object.getPrototypeOf(unlock.build).constructor.name === Object.getPrototypeOf(otherUnlock.build).constructor.name) return unlock.build.equals(otherUnlock.build)
					else return false
				}
			}))
			&& this.unlocks.length === technology.unlocks.length

			// unlocksTechnologies
			&& (
				typeof this.unlocksTechnologies === "undefined" ?
					typeof technology.unlocksTechnologies === "undefined" :
					typeof technology.unlocksTechnologies === "undefined" ?
						false :
						this.unlocksTechnologies.every(tech => technology.unlocksTechnologies!.some(otherTech => tech.strictlyEquals(otherTech)))
			)
	}
}