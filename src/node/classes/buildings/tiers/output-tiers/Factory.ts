/**
 * @author Space.yg
 */

// Classes
import { OutputTiers } from "./OutputTiers"

// Types
import type { Price } from "@/classes/Price"
import type { OutputTiersParams } from "./OutputTiers"

/** Parameters for {@link Factory `Factory`}. */
export type FactoryParams = {
	/** The name of the factory. */
	name: string
	/** The amount of inputs of the factory. */
	inputs: number
	/** The description of the factory. */
	description: string
	/** The tiers of the factory. */
	tiers: OutputTiers | OutputTiersParams
}

/**
 * Create a new factory.
 * @extends {{@link OutputTiers `OutputTiers`}
 */
export class Factory extends OutputTiers {

	//// Static properties

	/** 
	 * All the factories that has been created.
	 * @readonly
	 */
	static readonly factories: Factory[] = []

	//// Object Properties

	/** The name of the factory. */
	name: FactoryParams["name"]
	/** The price of the first tier of the factory. */
	price: Price
	/** The amount of inputs of the factory. */
	inputs: FactoryParams["inputs"]
	/** The description of the factory. */
	description: FactoryParams["description"]

	//// Constructor

	/**
	 * Constructs a new {@link Factory `Factory`} object.
	 * @param params The factory parameters.
	 * @param passByReference Whether to pass the objects in the {@link Factory `Factory`} by reference or not. Default is `true`.
	 */
	constructor(params: FactoryParams, passByReference?: boolean)
	/**
	 * Constructs a new {@link Factory `Factory`} object.
	 * @param factory A {@link Factory `Factory`} object.
	 * @param passByReference Whether to pass the objects in the {@link Factory `Factory`} by reference or not. Default is `true`.
	 */
	constructor(factory: Factory, passByReference?: boolean)
	/**
	 * Constructs a new {@link Factory `Factory`} object.
	 * @param factory A {@link Factory `Factory`} object or factory parameters.
	 * @param passByReference Whether to pass the objects in the {@link Factory `Factory`} by reference or not. Default is `true`.
	 */
	constructor(factory: Factory | FactoryParams, passByReference?: boolean)
	constructor(paramsOrFactory: Factory | FactoryParams, passByReference: boolean = true) {
		super(paramsOrFactory.tiers, passByReference)

		this.name = paramsOrFactory.name
		this.price = this.tiers[this.minTierNum].price
		this.inputs = paramsOrFactory.inputs
		this.description = paramsOrFactory.description

		// Image
		if (paramsOrFactory instanceof Factory) for (const tier in this.tiers) this.tiers[tier].image = paramsOrFactory.tiers[tier].image ?? this.tiers[tier].image + `${this.name} Tier ${tier}.png`
		else {
			if (paramsOrFactory.tiers instanceof OutputTiers) for (const tier in this.tiers) this.tiers[tier].image = paramsOrFactory.tiers.tiers[tier].image ?? this.tiers[tier].image + `${this.name} Tier ${tier}.png`
			else for (const tier in this.tiers) this.tiers[tier].image = paramsOrFactory.tiers[tier].image ?? this.tiers[tier].image + `factories/${this.name} Tier ${tier}.png`
		}

		// Statics
		Factory.factories.push(this)
	}

	//// Object Methods

	/**
	 * These are similarities between the equals and strictlyEquals methods
	 * @param factory The other factory
	 * @returns true if both factories are the equal in the things that are similar between the equals and strictlyEquals methods, false otherwise
	 */
	protected override similarEquals(factory: Factory): boolean {
		return this.name === factory.name
			&& this.description === factory.description
			&& this.inputs === factory.inputs
	}

	/**
	 * Determine if this factory and another factory are the equal
	 * @param factory The other factory
	 * @returns true if both factories are the equal, false otherwise
	 */
	override equals(factory: Factory): boolean {
		return super.equals(factory)
			&& this.similarEquals(factory)
	}

	/**
	 * Determine if this factory and another factory are the strictly equal
	 * @param factory The other factory
	 * @returns true if both factories are the strictly equal, false otherwise
	 */
	override strictlyEquals(factory: Factory): boolean {
		return super.strictlyEquals(factory)
			&& this.similarEquals(factory)
	}
}